'use client';

import api from "@/lib/api";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

type RepairFormProps = {
  mode: "create" | "edit";
  repairId?: string;
};

type Repair = {
    id: string;
    price: number;
    repairType: string; // aquí puede ser id o nombre
    model: string;         // aquí puede ser id o nombre
    createdAt: string;
    updatedAt: string;
    active: boolean;
};

type RepairType = {
    id: string;
    name: string;
    description: string;
};

type RepairResponse = {
  status: boolean;
  repair: Repair | null;
  message: string;
};

type Brand = { id: number; name: string };
type DeviceType = { id: number; name: string };
type Model = {
    id: number;
    name: string,
    brand: string,
    deviceType: string
    createdAt: string;
    updatedAt: string;
    active: boolean;
};

export default function RepairForm({ mode, repairId }: RepairFormProps) {
    const router = useRouter();
    const [price, setPrice] = useState(0);
    const [repairTypes, setRepairTypes] = useState<RepairType[]>([]);
    const [repairType, setRepairType] = useState("");
    const [brands, setBrands] = useState<Brand[]>([]);
    const [brand, setBrand] = useState("");
    const [models, setModels] = useState<Model[]>([]);
    const [model, setModel] = useState("");

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

    // 🔹 Cargar tipos de reparación
    useEffect(() => {
        async function fetchRepairTypes() {
        try {
            const res = await api.get("/api/v1/repair-types/admin");
            setRepairTypes(res.data.content);
            console.log("Tipos de reparación cargados:", repairTypes);
        }
        catch (e) {
            console.error("Error cargando los tipos de reparación:", e);
            setErrorMessage("Error cargando los tipos de reparación");
        }
        }
        fetchRepairTypes();
    }, []);

    // 🔹 Cargar primero marcas
    useEffect(() => {
        async function fetchBrands() {
            try {
                const res = await api.get("/api/v1/brands");
                setBrands(res.data.content);
            }
            catch (e) {
                console.error("Error cargando las marcas:", e);
                setErrorMessage("Error cargando las marcas");
            }
        }
        fetchBrands();
    }, []);

    // 🔹 Cargar modelos cuando cambie la marca
    useEffect(() => {
        if (brand) {
            async function fetchModels() {
                try {
                    const res = await api.get(`/api/v1/models/by-brand/${brand}`);
                    setModels(Array.isArray(res.data) ? res.data : []);
                    console.log(models);
                }
                catch (e) {
                    console.error("Error cargando los modelos:", e);
                    setErrorMessage("Error cargando los modelos");
                }
            }
            fetchModels();
        } else {
            setModels([]);
            setModel("");
        }
    }, [brand]);

   // 🔹 Cargar reparación si estamos en modo edición
    useEffect(() => {
    if (mode === "edit" && repairId) {
        async function fetchRepair() {
        try {
            const res = await api.get(`/api/v1/repairs/${repairId}`);
            const repair = res.data;

            setPrice(repair.price);
            setRepairType(repair.repairType);

            // 🧩 Si el backend te devuelve modelId:
            if (repair.modelId) {
            const modelRes = await api.get(`/api/v1/models/${repair.modelId}`);
            const modelData = modelRes.data;

            // Establecemos primero la marca
            setBrand(modelData.brandId.toString());

            // Luego el modelo (como string para el select)
            setModel(modelData.id.toString());
            } else {
            console.warn("La reparación no tiene modelId definido");
            }
        } catch (e) {
            console.error("Error cargando la reparación:", e);
            setErrorMessage("Error cargando la reparación");
        } finally {
            setLoading(false);
        }
        }

        fetchRepair();
    }
    }, [mode, repairId]);



    // 🔹 Guardar cambios o crear
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        // Validaciones básicas
        if (!repairType || !model || price <= 0) {
            setErrorMessage("Por favor, completa todos los campos correctamente.");
            return;
        }

        try {
            if (mode === "create") {
                await api.post(
                        "/api/v1/repairs",
                        {
                        price,
                        repairType: parseInt(repairType),
                        model: parseInt(model),
                        },
                        { withCredentials: true }
                    );
                } else if (mode === "edit" && repairId) {
                    await api.put(
                        `/api/v1/repairs/${repairId}`,
                        {
                        repairId: parseInt(repairId),
                        price,
                        repairTypeId: parseInt(repairType),
                        modelId: parseInt(model),
                        },
                        { withCredentials: true }
                    );
                }

            router.push("/admin/repairs");
        } catch (e) {
            console.error("Error guardando la reparación:", e);
            setErrorMessage("Error guardando la reparación.");
        }
    };

    if (!isAdmin) {
        return <p>No tienes permiso para ver esta página.</p>;
    }

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            {errorMessage && <div className="text-red-600 font-semibold">{errorMessage}</div>}
            {successMessage && <div className="text-green-600 font-semibold">{successMessage}</div>}
            <div>
                <label className="font-medium text-gray-700">Tipo de Reparación:</label>
                <select value={repairType} onChange={(e) => setRepairType(e.target.value)} className="w-full border rounded p-2" required>
                    <option value="">Selecciona un tipo de reparación</option>
                    {repairTypes.map((rt) => (
                    <option key={rt.id} value={rt.id}>
                        {rt.name}
                    </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="font-medium text-gray-700">Marca:</label>
                <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full border rounded p-2" required>
                    <option value="">Selecciona una marca</option>
                    {brands.map((b) => (
                    <option key={b.id} value={b.id}>
                        {b.name}
                    </option>
                    ))}
                </select>
            </div>
            <div>
            <label className="font-medium text-gray-700">Modelo:</label>
                <select className="w-full border rounded p-2" value={model} onChange={(e) => setModel(e.target.value)} required>
                    <option value="">Selecciona un modelo</option>
                    {models.map((m) => (
                    <option key={m.id} value={m.id}>
                        {m.name}
                    </option>
                    ))}
                </select>
            </div>
            <div>
            <label className="font-medium text-gray-700">Precio:</label>
            <input
                type="number"
                value={price === 0 ? "" : price} // mostrar vacío si es 0 o NaN
                onChange={(e) => {
                    const val = e.target.value;
                    setPrice(val === "" ? 0 : parseFloat(val)); // si está vacío, vuelve a 0
                }}
                min="0.01"
                step="0.01"
                required
                className="w-full border rounded p-2"
            />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {mode === "create" ? "Crear Reparación" : "Guardar Cambios"}
            </button>
        </form>
        </div>
    );

}
