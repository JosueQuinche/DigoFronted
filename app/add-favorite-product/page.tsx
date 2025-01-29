"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importar useRouter
import style from "../../styles/Form.module.css";

const AddFavoriteProduct: React.FC = () => {
  const router = useRouter(); // Inicializar el router
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para manejar los errores

  const handleBackClick = () => {
    router.push("/grid_botones"); // Redirige a la página grid_botones
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    const formData = new FormData(e.target as HTMLFormElement);
    const productData = {
      name: formData.get("productName"),
      description: formData.get("description"),
      price: formData.get("price"),
      localId: 1, // Asegúrate de agregar el ID del local adecuado aquí
    };

    // Validación de campos vacíos
    if (!productData.name || !productData.description || !productData.price) {
      setErrorMessage("Completar todos los campos"); // Mostrar mensaje de error

      // Después de 3 segundos, ocultar el mensaje de error
      setTimeout(() => {
        setErrorMessage(null); // Eliminar el mensaje de error
      }, 3000); // 3000 ms = 3 segundos

      return;
    }

    try {
      // Realiza la solicitud al backend en la ruta correcta
      const response = await fetch("http://localhost:3000/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.status === 201) {
        alert("PRODUCTO GUARDADO"); // Alerta de éxito
        router.push("/grid_botones"); // Redirigir al Dashboard
      } else {
        alert("Hubo un problema al crear el producto"); // Alerta de error
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error al agregar el producto"); // Alerta de error
    }
  };

  return (
    <div className={style.container}>
      {/* Botón de flecha hacia atrás */}
      <button className={style.backButton} onClick={handleBackClick}>
        ←
      </button>

      <h1 className={style.title}>Agregar Producto Favorito</h1>

      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>} {/* Mostrar mensaje de error si hay uno */}

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          Nombre del Producto:
          <input
            type="text"
            name="productName"
            className={style.input}
            placeholder="Ingrese el nombre del producto"
          />
        </label>
        <label className={style.label}>
          Descripción:
          <input
            type="text"
            name="description"
            className={style.input}
            placeholder="Ingrese la descripción"
          />
        </label>
        <label className={style.label}>
          Precio:
          <div className={style.priceContainer}>
            <span className={style.dollarSign}>$</span>
            <input
              type="number"
              name="price"
              className={style.priceInput}
              placeholder="Ingrese el precio"
              step="0.01" // Permite decimales con 2 dígitos después del punto
            />
          </div>
        </label>
        <button type="submit" className={style.button}>
          Guardar
        </button>
      </form>
    </div>
  );
};

export default AddFavoriteProduct;
