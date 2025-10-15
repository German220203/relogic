'use client';

import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [types, setTypes] = useState<any[]>([]);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    api.get('/api/v1/device-types')
      .then(r => r.data)
      .then(setTypes)
  }, [])

  function handleSelectDevice(t: any) {
    router.push(`/reparation?deviceTypeId=${t.id}&deviceTypeName=${encodeURIComponent(t.name)}`);
  }

  // 🔹 Mostrar banner si no se aceptaron cookies antes
  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setShowCookieBanner(true);
  }, []);

  // 🔹 Aceptar cookies
  function handleAcceptCookies() {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookieBanner(false);
  }

  return (
    <main className="pt-5 -mt-20">
      {/* HERO */}

      {/* 🔹 Banner de cookies */}
      {showCookieBanner && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[900px] bg-emerald-600 text-white shadow-lg rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4 z-[1000]">
          <p className="text-center md:text-left text-sm md:text-base leading-snug">
            Esta página web únicamente utiliza cookies propias con finalidad técnica.
            No recaba ni cede datos personales de los usuarios sin su conocimiento.
          </p>
          <button
            onClick={handleAcceptCookies}
            className="bg-white text-emerald-600 font-semibold px-6 py-2 rounded-md hover:bg-emerald-700 hover:text-white transition-all duration-200"
          >
            Aceptar
          </button>
        </div>
      )}
      <section
        className="relative w-full text-white h-[70vh] flex items-stretch justify-start px-8 rounded-2xl overflow-hidden mt-30 sm:mt-0"
      >
        {/* 🎥 Video de fondo */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl brightness-[0.8] contrast-[1.1]"
        >
          <source src="/intro_relogic.mp4" type="video/mp4" />
        </video>

        {/* 💚 Overlay verde */}
        <div className="absolute inset-0 bg-emerald-600/10 mix-blend-multiply z-0 rounded-2xl"></div>

        {/* 🟩 Degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-700/50 via-emerald-700/10 to-emerald-700/0 z-0 rounded-2xl"></div>

        {/* 🖤 Capa oscura */}
        {/* <div className="absolute inset-0 bg-black/1 z-0 rounded-2xl"></div> */}

        {/* 🧭 Contenedor de texto */}
        <div className="relative z-10 w-full max-w-4xl flex flex-col justify-between items-start text-left h-full py-12">
          
          {/* TÍTULO ARRIBA */}
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-semibold leading-relaxed max-w-xl drop-shadow-md"
            style={{ textWrap: "balance" }}
          >
            Somos especialistas en{" "}
            <span className="text-emerald-300 font-bold">reparación</span> y{" "}
            <span className="text-emerald-300 font-bold">reacondicionamiento</span> de equipos,
            comprometidos a{" "}
            <span className="text-emerald-300 font-bold">reutilizar</span> y{" "}
            <span className="text-emerald-300 font-bold">reciclar</span>.
          </h1>

          {/* BOTONES ABAJO */}
          <div className="flex flex-wrap gap-4 pb-10">
            <Link
              href="/reparation"
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-white px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 text-emerald-600 bg-white rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm text-emerald-600 font-semibold font-medium transition-all group-hover:me-4">
                Reparación
              </span>
            </Link>

            <Link
              href="/order-tracker"
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-white px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 text-emerald-600 bg-white rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm text-emerald-600 font-semibold font-medium transition-all group-hover:me-4">
                Seguimiento
              </span>
            </Link>

            <Link
              href="/contact"
              className="group relative inline-flex items-center overflow-hidden rounded-sm bg-white px-8 py-3 text-white focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <svg
                  className="size-5 text-emerald-600 bg-white rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <span className="text-sm text-emerald-600 font-semibold font-medium transition-all group-hover:me-4">
                Contáctanos
              </span>
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
                  className="w-full h-40 flex flex-col justify-center items-center flex items-center justify-center p-6 rounded-xl border text-center font-medium transition-all duration-200
                             bg-white text-emerald-600 border-gray-300 hover:bg-emerald-50
                             hover:scale-105 active:scale-95 hover:shadow-lg w-full"
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api","")}${t.image}`}
                    alt={t.name}
                    width={80}
                    height={80}
                  />
                  <p className="mt-3 text-emerald-600 text-sm font-medium">{t.name}</p>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <section className="bg-cta"
        style={
          {backgroundColor: "#d8fbeb"}
        }>
        <div className="container text-center">
          <h2 className="text-4xl mb-6">Comprometidos con el medio ambiente</h2>
          <p className="title-desc mt-3">
            Nuestras acciones tienen un impacto en nuestro entorno, y es por ello que nuestra empresa
            lleva tiempo comprometida con una estrategia medioambiental sostenible.
          </p>
          <div className="mt-10">
            <a href="/reparation" className="btn btn-primary mt-2">Empezar</a>
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
