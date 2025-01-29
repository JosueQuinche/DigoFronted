"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "../../styles/authregister.module.css";

const Welcome: React.FC = () => {
    const [formData, setFormData] = useState({
        personalEmail: "",
        password: "",
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Enviar los datos al backend para crear un nuevo usuario
        try {
            const response = await fetch("http://localhost:3000/auth/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.personalEmail,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirigir al siguiente formulario después de la creación exitosa
                router.push("/registro");
            } else {
                // Si el usuario ya existe, mostrar mensaje y limpiar el formulario
                if (data.message === "Usuario ya existente") {
                    alert(data.message);
                    // Limpiar los campos después de aceptar la alerta
                    setFormData({ personalEmail: "", password: "" });
                } else {
                    alert(data.message || "Error al registrar el usuario.");
                }
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
            alert("Hubo un error con la conexión al servidor.");
        }
    };

    return (
        <div className={style.container}>
            <button
                className={style.backButton}
                onClick={() => router.push("/inicio_sesion")}
            >
                ←
            </button>

            <h1 className={style.title}>¡Bienvenido!</h1>
            <h1 className={style.subtitle}>
                Por favor ingresa tu correo personal o empresarial y una contraseña.
            </h1>

            <form className={style.form} onSubmit={handleSubmit}>
                <label className={style.label}>Correo Personal:</label>
                <input
                    type="email"
                    name="personalEmail"
                    className={style.input}
                    value={formData.personalEmail}
                    onChange={handleChange}
                    required
                />

                <label className={style.label}>Contraseña:</label>
                <input
                    type="password"
                    name="password"
                    className={style.input}
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className={style.button}>
                    Completar Registro
                </button>
            </form>
        </div>
    );
};

export default Welcome;
