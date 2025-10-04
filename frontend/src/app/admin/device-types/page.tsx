'use client';

import Modal from "@/components/Modal";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

class DeviceType {
    id!: number;
    name!: string;
    models!: ModelDTO[];
    createdAt!: string;
    updatedAt!: string;
    active!: boolean;
}

class ModelDTO {
    id!: number;
    name!: string;
    brandId!: number;
    deviceTypeId!: number;
    createdAt!: string;
    updatedAt!: string;
}

class Brand {
    id!: number;
    name!: string;
    image!: string;
    models!: ModelDTO[];
    createdAt!: string;
    updatedAt!: string;
    active!: boolean;
}

export default function AdminDeviceTypes() {
    const [deviceTypes, setDeviceTypes] = useState<DeviceType[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModelModal, setShowCreateModelModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
    const [brands, setBrands] = useState<Brand[]>([]); // para el modal de crear modelo
    // 👇 nuevo estado para filtro
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [selectedDeviceType, setSelectedDeviceType] = useState<DeviceType | null>(null);
    const [modelName, setModelName] = useState("");

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchDeviceTypes = async () => {
            try {
                const response = await api.get(`/api/v1/device-types/admin?page=${page}&size=${size}`);
                setDeviceTypes(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log("Tipos de Dispositivos:", response.data);
            } catch (error) {
                console.error("Error fetching device types:", error);
            }
        };

        fetchDeviceTypes();
    }, [page, size]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/api/v1/user/current");
                setIsAdmin(res.data.isAdmin);
            } catch (e) {
                setIsAdmin(false);
                console.log(e);
            }
        }

        fetchUser();
    }, []);

    // obtener brands para el modal de crear modelo
    useEffect(() => {
        async function fetchBrands() {
            try {
                const res = await api.get("/api/v1/brands");
                setBrands(res.data.content);
                console.log("Brands cargadas:", res.data.content);
            } catch (e) {
                console.error("Error cargando brands:", e);
            }
        }
        fetchBrands();
    }, []);

    const handleCreateModel = async () => {
        if (!selectedBrand || !modelName || !selectedDeviceType) {
            alert("Por favor completa todos los campos.");
            return;
        }
        // ✅ Validación de duplicado en frontend
        const nameExists = selectedDeviceType.models?.some(
            (m) => m.name.trim().toLowerCase() === modelName.trim().toLowerCase()
        );

        if (nameExists) {
            setErrorMessage(`Ya existe un modelo con el nombre "${modelName}" en el tipo de dispositivo ${selectedDeviceType.name}.`);
            return;
        }
        try {
            let res;
            console.log("Creando modelo con:", { modelName, selectedBrand, deviceType: selectedDeviceType.id });
            res = await api.post(
                "/api/v1/models",
                {
                name: modelName,
                brand: selectedBrand,
                deviceType: selectedDeviceType.id
                },
                { withCredentials: true }
            );

            if (res?.data.status) {
                setSuccessMessage(res.data.message || "Guardado exitosamente");
                // setShowCreateModelModal(false);
                setModelName("");
                setSelectedDeviceType(null);
                router.refresh();
                const updatedDeviceType = await api.get(`/api/v1/device-types/${selectedDeviceType.id}`);
                setSelectedDeviceType(updatedDeviceType.data);
                setShowModal(true); // mantener el modal de modelos abierto
                setShowCreateModelModal(false); // cerrar el modal de creación
            } else {
                setErrorMessage(res?.data.message || "Hubo un error al guardar");
            }
        } catch (e: any) {
            console.error("Error creando modelo:", e);
            if (e.response?.status === 409) {
                setErrorMessage("Ese nombre de modelo ya existe en la base de datos.");
            } else {
                setErrorMessage("Error al crear el modelo.");
            }
        }
    };

    // 👇 aplicar filtro de búsqueda + filtro de estado
    const filteredDeviceTypes = deviceTypes.filter((deviceType) => {
        const matchesSearch = deviceType.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && deviceType.active) ||
            (statusFilter === 'inactive' && !deviceType.active);
        return matchesSearch && matchesStatus;
    });

    if (isAdmin === undefined) {
        // Mientras se carga, no renderizamos nada (o mostramos un loader)
        return null; // o <p>Cargando...</p>
    }

    if (!isAdmin) {
        return <div>No tienes permisos para acceder a esta página.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gestión de Marcas</h1>
            <div className="mb-4">
                <label htmlFor="size" className="mr-2 font-semibold">Marcas por página:</label>
                <select
                    id="size"
                    value={size}
                    onChange={(e) => {
                        setSize(Number(e.target.value));
                        setPage(0); // Reinicia a la primera página
                    }}
                    className="border rounded px-2 py-1"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="mr-2 font-semibold">Estado:</label>
                <select
                    id="status"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                    className="border rounded px-2 py-1"
                >
                    <option value="all">Todas</option>
                    <option value="active">Activas</option>
                    <option value="inactive">Inactivas</option>
                </select>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-3 py-1 w-full sm:w-64"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border border-gray-200">
                    <colgroup>
                        <col className="w-12" />   {/* ID */}
                        <col className="w-32" />   {/* Name */}
                        <col className="w-48" />   {/* Models */}
                        <col className="w-28" />   {/* createdAt */}
                        <col className="w-60" />   {/* updatedAt */}
                        <col className="w-20" />   {/* Active */}
                        <col className="w-20" />   {/* Actions */}
                    </colgroup>
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                        <th className="px-3 py-1 text-left">ID</th>
                        <th className="px-3 py-1 text-left">Nombre</th>
                        <th className="px-3 py-1 text-left">Modelos</th>
                        <th className="px-3 py-1 text-left">Fecha de Creación</th>
                        <th className="px-3 py-1 text-left">Fecha de Actualización</th>
                        <th className="px-3 py-1 text-left">Activo</th>
                        <th className="px-3 py-1 text-left">Habilitar / Deshabilitar</th>
                        </tr>
                    </thead>
                </table>

                {/* Tabla del cuerpo (con scroll) */}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className="min-w-full table-fixed border border-t-0 border-gray-200">
                        <colgroup>
                        <col className="w-12" />
                        <col className="w-32" />
                        <col className="w-48" />
                        <col className="w-28" />
                        <col className="w-60" />
                        <col className="w-20" />
                        <col className="w-20" />
                        </colgroup>
                        <tbody>
                        {filteredDeviceTypes.map((deviceType: DeviceType) => (
                            <tr key={deviceType.id}
                            onClick={() => router.push(`/admin/device-types/${deviceType.id}`)}
                            className="cursor-pointer hover:bg-gray-100">
                                <td className="px-3 py-1 text-sm">{deviceType.id}</td>
                                <td className="px-3 py-1 text-sm">{deviceType.name}</td>
                                <td className="px-3 py-1 text-sm">
                                    {deviceType.models && deviceType.models.length > 0 ? (
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                                            onClick={(e) => {
                                                e.stopPropagation(); // evita que se dispare el click de la fila
                                                setSelectedDeviceType(deviceType); // asigna el tipo de dispositivo seleccionado
                                                setShowModal(true);      // abre el modal
                                            }}
                                        >
                                            Ver modelos
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedDeviceType(deviceType);
                                                setShowCreateModelModal(true);
                                            }}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
                                        >
                                            Crear modelo
                                        </button>
                                    )}
                                    </td>
                                <td className="px-3 py-1 text-sm">{deviceType.createdAt}</td>
                                <td className="px-3 py-1 text-sm">{deviceType.updatedAt}</td>
                                <td className="px-3 py-1 text-sm">{deviceType.active ? "Sí" : "No"}</td>
                                <td className="px-3 py-1 text-sm">
                                    {deviceType.active ? (
                                        // Botón para deshabilitar
                                        <button
                                            onClick={async (e) => {
                                            e.stopPropagation(); // evita que se dispare el click de la fila
                                            if (confirm(`¿Estás seguro de deshabilitar el tipo de dispositivo ${deviceType.name}?`)) {
                                                try {
                                                await api.put(`/api/v1/device-types/${deviceType.id}/disable`);
                                                // en vez de quitarlo de la lista, lo actualizas a inactive
                                                setDeviceTypes(deviceTypes.map(dt => 
                                                    dt.id === deviceType.id ? { ...dt, active: false } : dt
                                                ));
                                                } catch (error) {
                                                console.error("Error deshabilitando el tipo de dispositivo:", error);
                                                }
                                            }
                                            }}
                                            className="w-full h-full text-red-600 text-lg hover:scale-125 transition-transform"
                                        >
                                            ✘
                                        </button>
                                        ) : (
                                        // Botón para habilitar
                                        <button
                                            onClick={async (e) => {
                                            e.stopPropagation();
                                            if (confirm(`¿Estás seguro de habilitar el tipo de dispositivo ${deviceType.name}?`)) {
                                                try {
                                                await api.put(`/api/v1/device-types/${deviceType.id}/enable`);
                                                setDeviceTypes(deviceTypes.map(dt => 
                                                    dt.id === deviceType.id ? { ...dt, active: true } : dt
                                                ));
                                                } catch (error) {
                                                console.error("Error habilitando el tipo de dispositivo:", error);
                                                }
                                            }
                                            }}
                                            className="w-full h-full text-green-600 text-lg hover:scale-125 transition-transform"
                                        >
                                            ✔
                                        </button>
                                        )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 ">
                <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                >
                    Anterior
                </button>
                <select
                    value={page}
                    onChange={(e) => setPage(Number(e.target.value))}
                    className="border rounded px-2 py-1 mr-2"
                >
                    {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i} value={i}>
                            Página {i + 1}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Siguiente
                </button>
                <p className="mt-2 text-sm text-gray-600">
                    Página {page + 1} de {totalPages}
                </p>
            </div>
            <div className="mt-4">
                <Link
                    href="/admin/device-types/create"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Crear Tipo de Dispositivo
                </Link>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Modelos de {selectedDeviceType?.name ?? 'N/A'}
                </h2>

                {!(selectedDeviceType?.models && selectedDeviceType.models.length > 0) ? (
                    <p>No hay modelos para este tipo de dispositivo.</p>
                ) : (
                    <div className="max-h-80 overflow-y-auto rounded p-2">
                        <ul className="space-y-4">
                            {(selectedDeviceType?.models ?? []).map((model: ModelDTO) => (
                                <li
                                    key={model.id}
                                    className="border rounded p-4 cursor-pointer hover:bg-gray-100"
                                    onClick={() => router.push(`/admin/models/${model.id}`)}
                                >
                                    <p><strong>ID:</strong> {model.id}</p>
                                    <p><strong>Nombre del modelo:</strong> {model.name}</p>
                                    <p><strong>Creado:</strong> {model.createdAt}</p>
                                    <p><strong>Actualizado:</strong> {model.updatedAt}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    onClick={() => {
                        setShowModal(false);
                        setShowCreateModelModal(true);
                    }}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Crear modelo
                </button>
                </Modal>

            {/* modal de crear modelo */}
            <Modal isOpen={showCreateModelModal} onClose={() => setShowCreateModelModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Crear modelo para {selectedDeviceType?.name}
                </h2>
                {errorMessage && (
                    <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
                )}
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold">Nombre</label>
                        <input
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className="w-full border px-2 py-1 rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Marca</label>
                        {/* <input
                            type="text"
                            value={selectedBrand ?? ""}
                            onChange={(e) => setSelectedBrand(Number(e.target.value))}
                            className="w-full border px-2 py-1 rounded"
                        /> */}
                        <select
                            value={selectedBrand ?? ""}
                            onChange={(e) => setSelectedBrand(Number(e.target.value))}
                            className="w-full border px-2 py-1 rounded"
                        >
                            <option value="">Selecciona una marca</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Device Type</label>
                        <input
                            value={selectedDeviceType?.name ?? ""}
                            disabled
                            className="w-full border px-2 py-1 rounded  bg-gray-100"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setShowCreateModelModal(false)}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleCreateModel}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            </Modal>


        </div>
    );
}
