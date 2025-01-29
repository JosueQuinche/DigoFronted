import styles from '../../styles/Cliente.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Logo */}
      <header className={styles.header}>
        <span className={styles.logo}>Facturador</span>
      </header>

      {/* Título y descripción */}
      <h1 className={styles.title}>Gestiona Clientes</h1>
      <p className={styles.description}>
        Almacena información de tus clientes y
        tus productos.
        Accesibles las 24 hras del día...
      </p>

      {/* Indicadores de progreso */}
      <div className={styles.progressContainer}>
        <span className={`${styles.progress}`}></span>
        <span className={`${styles.progress} ${styles.active}`}></span>
        <span className={styles.progress}></span>
      </div>

      {/* Botones */}
      <div className={styles.buttonContainer}>
        <a href='/inicio_sesion' className={`${styles.button} ${styles.skip}`}>Saltar</a>
        <a href='/reportes' className={`${styles.button} ${styles.next}`}>Siguiente</a>
      </div>
    </div>
  );
}
