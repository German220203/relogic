'use client';

// import Image from "next/image";
import api from "@/lib/api";
import Link from "next/link";


export default function Home() {

  function handleClick() {
    const brands = api.get("/api/v1/brands");
    console.log(brands);
    brands.then(response => {
      console.log("Brands:", response.data);
    }).catch(error => {
      console.error("Error fetching brands:", error);
    });
  }

  return (
    <main>
      <div>
        <p>Contenido público o protegido aquí.</p>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Boton prueba
        </button>

        <Link href="/reparation">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Iniciar reparación</button>
        </Link>
      </div>
    </main>
  );
}