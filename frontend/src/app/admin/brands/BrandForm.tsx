'use client';

import api from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [uploading, setUploading] = useState(false);

  // Verificar usuario
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

  // Cargar marca en modo edición
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

  // Subida de imagen a carpeta "brands"
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;
  
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", "brands");

  setUploading(true);
  setErrorMessage(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/files/upload`, {
      method: "POST",
      body: formData,
      credentials: "include", // reemplaza withCredentials: true
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Error subiendo la imagen");
    }

    const fileUrl = await res.text();
    setImage(fileUrl); // ruta devuelta por backend
  } catch (err: any) {
    console.error("Error subiendo la imagen:", err);
    setErrorMessage(err.message);
  } finally {
    setUploading(false);
  }
};

  // Guardar cambios o crear
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!image) {
      setErrorMessage("Debes subir una imagen");
      return;
    }

    try {
      let res;
      if (mode === "create") {
        res = await api.post<BrandResponse>(
          "/api/v1/brands",
          { name, image },
          { withCredentials: true }
        );
      } else if (mode === "edit" && brandId) {
        res = await api.put<BrandResponse>(
          `/api/v1/brands/${brandId}`,
          { name, image },
          { withCredentials: true }
        );
      }

      if (res?.data.status) {
        setSuccessMessage(res.data.message || "Guardado exitosamente");
        setTimeout(() => router.push("/admin/brands"), 1500);
      } else {
        setErrorMessage(res?.data.message || "Hubo un error al guardar");
      }
    } catch (error: any) {
      const message = error.response?.data?.message || "Error inesperado al guardar la marca";
      setErrorMessage(message);
      console.error("Error guardando la marca:", error);
    }
  };

  if (!isAdmin) return <div>No tienes permisos para acceder a esta página.</div>;
  if (loading) return <div>Cargando datos de la marca...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {errorMessage && <div className="text-red-600 font-semibold">{errorMessage}</div>}
      {successMessage && <div className="text-green-600 font-semibold">{successMessage}</div>}

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
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border rounded p-2"
        />
        {uploading && <div className="text-blue-600 mt-1">Subiendo imagen...</div>}
        {image && (
          <div className="mt-2">
            <Image
                                      src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
                                      alt={name}
                                      width={70}
                                      height={70}
                                      className="object-contain"
                                    />
          </div>
        )}
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
