'use client';

// import Modal from "@/components/Modal";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

class ModelDTO {
    id!: number;
    name!: string;
    brand!: string;
    deviceType!: string;
    createdAt!: string;
    updatedAt!: string;
    active!: boolean;
}

export default function AdminModels() {
    const [models, setModels] = useState<ModelDTO[]>([]);
    const [brands, setBrands] = useState<string[]>([]); // 👈 lista de marcas
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]); // 👈 marcas seleccionadas
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [modelRepairs, setModelRepairs] = useState<any[]>([]);
    const [selecttedModel, setSelectedModel] = useState<ModelDTO | null>(null);
    const [showModal, setShowModal] = useState(false);
    // const [selectedModel, setSelectedModel] = useState<ModelDTO | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
    // 👇 nuevo estado para filtro
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const router = useRouter();

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await api.get(`/api/v1/models/admin?page=${page}&size=${size}`);
                setModels(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log("Modelos:", response.data);
            } catch (error) {
                console.error("Error fetching models:", error);
            }
        };

        fetchModels();
    }, [page, size]);

    useEffect(() => {
        const fetchBrands = async () => {
        try {
            const response = await api.get("/api/v1/brands");
            console.log("Fetched brands:", response.data.content);
            // asumiendo que devuelve un array de { name: string }
            setBrands(response.data.content.map((b: any) => b.name));
        } catch (error) {
            console.error("Error fetching brands:", error);
        }
        };

        fetchBrands();
    }, []);

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

    function repairsByModel(model: ModelDTO) {
        api.get('api/v1/repairs/by-model/' + model.id)
            .then(response => {
                console.log("Repairs del model:", response.data);
                setModelRepairs(response.data);
                setSelectedModel(model);
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error obteniendo reparaciones del modelo:", error);
            });
    }

    // 🔹 Aplica filtros
    const filteredModels = models.filter(model => {
        const matchesSearch = model.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && model.active) ||
        (statusFilter === 'inactive' && !model.active);
        const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(model.brand);

        return matchesSearch && matchesStatus && matchesBrand;
    });

    // 🔹 Handler para seleccionar/deseleccionar marcas
    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
        prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    if (isAdmin === undefined) {
        // Mientras se carga, no renderizamos nada (o mostramos un loader)
        return null; // o <p>Cargando...</p>
    }

    if (!isAdmin) {
        return <div>No tienes permisos para acceder a esta página.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Gestión de Modelos</h1>
            <div className="mb-4">
                <label htmlFor="size" className="mr-2 font-semibold">Modelos por página:</label>
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
                    <option value="all">Todos</option>
                    <option value="active">Activos</option>
                    <option value="inactive">Inactivos</option>
                </select>
            </div>
            {/* 🔹 Filtro por marcas */}
            <div className="mb-4">
                <p className="font-semibold mb-1">Filtrar por marca:</p>
                <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                    <button
                    key={brand}
                    onClick={() => toggleBrand(brand)}
                    className={`px-3 py-1 rounded border ${
                        selectedBrands.includes(brand)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700"
                    }`}
                    >
                    {brand}
                    </button>
                ))}
                </div>
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar modelo..."
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
                        <col className="w-28" />   {/* Brand */}
                        <col className="w-48" />   {/* Device Type */}
                        <col className="w-28" />   {/* repairs */}
                        <col className="w-28" />   {/* createdAt */}
                        <col className="w-60" />   {/* updatedAt */}
                        <col className="w-20" />   {/* Active */}
                        <col className="w-20" />   {/* Actions */}
                    </colgroup>
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                        <th className="px-3 py-1 text-left">ID</th>
                        <th className="px-3 py-1 text-left">Nombre</th>
                        <th className="px-3 py-1 text-left">Marca</th>
                        <th className="px-3 py-1 text-left">Tipo de Dispositivo</th>
                        <th className="px-3 py-1 text-left">Reparaciones</th>
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
                        <col className="w-28" />
                        <col className="w-48" />
                        <col className="w-28" />
                        <col className="w-28" />
                        <col className="w-60" />
                        <col className="w-20" />
                        <col className="w-20" />
                        </colgroup>
                        <tbody>
                        {filteredModels.map((model: ModelDTO) => (
                            <tr key={model.id}
                            onClick={() => router.push(`/admin/models/${model.id}`)}
                            className="cursor-pointer hover:bg-gray-100">
                                <td className="px-3 py-1 text-sm">{model.id}</td>
                                <td className="px-3 py-1 text-sm">{model.name}</td>
                                <td className="px-3 py-1 text-sm">{model.brand}</td>
                                <td className="px-3 py-1 text-sm">{model.deviceType}</td>
                                <td className="px-3 py-1 text-sm">
                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            repairsByModel(model)}}
                                        className="px-4 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                                        >
                                        Ver Reparaciones
                                    </button>
                                </td>

                                <td className="px-3 py-1 text-sm">{model.createdAt}</td>
                                <td className="px-3 py-1 text-sm">{model.updatedAt}</td>
                                <td className="px-3 py-1 text-sm">{model.active ? "Sí" : "No"}</td>
                                <td className="px-3 py-1 text-sm">
                                    {model.active ? (
                                        // Botón para deshabilitar
                                        <button
                                            onClick={async (e) => {
                                            e.stopPropagation(); // evita que se dispare el click de la fila
                                            if (confirm(`¿Estás seguro de deshabilitar el modelo ${model.name}?`)) {
                                                try {
                                                await api.put(`/api/v1/models/${model.id}/disable`);
                                                // en vez de quitarlo de la lista, lo actualizas a inactive
                                                setModels(models.map(m => 
                                                    m.id === model.id ? { ...m, active: false } : m
                                                ));
                                                } catch (error) {
                                                console.error("Error deshabilitando el modelo:", error);
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
                                            if (confirm(`¿Estás seguro de habilitar el modelo ${model.name}?`)) {
                                                try {
                                                await api.put(`/api/v1/models/${model.id}/enable`);
                                                setModels(models.map(m => 
                                                    m.id === model.id ? { ...m, active: true } : m
                                                ));
                                                } catch (error) {
                                                console.error("Error habilitando el modelo:", error);
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
                    href="/admin/models/create"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Crear modelo
                </Link>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Reparaciones de {selecttedModel?.name}
                </h2>

                {modelRepairs.length === 0 ? (
                    <p>No hay reparaciones para este usuario.</p>
                ) : (
                    <ul className="space-y-4">
                    {modelRepairs.map((repair) => (
                        <li key={repair.id}
                        onClick={() => {
                            router.push(`/admin/repairs/${repair.id}`);
                            setShowModal(false);
                        }}
                        className="border rounded p-4">
                            <p><strong>Id:</strong> {repair.id}</p>
                            <p><strong>Precio:</strong> {repair.price}</p>
                            <p><strong>Tipo de Reparación:</strong> {repair.repairTypeName}</p>
                            <p><strong>Creado:</strong> {new Date(repair.createdAt).toLocaleString()}</p>
                            <p><strong>Actualizado:</strong> {new Date(repair.updatedAt).toLocaleString()}</p>
                        </li>
                        
                    ))}
                    </ul>
                )}
            </Modal>
        </div>
    );
}
