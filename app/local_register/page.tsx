"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "../../styles/Form.module.css";

const LocalRegister: React.FC = () => {
  const router = useRouter();
  const [localData, setLocalData] = useState({
    address: "",
    comercial_number: "",
    primary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar los datos del local al backend
      const response = await fetch("http://localhost:3000/local/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(localData), // Los datos del formulario
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir a la página de éxito si el registro fue exitoso
        router.push("/exito");
      } else {
        alert(data.message || "Hubo un error al registrar el local.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error con la conexión al servidor.");
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Registro de Local</h1>

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>Dirección:</label>
        <input
          type="text"
          name="address"
          className={style.input}
          value={localData.address}
          onChange={handleChange}
          required
        />

        <label className={style.label}>Número Comercial:</label>
        <input
          type="text"
          name="comercial_number"
          className={style.input}
          value={localData.comercial_number}
          onChange={handleChange}
          required
        />

        <label className={style.label}>¿Es Primary? (Ej. Local 1):</label>
        <input
          type="text"
          name="primary"
          className={style.input}
          value={localData.primary}
          onChange={handleChange}
          required
        />

        <button type="submit" className={style.button}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default LocalRegister;
