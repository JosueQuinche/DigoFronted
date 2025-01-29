"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/BlankPage.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";

// Definir el tipo Client
type Client = {
  id: number;
  names: string;
  last_names: string;
};

const BlankPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [favorites, setFavorites] = useState<Client[]>([]);
  const router = useRouter();

  // Obtener clientes desde el backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/client/read");
        setClients(response.data);
      } catch (error) {
        console.error("Error al obtener los clientes:", error);
      }
    };
    fetchClients();
  }, []);

  // Obtener favoritos desde localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(savedFavorites);
  }, []);

  // Guardar favoritos en localStorage
  const toggleFavorite = (client: Client) => {
    const updatedFavorites = favorites.some((fav) => fav.id === client.id)
      ? favorites.filter((fav) => fav.id !== client.id)
      : [...favorites, client];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Disparar evento para actualizar en otros componentes
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  // Función para redirigir
  const updateClient = (id: number) => {
    router.push(`/update-client/${id}`);
  };

  // Función para eliminar cliente
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que deseas eliminar este cliente?"
    );
    if (confirmDelete) {
      try {
        // Realizar la solicitud DELETE al backend
        await axios.delete(`http://localhost:3000/client/delete/${id}`);

        // Si la eliminación fue exitosa, actualizar el estado para remover el cliente de la lista
        setClients((prevClients) =>
          prevClients.filter((client) => client.id !== id)
        );
        console.log(`Cliente con ID: ${id} eliminado`);

        // Emitir el evento para actualizar el Dashboard
        window.dispatchEvent(new Event("clientsUpdated"));
      } catch (error) {
        console.error("Error al eliminar el cliente:", error);
      }
    } else {
      console.log("Eliminación cancelada");
    }
  };

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <Link href="/grid_botones">
          <button className={styles.backArrow}>←</button>
        </Link>
        <div className={styles.logoContainer}>
          <span className={styles.logo}>Clientes</span>
        </div>
      </header>

      {/* Mostrar clientes */}
      <main className={styles.main}>
        {clients.length > 0 ? (
          <ul className={styles.clientList}>
            {clients.map((client) => (
              <li key={client.id} className={styles.clientItem}>
                <div>
                  {client.names} {client.last_names}
                </div>
                <div className={styles.buttonsContainer}>
                  <button
                    onClick={() => toggleFavorite(client)}
                    className={styles.favoriteButton}
                  >
                    <Heart
                      fill={
                        favorites.some((fav) => fav.id === client.id)
                          ? "currentColor"
                          : "none"
                      }
                      color={
                        favorites.some((fav) => fav.id === client.id)
                          ? "red"
                          : "black"
                      }
                      size={20}
                    />
                  </button>
                  <button
                    className={styles.updateButton}
                    onClick={() => updateClient(client.id)}
                  >
                    Actualizar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(client.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyMessage}>Vacío</p>
        )}
      </main>
    </div>
  );
};

export default BlankPage;
