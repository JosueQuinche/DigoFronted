"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import style from "../../styles/Form.module.css";

const ProductForm: React.FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Obtener el ID directamente desde la URL
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackClick = () => {
    router.push("/view-all-product"); // Redirige a la vista de todos los productos
  };

  const handleUpdateClick = async () => {
    try {
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Producto actualizado con éxito");
        router.push("/view-all-products"); // Redirigir a la vista de todos los productos
      } else {
        const data = await response.json();
        alert(data.message || "Error al actualizar el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error inesperado");
    }
  };

  return (
    <div className={style.container}>
      <button className={style.backButton} onClick={handleBackClick}>
        ←
      </button>

      <h1 className={style.title}>Actualizar Producto</h1>

      <form className={style.form}>
        <label className={style.label}>
          Nombre:
          <input
            type="text"
            name="name"
            className={style.input}
            placeholder="Ingrese nombre del producto"
            value={formData.name}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Precio:
          <input
            type="number"
            name="price"
            className={style.input}
            placeholder="Ingrese precio del producto"
            value={formData.price}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Descripción:
          <textarea
            name="description"
            className={style.input}
            placeholder="Ingrese descripción del producto"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <button
          type="button"
          className={style.button}
          onClick={handleUpdateClick}
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
