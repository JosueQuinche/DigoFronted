"use client"
import { useRouter } from 'next/navigation';
import styles from '../../styles/Config.module.css';
import { BiLogOut } from 'react-icons/bi';

export default function Configuracion() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleBackClick = () => {
    router.push('/grid_botones');
  };

  const handleLogoutClick = () => {
    const confirmLogout = window.confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmLogout) {
      router.push('/inicio_sesion_');
    }
  };

  const menuItems = [
    { title: 'Actualizar Datos', path: '/config-datos' },
    { title: 'Datos Personales', path: '/config-verr' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button onClick={handleLogoutClick} className={styles.logoutButton}>
          <BiLogOut size={24} />
        </button>
        <button onClick={handleBackClick} className={styles.backButton}>
          ←
        </button>
        <h1>Configuración</h1>
      </header>

      <main className={styles.main}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.dropdown}>
            <button onClick={() => handleNavigation(item.path)} className={styles.dropdownButton}>
              {index + 1}. {item.title}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
