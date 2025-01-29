"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../styles/config-update.module.css';

export default function ConfiDatos() {
  // Estado para los campos del formulario
  const [formData, setFormData] = useState({
    names: '',
    last_names: '',
    social_reason: '',
    phone: '',
    email: '',
  });

  const router = useRouter();

  // Manejo del cambio de cada campo del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tenantId = 1; // Replace with the actual tenant ID you want to update

    try {
      const response = await fetch(`http://localhost:3000/tenant/update/${tenantId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedTenant = await response.json();
        console.log('Tenant updated:', updatedTenant);
        alert('Datos guardados correctamente');
        router.push('/config'); // Redirect after successful update
      } else {
        const error = await response.json();
        console.error('Error updating tenant:', error);
        alert('Hubo un error al guardar los datos');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Hubo un error al enviar los datos');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={() => router.push('/config')} className={styles.backButton}>
          ←
        </button>
        <h1 className={styles.title}>Actualizar Datos</h1>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="names" className={styles.label}>Nombre</label>
            <input
              type="text"
              id="names"
              name="names"
              value={formData.names}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="last_names" className={styles.label}>Apellido</label>
            <input
              type="text"
              id="last_names"
              name="last_names"
              value={formData.last_names}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="social_reason" className={styles.label}>Razón Social</label>
            <input
              type="text"
              id="social_reason"
              name="social_reason"
              value={formData.social_reason}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.label}>Teléfono</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <button type="submit" className={styles.button}>
              Guardar Cambios
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
