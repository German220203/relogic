"use client";
import { useEffect, useState } from "react";

export default function UsernameDisplay() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const updateUsername = () => {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername || null);
    };

    // Cargar en el primer render
    updateUsername();

    // Escuchar cambios al localStorage (como logout o login desde otra pestaña)
    window.addEventListener("storage", updateUsername);

    return () => {
      window.removeEventListener("storage", updateUsername);
    };
  }, []);

  return <p>Usuario: {username ?? "Anónimo"}</p>;
}