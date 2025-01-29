"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Facturacion.module.css";

interface Client {
  id: number;
  name: string;
  lastname: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Facturacion() {
  const [formData, setFormData] = useState({
    date: "",
    total: "",
    discount: "",
    final_total: "",
    client: "",
    product: "",
    quantity: 1,
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  // Simulación de datos de clientes y productos
  useEffect(() => {
    setClients([
      { id: 1, name: "Tito Andres", lastname: "Valarezo Gonzáles" },
      { id: 2, name: "Josué Sebastian", lastname: "Quinche Sánchez" },
      { id: 3, name: "Mireya Abigail", lastname: "Cruz Flores" },
      { id: 4, name: "Juan Carlos", lastname: "Ramirez Julia" },
      { id: 5, name: "Janeth Alejandra", lastname: "Gonzales Ramirez" },
      { id: 6, name: "Luis Alberto", lastname: "Torres Mendoza" },
      { id: 7, name: "Ana Paula", lastname: "Herrera Cruz" },
      { id: 8, name: "Valeria Isabel", lastname: "Rojas Peñas" },
      { id: 9, name: "Diego Arturo", lastname: "Pineda Reyes" },
    ]);

    setProducts([
      { id: 1, name: "Camiseta", price: 15.0 },
      { id: 2, name: "Smartwatch ActiveFit X100", price: 75.0 },
      { id: 3, name: "Auriculares SoundPro 360", price: 50.0 },
      { id: 4, name: "Cafetera Espresso Barista+", price: 45.00 },
      { id: 5, name: "Laptop ProMax 15.6\"", price: 1.20 },
      { id: 6, name: "Altavoz Bluetooth PartyBoom 500", price: 120.00 },
      { id: 7, name: "Bicicleta Urbana EcoRide", price: 250.00 },
      { id: 8, name: "Set de Cuchillos ChefMaster", price: 50.00 },
      { id: 9, name: "Robot Aspiradora SmartClean 300", price: 320.00 },
      { id: 10, name: "Kit de Herramientas MultiPro 80 Piezas", price: 75.00 },
    ]);
  }, []);

  // Cálculo del total final
  useEffect(() => {
    const calculateFinalTotal = () => {
      const total = parseFloat(formData.total);
      const discount = parseFloat(formData.discount) || 0;
      const quantity = formData.quantity || 1;

      if (!isNaN(total)) {
        const subtotal = total * quantity;
        const finalTotal = subtotal - (subtotal * discount) / 100;
        setFormData((prevData) => ({
          ...prevData,
          final_total: finalTotal.toFixed(2),
        }));
      }
    };

    calculateFinalTotal();
  }, [formData.total, formData.discount, formData.quantity]);

  // Manejo de cambios en los inputs
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const newValue = name === "quantity" ? parseInt(value) || 1 : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    if (name === "product") {
      const selectedProduct = products.find((product) => product.id.toString() === value);
      if (selectedProduct) {
        setFormData((prevData) => ({
          ...prevData,
          total: selectedProduct.price.toString(),
        }));
      }
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.date || !formData.client || !formData.product) {
      setError("Por favor, complete todos los campos.");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Factura creada exitosamente");

    // Redirigir con parámetros
    const queryParams = new URLSearchParams({
      client: formData.client,
      product: formData.product,
      quantity: String(formData.quantity),
      discount: formData.discount,
      total: formData.total,
      final_total: formData.final_total,
      date: formData.date,
    }).toString();

    router.push(`/invoice_detail?${queryParams}`);
  };

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => router.back()}>
        ←
      </button>
      <h1 className={styles.title}>Facturación</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Fecha:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required className={styles.input} />

        <label className={styles.label}>Cliente:</label>
        <select name="client" value={formData.client} onChange={handleChange} required className={styles.input}>
          <option value="">Seleccionar Cliente</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} {client.lastname}
            </option>
          ))}
        </select>

        <label className={styles.label}>Producto:</label>
        <select name="product" value={formData.product} onChange={handleChange} required className={styles.input}>
          <option value="">Seleccionar Producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        <label className={styles.label}>Cantidad:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required className={styles.input} />

        <label className={styles.label}>Descuento (%):</label>
        <input type="number" name="discount" value={formData.discount} onChange={handleChange} min="0" max="100" className={styles.input} />

        <div className={styles.priceContainer}>
          <span className={styles.dollarSign}>$</span>
          <input type="text" value={formData.final_total} readOnly className={styles.priceInput} />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <button type="submit" className={styles.button}>Generar Factura</button>
      </form>
    </div>
  );
}
