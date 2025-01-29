import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Logo */}
      <header className={styles.header}>
        <span className={styles.logo}>Facturador</span>
      </header>

      {/* Imagen central */}
      {/* <div className={styles.imageContainer}>
        <img src="/illustration.png" alt="Ilustración" className={styles.image} />
      </div> */}

      {/* Título y descripción */}
      <h1 className={styles.title}>MÓDULO DE FACTURACIÓN ELECTRÓNICA</h1>
      <p className={styles.description}>
        Registra los datos de tu negocio <br />
        y factura inmediatamente.
      </p>

      {/* Indicadores de progreso */}
      <div className={styles.progressContainer}>
        <span className={`${styles.progress} ${styles.active}`}></span>
        <span className={styles.progress}></span>
        <span className={styles.progress}></span>
      </div>

      {/* Botones */}
      <div className={styles.buttonContainer}>
        
        <a href='/inicio_sesion' className={`${styles.button} ${styles.skip}`}>Saltar</a>
        
        <a href='/gestion_cliente' className={`${styles.button} ${styles.next}`}>Siguiente</a>
        
      </div>
    </div>
  );
}
