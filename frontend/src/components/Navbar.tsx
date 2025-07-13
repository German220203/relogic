'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white shadow-md">
      <h1 className="text-xl font-semibold">Mi Aplicación</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm">
          Bienvenido, <span className="font-bold">{username ?? 'Anónimo'}</span>
        </p>
        <Link href="/login">
          <button className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}
