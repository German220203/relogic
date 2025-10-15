'use client';

import api from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type RepairTypeFormProps = {
  mode: "create" | "edit";
  repairTypeId?: string;
};

type RepairType = {
  id: string;
  name: string;
  description: string;
};

type RepairTypeResponse = {
  status: boolean;
  repairType: RepairType | null;
  message: string;
};

export default function RepairTypeForm({ mode, repairTypeId }: RepairTypeFormProps) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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

    // 🔹 Cargar repairType si estamos en modo edición
    useEffect(() => {
        if (mode === "edit" && repairTypeId) {
        async function fetchRepairType() {
            try {
            const res = await api.get(`/api/v1/repair-types/${repairTypeId}`);
            setName(res.data.name);
            setDescription(res.data.description);
            } catch (e) {
            console.error("Error cargando el tipo de reparación:", e);
            setErrorMessage("Error cargando el tipo de reparación");
            } finally {
            setLoading(false);
            }
        }
        fetchRepairType();
        }
    }, [mode, repairTypeId]);

    // 🔹 Guardar cambios o crear
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
        let res;
        if (mode === "create") {
            res = await api.post<RepairTypeResponse>("/api/v1/repair-types", { name, description }, { withCredentials: true });
        } else if (mode === "edit" && repairTypeId) {
            res = await api.put<RepairTypeResponse>(`/api/v1/repair-types/${repairTypeId}`, { name, description }, { withCredentials: true });
        }

        // Si llegamos aquí, status < 400
        if (res?.data.status) {
            setSuccessMessage(res.data.message || "Guardado exitosamente");
            setErrorMessage(null);
            // Redirigir después de 1.5s
            setTimeout(() => router.push("/admin/repair-types"), 1500);
        } else {
            // Aunque el status HTTP sea 200, backend indica fallo
            setErrorMessage(res?.data.message || "Hubo un error al guardar");
        }

        } catch (error: any) {
            // Manejo de errores HTTP >= 400 (ej. 409, 401, 500)
            const message = error.response?.data?.message || "Error inesperado al guardar el tipo de reparación";
            setErrorMessage(message);
            setSuccessMessage(null);
            console.error("Error guardando el tipo de reparación:", error);
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
        <label className="font-medium text-gray-700">Descripción *</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mode === "create" ? "Crear Tipo de reparación" : "Guardar Cambios"}
      </button>
    </form>
  );



}