'use client';

import api from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type BrandFormProps = {
  mode: "create" | "edit";
  brandId?: string;
};

type Brand = {
  id: string;
  name: string;
  image: string;
};

type BrandResponse = {
  status: boolean;
  brand: Brand | null;
  message: string;
};

export default function BrandForm({ mode, brandId }: BrandFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 🔹 Verificar usuario
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/api/v1/user/current", { withCredentials: true });
        setIsAdmin(res.data.isAdmin);
      } catch {
        setIsAdmin(false);
      }
    }
    fetchUser();
  }, []);

  // 🔹 Cargar marca si estamos en modo edición
  useEffect(() => {
    if (mode === "edit" && brandId) {
      async function fetchBrand() {
        try {
          const res = await api.get(`/api/v1/brands/${brandId}`);
          setName(res.data.name);
          setImage(res.data.image);
        } catch (e) {
          console.error("Error cargando la marca:", e);
          setErrorMessage("Error cargando la marca");
        } finally {
          setLoading(false);
        }
      }
      fetchBrand();
    }
  }, [mode, brandId]);

  // 🔹 Guardar cambios o crear
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
        let res;
        if (mode === "create") {
        res = await api.post<BrandResponse>("/api/v1/brands", { name, image }, { withCredentials: true });
        } else if (mode === "edit" && brandId) {
        res = await api.put<BrandResponse>(`/api/v1/brands/${brandId}`, { name, image }, { withCredentials: true });
        }

        // Si llegamos aquí, status < 400
        if (res?.data.status) {
        setSuccessMessage(res.data.message || "Guardado exitosamente");
        setErrorMessage(null);
        // Redirigir después de 1.5s
        setTimeout(() => router.push("/admin/brands"), 1500);
        } else {
        // Aunque el status HTTP sea 200, backend indica fallo
        setErrorMessage(res?.data.message || "Hubo un error al guardar");
        }

    } catch (error: any) {
        // Manejo de errores HTTP >= 400 (ej. 409, 401, 500)
        const message = error.response?.data?.message || "Error inesperado al guardar la marca";
        setErrorMessage(message);
        setSuccessMessage(null);
        console.error("Error guardando la marca:", error);
    }
  };

  if (!isAdmin) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  if (loading) {
    return <div>Cargando datos de la marca...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {errorMessage && (
        <div className="text-red-600 font-semibold">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="text-green-600 font-semibold">{successMessage}</div>
      )}

      <div>
        <label className="font-medium text-gray-700">Nombre *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <div>
        <label className="font-medium text-gray-700">Imagen *</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mode === "create" ? "Crear Marca" : "Guardar Cambios"}
      </button>
    </form>
  );
}
