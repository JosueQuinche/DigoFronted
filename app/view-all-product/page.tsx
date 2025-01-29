"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/Productos.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Asegurándote de tener el router
import { Heart, Edit, Trash, CreditCard } from "lucide-react"; // Agregando los íconos

// Definir tipo Producto
interface Producto {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductoPage = () => {
  // Reemplazar any[] por Producto[]
  const [productos, setProductos] = useState<Producto[]>([]);
  const [favorites, setFavorites] = useState<Producto[]>([]);
  const router = useRouter(); // Obtener el hook de router

  // Obtener productos del backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product/read/${id}");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProductos();

    // Obtener productos favoritos del localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteProducts") || "[]");
    setFavorites(savedFavorites);
  }, []);

  // Marcar/desmarcar producto como favorito
  const toggleFavorite = (producto: Producto) => {
    const updatedFavorites = favorites.some((fav) => fav.id === producto.id)
      ? favorites.filter((fav) => fav.id !== producto.id)
      : [...favorites, producto];

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteProducts", JSON.stringify(updatedFavorites));

    // Emitir evento 'favoritesUpdated' para actualizar los favoritos en otras páginas
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  // Eliminar producto
  const handleEliminar = async (id: number) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/product/delete/${id}`);
        setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
        console.log(`Producto con ID: ${id} eliminado`);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  // Actualizar producto
  const handleActualizar = (id: number) => {
    router.push(`/update-product/${id}`);
  };

  // Pagar y redirigir a facturación
  const handlePagar = (producto: Producto) => {
    alert(`¡Gracias por comprar el producto ${producto.name}!`);
    // Redirigir a la página de facturación
    router.push("/facturacion");  // Cambia '/facturacion' por la ruta correcta
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/grid_botones">
          <button className={styles.backArrow}>←</button>
        </Link>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Productos</span>
        </div>
      </header>

      <main className={styles.main}>
        {productos.length > 0 ? (
          <ul className={styles.productList}>
            {productos.map((producto) => (
              <li key={producto.id} className={styles.productItem}>
                <div className={styles.productInfo}>
                  <span>{producto.name}</span>
                  <span>${producto.price}</span>
                  <p>{producto.description}</p>
                </div>
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.favoriteButton}
                    onClick={() => toggleFavorite(producto)}
                  >
                    <Heart
                      fill={favorites.some((fav) => fav.id === producto.id) ? "currentColor" : "none"}
                      color={favorites.some((fav) => fav.id === producto.id) ? "red" : "black"}
                      size={20}
                    />
                  </button>
                  <button
                    className={styles.updateButton}
                    onClick={() => handleActualizar(producto.id)}
                  >
                    <Edit size={20} color="black" /> {/* Icono de actualizar */}
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleEliminar(producto.id)}
                  >
                    <Trash size={20} color="black" /> {/* Icono de eliminar */}
                  </button>
                  {/* Botón de Pagar para cada producto */}
                  <button
                    className={styles.paymentButton}
                    onClick={() => handlePagar(producto)}
                  >
                    <CreditCard size={20} color="black" /> {/* Icono de pagar */}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>No hay productos disponibles</p>
        )}
      </main>
    </div>
  );
};

export default ProductoPage;
