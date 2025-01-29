"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../styles/ISesion.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensajes de error previos

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: { message: string; token: string } = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // Guardar el token
        router.push("/grid_botones"); // Redirigir al dashboard
      } else {
        setErrorMessage(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setErrorMessage("Error del servidor, intenta más tarde.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Botón de flecha en la parte superior izquierda */}
        <Link href="/inicio_sesion" className={styles.arrowBack}>
          &#8592; {/* Flecha hacia la izquierda */}
        </Link>

        <h2 className={styles.title}>Iniciar sesión</h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="ejemplo@ejemplo.com"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.passwordContainer}>
            <input
              type="password"
              placeholder="********"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <button type="submit" className={styles.loginButton}>
            Iniciar sesión
          </button>
        </form>
        
        {/* Botón de registro con Link de Next.js */}
        <Link href="/auth_register" className={styles.registerLink}>
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Login;
