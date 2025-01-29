"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "../../styles/Form.module.css"; // Importa los estilos

const CompletarDatos: React.FC = () => {
const router = useRouter();
const [formData, setFormData] = useState({
    names: "",
    last_names: "",
    social_reason: "",
    phone: "",
    email: "",
    address: "",
    comercial_number: "",
    primary: false,
});

useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
    setFormData({ ...JSON.parse(savedData), address: "", comercial_number: "", primary: false });
    }
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos finales:", formData);
    // Puedes guardar los datos finales en localStorage o enviarlos al servidor
    // localStorage.setItem("finalFormData", JSON.stringify(formData));
    router.push("/exito"); // Redirige a una página de éxito o confirmación
};

return (
    <div className={style.container}>
    <button
        className={style.backButton}
        onClick={() => router.push("/registro")}
    >
        ←
    </button>

    <h1 className={style.title}>Completa tus datos</h1>
    <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label}>Dirección:</label>
        <input
        type="text"
        name="address"
        className={style.input}
        value={formData.address}
        onChange={handleChange}
        required
        />

        <label className={style.label}>Número Comercial:</label>
        <input
        type="text"
        name="comercial_number"
        className={style.input}
        value={formData.comercial_number}
        onChange={handleChange}
        required
        />

        <label className={style.label}>¿Es principal?</label>
        <input
        type="checkbox"
        name="primary"
        className={style.input}
        checked={formData.primary}
        onChange={(e) => setFormData({ ...formData, primary: e.target.checked })}
        />

        <button type="submit" className={style.button}>
        Enviar
        </button>
    </form>
    </div>
);
};

export default CompletarDatos;
