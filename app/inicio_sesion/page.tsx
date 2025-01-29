import styles from '../../styles/Sesion.module.css';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Facturador</h1>

      {/* Botones */}
      <div className={styles.buttonContainer}>
        <Link href="/inicio_sesion_" passHref>
          <button className={`${styles.button} ${styles.start}`}>Iniciar sesión</button>
        </Link>
        <Link href="/auth_register" passHref>
          <button className={`${styles.button} ${styles.register}`}>Registrarse</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
