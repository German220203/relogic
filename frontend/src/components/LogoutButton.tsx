"use client";

export default function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.reload(); // recarga para que Header detecte el logout
  };

  return (
    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
      Cerrar sesión
    </button>
  );
}
