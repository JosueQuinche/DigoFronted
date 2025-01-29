"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import styles from "../../styles/Invoice_detail.module.css";
import { Download, MessageCircle } from "lucide-react"; // Iconos de descarga y WhatsApp

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

interface Factura {
  id: number;
  cliente: string;
  total: number;
  fecha: string;
}

interface DetalleFactura {
  quantity: number;
  subtotal: number;
  final_subtotal: number;
  invoiceId: number;
  productId: number;
  discount: string; // Aseguramos que discount sea siempre un string
}

const InvoiceDetailForm = () => {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [formData, setFormData] = useState<DetalleFactura>({
    quantity: 1,
    subtotal: 0,
    final_subtotal: 0,
    invoiceId: 0,
    productId: 0,
    discount: "0", // Inicializamos discount como string
  });
  const router = useRouter();

  useEffect(() => {
    const facturasData: Factura[] = [
      {
        id: 1,
        cliente: "Tito Valarezo",
        total: 200,
        fecha: "2025-01-28",
      },
      {
        id: 2,
        cliente: "Ana Gómez",
        total: 350,
        fecha: "2025-01-26",
      },
    ];
    const productosData: Producto[] = [
      { id: 1, nombre: "Camiseta", precio: 15 },
      { id: 2, nombre: "Zapatos", precio: 100 },
    ];

    setFacturas(facturasData);
    setProductos(productosData);

    if (facturasData.length > 0) {
      setFormData((prev) => ({
        ...prev,
        invoiceId: facturasData[0].id,
        productId: productosData[0].id,
      }));
    }
  }, []);

  useEffect(() => {
    const producto = productos.find((p) => p.id === Number(formData.productId));

    if (producto && formData.quantity > 0) {
      const subtotal = producto.precio * formData.quantity;
      const finalSubtotal = subtotal - (subtotal * (parseFloat(formData.discount || "0")) / 100);
      setFormData((prev: DetalleFactura) => ({
        ...prev,
        subtotal: subtotal,
        final_subtotal: finalSubtotal,
      }));
    }
  }, [formData.quantity, formData.productId, formData.discount, productos]);  // Agregado formData.discount

  const facturaSeleccionada = facturas.find((f) => f.id === formData.invoiceId);
  const productoSeleccionado = productos.find((p) => p.id === formData.productId);

  const generarMensajeWhatsApp = () => {
    if (!facturaSeleccionada || !productoSeleccionado) return "";
    const mensaje = `
      *Factura Detalles:*\n\n
      *Cliente:* ${facturaSeleccionada.cliente}\n
      *Fecha:* ${facturaSeleccionada.fecha}\n
      *Producto:* ${productoSeleccionado.nombre}\n
      *Cantidad:* ${formData.quantity}\n
      *Precio Original:* $${productoSeleccionado.precio}\n
      *Subtotal:* $${formData.subtotal.toFixed(2)}\n
      *Total Final:* $${formData.final_subtotal.toFixed(2)}\n
      *Factura ID:* ${facturaSeleccionada.id}
    `;
    return encodeURIComponent(mensaje);
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    // Títulos y detalles de la factura
    doc.text("Factura Detalle", 20, 20);
    doc.text(`Cliente: ${facturaSeleccionada?.cliente}`, 20, 30);
    doc.text(`Fecha: ${facturaSeleccionada?.fecha}`, 20, 40);
    doc.text(`Producto: ${productoSeleccionado?.nombre}`, 20, 50);
    doc.text(`Cantidad: ${formData.quantity}`, 20, 60);
    doc.text(`Precio Original: $${productoSeleccionado?.precio}`, 20, 70);
    doc.text(`Subtotal: $${formData.subtotal.toFixed(2)}`, 20, 80);
    doc.text(`Total Final: $${formData.final_subtotal.toFixed(2)}`, 20, 90);

    // Guardar el PDF con un nombre personalizado
    doc.save("factura_detalle.pdf");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.backArrow}
          onClick={() => router.push("/grid_botones")}
        >
          ←
        </button>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Detalle de Factura</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.dataSection}>
          <h3>Cliente: {facturaSeleccionada?.cliente}</h3>
          <p><strong>Fecha:</strong> {facturaSeleccionada?.fecha}</p>
          <p><strong>Producto:</strong> {productoSeleccionado?.nombre}</p>
          <p><strong>Cantidad:</strong> {formData.quantity}</p>
          <p><strong>Precio Original:</strong> ${productoSeleccionado?.precio}</p>
          <p><strong>Subtotal:</strong> ${formData.subtotal.toFixed(2)}</p>
          <p><strong>Total Final:</strong> ${formData.final_subtotal.toFixed(2)}</p>
        </div>
      </main>

      <div className={styles.shareContainer}>
        <button
          className={`${styles.shareButton} ${styles.downloadButton}`}
          onClick={generarPDF}
        >
          <Download size={30} color="black" />
        </button>

        <button
          className={`${styles.shareButton} ${styles.whatsappButton}`}
          onClick={() => {
            const mensaje = generarMensajeWhatsApp();
            if (mensaje) {
              window.open(`https://wa.me/?text=${mensaje}`, "_blank");
            } else {
              alert("No se puede generar el mensaje. Verifique los datos.");
            }
          }}
        >
          <MessageCircle size={30} color="black" />
        </button>
      </div>
    </div>
  );
};

export default InvoiceDetailForm;
