'use client';

import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    api.get('/api/v1/device-types')
      .then(r => r.data)
      .then(setTypes)
  }, [])

  function handleSelectDevice(t: any) {
    router.push(`/reparation?deviceTypeId=${t.id}&deviceTypeName=${encodeURIComponent(t.name)}`);
  }

  return (
    <main className="pt-5 -mt-20">
      {/* HERO */}
      <section
        style={{
          backgroundImage: 'url("/fondo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative w-full text-white min-h-[70vh] flex items-center justify-start px-8 rounded-2xl overflow-hidden"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0 rounded-2xl"></div>

        <div className="relative z-10 w-full max-w-4xl ml-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg text-left">
            Todo en un solo servicio
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 drop-shadow text-left">
            ¿Necesitas un técnico para reparar tu móvil? <br />
            <br />
            En Relogic, ofrecemos servicios de reparación para móviles, tablets y ordenadores. <br />
            <br />
            ¡Rápido, fiable y al mejor precio!
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/reparation"
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-white px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 text-emerald-600 bg-white rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm text-emerald-600 font-semibold font-medium transition-all group-hover:me-4">Reparación</span>
            </Link>

            <Link
              href="/order-tracker"
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-white px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 text-emerald-600 bg-white rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm text-emerald-600 font-semibold font-medium transition-all group-hover:me-4">Seguimiento</span>
            </Link>

            <Link
              href="/reparation"
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-white px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 text-emerald-600 bg-white rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm text-emerald-600 font-semibold font-medium transition-all group-hover:me-4">Contáctanos</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="relative py-16 flex flex-col justify-center items-center text-center px-6">
        <div className="max-w-7xl w-full mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
            Dispositivos que reparamos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {types.length === 0 ? (
              <p>No hay dispositivos disponibles</p>
            ) : (
              types.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelectDevice(t)}
                  className="p-6 rounded-xl border text-center font-medium transition-all duration-200
                             bg-white text-emerald-600 border-gray-300 hover:bg-emerald-50
                             hover:scale-105 active:scale-95 hover:shadow-lg w-full"
                >
                  {t.name}
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-16 text-center px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
            Lo que dicen nuestros clientes
          </h2>
          <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
            <p className="italic text-gray-700">
              El servicio fue rápido y confiable. Mi portátil quedó como nuevo.
            </p>
            <p className="mt-4 font-semibold">- Juan Pérez</p>
          </div>
        </div>
      </section>
    </main>
  );
}
