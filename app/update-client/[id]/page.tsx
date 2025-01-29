"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import styles from "../../../styles/Updatecliente.module.css"; // Ajusta la ruta según tu estructura

// Define una interfaz para los datos del cliente
interface Client {
  names: string;
  last_names: string;
  social_reason: string;
  phone: string;
  email: string;
}

const UpdateClient = () => {
  const [client, setClient] = useState<Client | null>(null); // Usa la interfaz Client
  const [formData, setFormData] = useState<Client>({
    names: "",
    last_names: "",
    social_reason: "",
    phone: "",
    email: "",
  });

  const router = useRouter();
  const { id } = useParams(); // Captura el id dinámico de la URL

  // Obtener cliente y cargar los datos en el formulario
  useEffect(() => {
    if (id) {
      const fetchClient = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/client/read/${id}`);
          setClient(response.data);
          setFormData({
            names: response.data.names || "",
            last_names: response.data.last_names || "",
            social_reason: response.data.social_reason || "",
            phone: response.data.phone || "",
            email: response.data.email || "",
          });
        } catch (error) {
          console.error("Error al obtener cliente:", error);
          alert("Hubo un error al obtener los datos del cliente");
        }
      };

      fetchClient();
    }
  }, [id]);

  // Manejar el cambio de valores en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario para actualizar los datos del cliente
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/client/update/${id}`, formData); // Se agrega el ID en la URL
      alert("Cliente actualizado con éxito");

      // Emitir evento para que el Dashboard actualice la lista de favoritos
      window.dispatchEvent(new Event("favoritesUpdated"));
      
      router.push("/view-all-client"); // Redirige a la lista de clientes
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      alert("Hubo un error al actualizar el cliente");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push("/view-all-client")} className={styles.backButton}>
          ←
        </button>
        <h1 className={styles.title}>Actualizar Cliente</h1>
      </header>

      <main className={styles.main}>
        {client && (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="names">Nombre</label>
              <input
                type="text"
                id="names"
                name="names"
                value={formData.names}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="last_names">Apellido</label>
              <input
                type="text"
                id="last_names"
                name="last_names"
                value={formData.last_names}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="social_reason">Razón Social</label>
              <input
                type="text"
                id="social_reason"
                name="social_reason"
                value={formData.social_reason}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Teléfono</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.button}>
              Guardar Cambios
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default UpdateClient;
