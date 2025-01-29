"use client"
import { useRouter } from "next/navigation";
import style from "../../styles/exito.module.css";

const Exito: React.FC = () => {
const router = useRouter();

const handleLoginRedirect = () => {
    router.push("/inicio_sesion_");
};

return (
    <div className={style.container}>
    <h1 className={style.title}>¡Éxito!</h1>
      <h1 className={style.paragraph}>Tu registro ha sido exitoso.</h1> {/* Añadí la clase .paragraph aquí */}

    <button onClick={handleLoginRedirect} className={style.button}>
        Iniciar Sesión
    </button>
    </div>
);
};

export default Exito;
