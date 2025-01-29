"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/Ver-confirg.module.css"; // Asegúrate de que esta ruta sea correcta

// Definimos una interfaz para el tipo de datos del tenant
interface Tenant {
  names: string;
  last_names: string;
  social_reason: string;
  phone: string;
  email: string;
}

export default function VerDatos() {
  const [tenant, setTenant] = useState<Tenant | null>(null); // Estado tipado
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado para errores
  const router = useRouter();

  useEffect(() => {
    const fetchTenantData = async () => {
      try {
        const tenantId = 1; // Cambia esto al ID correcto del tenant
        const response = await fetch(`http://localhost:3000/tenant/${tenantId}`);

        if (response.ok) {
          const data: Tenant = await response.json(); // Aplicamos el tipo Tenant
          setTenant(data);
        } else {
          throw new Error("No se pudieron obtener los datos del tenant.");
        }
      } catch (err) {
        console.error("Error al obtener los datos:", (err as Error).message);
        setError((err as Error).message || "Hubo un error al cargar los datos.");
      } finally {
        setLoading(false); // Finalizar el estado de carga
      }
    };

    fetchTenantData();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push("/config")} className={styles.backButton}>
          ←
        </button>
        <h1 className={styles.title}>Datos Personales</h1>
      </header>

      <main className={styles.main}>
        {loading ? (
          <p>Cargando datos...</p>
        ) : error ? (
          <p className={styles.error}>{error}</p>
        ) : tenant ? (
          <div className={styles.dataSection}>
            <p>
              <strong>Nombre:</strong> {tenant.names}
            </p>
            <p>
              <strong>Apellido:</strong> {tenant.last_names}
            </p>
            <p>
              <strong>Razón Social:</strong> {tenant.social_reason}
            </p>
            <p>
              <strong>Teléfono:</strong> {tenant.phone}
            </p>
            <p>
              <strong>Correo Electrónico:</strong> {tenant.email}
            </p>
          </div>
        ) : (
          <p>No se encontraron datos para el tenant.</p>
        )}
      </main>
    </div>
  );
}
