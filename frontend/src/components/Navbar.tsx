'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LogoutButton from './auth/LogoutButton';
import AdminButton from './admin/AdminButton';
import { Menu, X } from 'lucide-react'; // 👈 iconos para hamburguesa
import api from '@/lib/api';

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false); // 👈 estado menú móvil

  useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/api/v1/user/current", { withCredentials: true });
                setUsername(response.data.username);
                setIsAdmin(response.data.isAdmin);
                console.log(response.data.username);
                console.log("User is admin:", response.data.isAdmin);
            } catch (error) {
                console.log("User not logged in");
            }
        };

        fetchUser();
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
      className={`pl-6 pr-6 p-4 flex justify-between items-center shadow-md fixed top-0 w-full z-50 bg-white transition-transform duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src="/logo-bi-color.png"
            alt="Logo Relogic"
            width={120}
            height={120}
            className="h-auto w-[120px]"
          />
        </Link>
      </div>

      {/* Menú desktop */}
      <div className="hidden md:flex items-center gap-6">
        <Link href="/about">
          <button className="font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Sobre Nosotros
          </button>
        </Link>
        <Link href="/contact">
          <button className="font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Contacto
          </button>
        </Link>
        <Link href="/order-tracker">
          <button className="font-bold relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full">
            Sigue tu pedido
          </button>
        </Link>
      </div>

      {/* Botones usuario (desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {username ? (
          <div className="flex items-center gap-2">
            <AdminButton isAdmin={isAdmin} />
            <p>
              Bienvenido, <span className="font-bold">{username}</span>
            </p>
            <Link href="/profile">
              <button
                style={{ backgroundColor: '#5f8c5e' }}
                className="text-white px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Perfil
              </button>
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <button
                style={{ backgroundColor: '#5f8c5e' }}
                className="text-white px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Iniciar Sesión
              </button>
            </Link>
            <Link href="/register">
              <button className="bg-white px-4 py-2 rounded hover:bg-gray-100 transition">
                Registro
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Botón hamburguesa (solo en móvil) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col p-4 gap-4 md:hidden">
          <Link href="/about" onClick={() => setIsOpen(false)}>
            Sobre Nosotros
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            Contacto
          </Link>
          <Link href="/order-tracker" onClick={() => setIsOpen(false)}>
            Sigue tu pedido
          </Link>

          {username ? (
            <>
              <p>
                Bienvenido, <span className="font-bold">{username}</span>
              </p>
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <button
                  style={{ backgroundColor: '#5f8c5e' }}
                  className="text-white w-full px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Perfil
                </button>
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <button
                  style={{ backgroundColor: '#5f8c5e' }}
                  className="text-white w-full px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Iniciar Sesión
                </button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <button className="bg-white w-full px-4 py-2 rounded hover:bg-gray-100 transition">
                  Registro
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
