'use client';

import api from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type ModelFormProps = {
  mode: "create" | "edit";
  modelId?: string;
};

type Model = {
  id: string;
  name: string;
  brand: string;       // aquí puede ser id o nombre
  deviceType: string;  // aquí puede ser id o nombre
};

type ModelResponse = {
  status: boolean;
  model: Model | null;
  message: string;
};

type Brand = { id: number; name: string };
type DeviceType = { id: number; name: string };

export default function ModelForm({ mode, modelId }: ModelFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const [brands, setBrands] = useState<Brand[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);

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

  // 🔹 Cargar marcas y deviceTypes
  useEffect(() => {
    async function fetchData() {
      try {
        const [brandsRes, deviceTypesRes] = await Promise.all([
          api.get("/api/v1/brands"),
          api.get("/api/v1/device-types"), // 👈 primer método del controlador
        ]);
        setBrands(brandsRes.data.content);
        setDeviceTypes(deviceTypesRes.data);
      } catch (e) {
        console.error("Error cargando marcas o deviceTypes:", e);
      }
    }
    fetchData();
  }, []);

  // 🔹 Cargar modelo si estamos en modo edición
  useEffect(() => {
    if (mode === "edit" && modelId) {
      async function fetchModel() {
        try {
          const res = await api.get(`/api/v1/models/${modelId}`);
          setName(res.data.name);

          // Buscar ID por nombre en la lista de brands y deviceTypes
          const brandObj = brands.find(b => b.name === res.data.brand);
          const deviceTypeObj = deviceTypes.find(dt => dt.name === res.data.deviceType);

          setBrand(brandObj ? brandObj.id.toString() : "");
          setDeviceType(deviceTypeObj ? deviceTypeObj.id.toString() : "");
        } catch (e) {
          console.error("Error cargando el modelo:", e);
          setErrorMessage("Error cargando el modelo");
        } finally {
          setLoading(false);
        }
      }
      fetchModel();
    }
  }, [mode, modelId, brands, deviceTypes]);

  // 🔹 Guardar cambios o crear
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      let res;
      if (mode === "create") {
      res = await api.post<ModelResponse>(
        "/api/v1/models",
        { 
          name, 
          brand: { id: parseInt(brand) }, 
          deviceType: { id: parseInt(deviceType) } 
        },
        { withCredentials: true }
      );
    } else if (mode === "edit" && modelId) {
      res = await api.put<ModelResponse>(
        `/api/v1/models/${modelId}`,
        { 
          name, 
          brand: { id: parseInt(brand) }, 
          deviceType: { id: parseInt(deviceType) } 
        },
        { withCredentials: true }
      );
    }

      if (res?.data.status) {
        setSuccessMessage(res.data.message || "Guardado exitosamente");
        setTimeout(() => router.push("/admin/models"), 1500);
      } else {
        setErrorMessage(res?.data.message || "Hubo un error al guardar");
      }
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Error inesperado al guardar el modelo";
      setErrorMessage(message);
      console.error("Error guardando el modelo:", error);
    }
  };

  if (!isAdmin) {
    return <div>No tienes permisos para acceder a esta página.</div>;
  }

  if (loading) {
    return <div>Cargando datos del modelo...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {errorMessage && <div className="text-red-600 font-semibold">{errorMessage}</div>}
      {successMessage && <div className="text-green-600 font-semibold">{successMessage}</div>}

      {/* Nombre */}
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

      {/* Brand */}
      <div>
        <label className="font-medium text-gray-700">Marca *</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Selecciona una marca --</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* DeviceType */}
      <div>
        <label className="font-medium text-gray-700">Tipo de dispositivo *</label>
        <select
          value={deviceType}
          onChange={(e) => setDeviceType(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Selecciona un tipo --</option>
          {deviceTypes.map((dt) => (
            <option key={dt.id} value={dt.id}>
              {dt.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {mode === "create" ? "Crear Modelo" : "Guardar Cambios"}
      </button>
    </form>
  );
}
