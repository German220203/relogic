'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LogoutButton from './auth/LogoutButton';
import AdminButton from './admin/AdminButton';

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const storedUsername = typeof window !== 'undefined' ? localStorage.getItem('username') : null;
    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsHidden(true); // scroll hacia abajo → ocultar navbar
      } else {
        setIsHidden(false); // scroll hacia arriba → mostrar navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
  <nav
    className={`pl-10 pr-10 bg-blue-600 p-4 flex justify-between items-center text-white shadow-md fixed top-0 w-full z-50 transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
    {/* Agrupamos el logo y los enlaces */}
    <div className="flex items-center gap-30">
      <Link href="/">
        <h1 className="text-xl font-semibold">Mi Aplicación</h1>
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/about">
          <button className="relative font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Sobre Nosotros</button>
        </Link>
        <Link href="/contact">
          <button className="relative font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Contacto</button>
        </Link>
        <Link href="/order-tracker">
          <button className="relative font-semibold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full">Sigue tu pedido</button>
        </Link>
      </div>
    </div>

    <div className="flex items-center gap-4">
      {username ? (
        <div className="flex items-center gap-2">
          <AdminButton />
          <p>Bienvenido, <span className="font-bold">{username}</span></p>
          <Link href="/profile">
            <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
              Perfil
            </button>
          </Link>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login">
            <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
              Iniciar Sesión
            </button>
          </Link>
          <Link href="/register">
            <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
              Registro
            </button>
          </Link>
        </div>
      )}
    </div>
  </nav>

  );
}
