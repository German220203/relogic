"use client";

import axios from "axios";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        {
          withCredentials: true, // necesario para enviar la cookie
        }
      );
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión", error);
      alert("No se pudo cerrar sesión");
    }
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
      Cerrar sesión
    </button>
  );
}
