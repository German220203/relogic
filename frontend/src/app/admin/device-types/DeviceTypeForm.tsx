'use client';

import api from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type DeviceTypeFormProps = {
  mode: "create" | "edit";
  deviceTypeId?: string;
};

type DeviceType = {
  id: string;
  name: string;
  image: string;
};

type DeviceTypeResponse = {
  status: boolean;
  deviceType: DeviceType | null;
  message: string;
};

export default function DeviceTypeForm({ mode, deviceTypeId }: DeviceTypeFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(mode === "edit");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

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

  // 🔹 Cargar deviceType si estamos en modo edición
  useEffect(() => {
    if (mode === "edit" && deviceTypeId) {
      async function fetchDeviceType() {
        try {
          const res = await api.get(`/api/v1/device-types/${deviceTypeId}`);
          setName(res.data.name);
          setImage(res.data.image);
        } catch (e) {
          console.error("Error cargando el tipo de dispositivo:", e);
          setErrorMessage("Error cargando el tipo de dispositivo");
        } finally {
          setLoading(false);
        }
      }
      fetchDeviceType();
    }
  }, [mode, deviceTypeId]);

  // 🔹 Guardar cambios o crear
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
        let res;
        if (mode === "create") {
            res = await api.post<DeviceTypeResponse>("/api/v1/device-types", { name, image }, { withCredentials: true });
        } else if (mode === "edit" && deviceTypeId) {
            res = await api.put<DeviceTypeResponse>(`/api/v1/device-types/${deviceTypeId}`, { name, image }, { withCredentials: true });
        }

        // Si llegamos aquí, status < 400
        if (res?.data.status) {
        setSuccessMessage(res.data.message || "Guardado exitosamente");
        setErrorMessage(null);
        // Redirigir después de 1.5s
        setTimeout(() => router.push("/admin/device-types"), 1500);
        } else {
        // Aunque el status HTTP sea 200, backend indica fallo
        setErrorMessage(res?.data.message || "Hubo un error al guardar");
        }

    } catch (error: any) {
        // Manejo de errores HTTP >= 400 (ej. 409, 401, 500)
        const message = error.response?.data?.message || "Error inesperado al guardar el tipo de dispositivo";
        setErrorMessage(message);
        setSuccessMessage(null);
        console.error("Error guardando el tipo de dispositivo:", error);
    }
  };

  if (!isAdmin) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  if (loading) {
    return <div>Cargando datos del tipo de dispositivo...</div>;
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
        {mode === "create" ? "Crear Tipo de dispositivo" : "Guardar Cambios"}
      </button>
    </form>
  );
}
