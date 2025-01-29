"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "../../styles/Form.module.css";

const Registro: React.FC = () => {
const router = useRouter();
const [formData, setFormData] = useState({
    names: "",
    last_names: "",
    social_reason: "",
    phone: "",
    email: "",
});

const [localCount, setLocalCount] = useState(1);

useEffect(() => {
    const savedCount = localStorage.getItem("localCount");
    if (savedCount) {
    setLocalCount(Number(savedCount) + 1);
    } else {
    setLocalCount(1);
    }
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar los datos al backend
    const response = await fetch("http://localhost:3000/tenant/create", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
        // Guardar el localCount en el almacenamiento local
        localStorage.setItem("localCount", String(localCount));

        // Redirigir al formulario de registro de local
        router.push("/local_register");
    } else {
        alert(data.message || "Hubo un error al registrar el tenant.");
    }
    } catch (error) {
    console.error("Error al enviar los datos:", error);
    alert("Hubo un error con la conexión al servidor.");
    }
};

return (
    <div className={style.container}>
    <h1 className={style.title}>Registro</h1>

    <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>Nombres:</label>
        <input
        type="text"
        name="names"
        className={style.input}
        value={formData.names}
        onChange={handleChange}
        required
        />

        <label className={style.label}>Apellidos:</label>
        <input
        type="text"
        name="last_names"
        className={style.input}
        value={formData.last_names}
        onChange={handleChange}
        required
        />

        <label className={style.label}>Razón Social:</label>
        <input
        type="text"
        name="social_reason"
        className={style.input}
        value={formData.social_reason}
        onChange={handleChange}
        required
        />

        <label className={style.label}>Teléfono:</label>
        <input
        type="text"
        name="phone"
        className={style.input}
        value={formData.phone}
        onChange={handleChange}
        required
        />

        <label className={style.label}>Email:</label>
        <input
        type="email"
        name="email"
        className={style.input}
        value={formData.email}
        onChange={handleChange}
        required
        />

        <button type="submit" className={style.button}>
        Continuar
        </button>
    </form>
    </div>
);
};

export default Registro;
