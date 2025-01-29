"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import style from "../../styles/Form.module.css";

const ClientForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    RUC: "",
    names: "",
    last_names: "",
    social_reason: "",
    phone: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBackClick = () => {
    router.push("/grid_botones"); // Go back to the dashboard
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.RUC ||
      !formData.names ||
      !formData.last_names ||
      !formData.social_reason ||
      !formData.phone ||
      !formData.email
    ) {
      setErrorMessage("Complete todos los campos");
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/client/create", formData);

      if (response.status === 201) {
        alert("CLIENTE CREADO CON ÉXITO");
        router.push("/grid_botones"); // Redirect to the dashboard
      } else {
        alert("There was an issue processing the data");
      }
    } catch (error) {
      console.error("Error processing data", error);
      alert("Error creating the client");
    }
  };

  return (
    <div className={style.container}>
      <button className={style.backButton} onClick={handleBackClick}>
        ←
      </button>

      <h1 className={style.title}>Crear Cliente</h1>

      {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}

      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>
          RUC:
          <input
            type="text"
            name="RUC"
            className={style.input}
            placeholder="Ingrese su RUC"
            value={formData.RUC}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Nombres:
          <input
            type="text"
            name="names"
            className={style.input}
            placeholder="Nombres Completos"
            value={formData.names}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Apellidos:
          <input
            type="text"
            name="last_names"
            className={style.input}
            placeholder="Apellidos Completos"
            value={formData.last_names}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Razón Social:
          <input
            type="text"
            name="social_reason"
            className={style.input}
            placeholder="Razón Social"
            value={formData.social_reason}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Teléfono:
          <input
            type="text"
            name="phone"
            className={style.input}
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label className={style.label}>
          Corrreo:
          <input
            type="email"
            name="email"
            className={style.input}
            placeholder="Correo personal"
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <button type="submit" className={style.button}>
          Continuar
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
