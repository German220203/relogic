'use client';

import Modal from "@/components/Modal";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

class Repair {
    id!: number;
    price!: number;
    repairTypeName!: string;
    model!: ModelDTO;
    createdAt!: string;
    updatedAt!: string;
    active!: boolean;
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

class RepairType {
    id!: number;
    name!: string;
    description!: string;
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

export default function AdminRepairs() {
    const [repairs, setRepairs] = useState<Repair[]>([]);
    const [repairsTypes, setRepairsTypes] = useState<Brand[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedRepair, setSelectedRepair] = useState<Repair | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]); // 👈 marcas seleccionadas
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
    // 👇 nuevo estado para filtro
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    const router = useRouter();

    useEffect(() => {
        const fetchRepairs = async () => {
            try {
                const response = await api.get(`/api/v1/repairs/admin?page=${page}&size=${size}`);
                setRepairs(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log("Reparaciones:", response.data);
            } catch (error) {
                console.error("Error fetching repairs:", error);
            }
        };

        fetchRepairs();
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

    useEffect(() => {
        const fetchRepairsTypes = async () => {
        try {
            const response = await api.get("/api/v1/repair-types");
            console.log("Fetched repairs types:", response.data.content);
            // asumiendo que devuelve un array de { name: string }
            setRepairsTypes(response.data.content);
        } catch (error) {
            console.error("Error fetching repairs types:", error);
        }
        };

        fetchRepairsTypes();
    }, []);

    // 👇 aplicar filtro de búsqueda + filtro de estado
    const filteredRepairs = repairs.filter((repair) => {
        const matchesSearch = repair.id?.toString().includes(searchTerm.toLowerCase()) || repair.repairTypeName.toLowerCase().includes(searchTerm.toLowerCase()) || repair.price?.toString().includes(searchTerm);
        const matchesStatus =
            statusFilter === 'all' ||
            (statusFilter === 'active' && repair.active) ||
            (statusFilter === 'inactive' && !repair.active);
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
            <h1 className="text-2xl font-bold mb-4">Gestión de Reparaciones</h1>
            <div className="mb-4">
                <label htmlFor="size" className="mr-2 font-semibold">Reparaciones por página:</label>
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
                    placeholder="Buscar reparación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-3 py-1 w-full sm:w-64"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border border-gray-200">
                    <colgroup>
                        <col className="w-12" />   {/* ID */}
                        <col className="w-32" />   {/* Price */}
                        <col className="w-28" />   {/* repairTypeName */}
                        <col className="w-48" />   {/* model */}
                        <col className="w-28" />   {/* createdAt */}
                        <col className="w-60" />   {/* updatedAt */}
                        <col className="w-20" />   {/* Active */}
                        <col className="w-20" />   {/* Actions */}
                    </colgroup>
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                        <th className="px-3 py-1 text-left">ID</th>
                        <th className="px-3 py-1 text-left">Precio</th>
                        <th className="px-3 py-1 text-left">Tipo de Reparación</th>
                        <th className="px-3 py-1 text-left">Modelo</th>
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
                        <col className="w-60" />
                        <col className="w-20" />
                        <col className="w-20" />
                        </colgroup>
                        <tbody>
                        {filteredRepairs.map((repair: Repair) => (
                            <tr key={repair.id}
                            onClick={() => router.push(`/admin/repairs/${repair.id}`)}
                            className="cursor-pointer hover:bg-gray-100">
                                <td className="px-3 py-1 text-sm">{repair.id}</td>
                                <td className="px-3 py-1 text-sm">{repair.price}</td>
                                <td className="px-3 py-1 text-sm">{repair.repairTypeName}</td>
                                <td className="px-3 py-1 text-sm">{repair.model.name}</td>
                                <td className="px-3 py-1 text-sm">{repair.createdAt}</td>
                                <td className="px-3 py-1 text-sm">{repair.updatedAt}</td>
                                <td className="px-3 py-1 text-sm">{repair.active ? "Sí" : "No"}</td>
                                <td className="px-3 py-1 text-sm">
                                    {repair.active ? (
                                        // Botón para deshabilitar
                                        <button
                                            onClick={async (e) => {
                                            e.stopPropagation(); // evita que se dispare el click de la fila
                                            if (confirm(`¿Estás seguro de deshabilitar la reparación con ID ${repair.id}?`)) {
                                                try {
                                                await api.put(`/api/v1/repairs/${repair.id}/disable`);
                                                // en vez de quitarlo de la lista, lo actualizas a inactive
                                                setRepairs(repairs.map(r => 
                                                    r.id === repair.id ? { ...r, active: false } : r
                                                ));
                                                } catch (error) {
                                                console.error("Error deshabilitando la reparación:", error);
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
                                            if (confirm(`¿Estás seguro de habilitar la reparación con ID ${repair.id}?`)) {
                                                try {
                                                await api.put(`/api/v1/repairs/${repair.id}/enable`);
                                                setRepairs(repairs.map(r =>
                                                    r.id === repair.id ? { ...r, active: true } : r
                                                ));
                                                } catch (error) {
                                                console.error("Error habilitando la marca:", error);
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
                    href="/admin/repairs/create"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Crear reparación
                </Link>
            </div>
            {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Modelos de {selectedBrand?.name ?? 'N/A'}
                </h2>

                {!(selectedBrand?.models && selectedBrand.models.length > 0) ? (
                    <p>No hay modelos para esta marca.</p>
                ) : (
                    <div className="max-h-80 overflow-y-auto rounded p-2">
                        <ul className="space-y-4">
                            {(selectedBrand?.models ?? []).map((model: ModelDTO) => (
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
                </Modal> */}

            {/* modal de crear modelo */}
            {/* <Modal isOpen={showCreateModelModal} onClose={() => setShowCreateModelModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Crear modelo para {selectedBrand?.name}
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
                        <input
                            type="text"
                            value={selectedBrand?.name ?? ""}
                            disabled
                            className="w-full border px-2 py-1 rounded bg-gray-100"
                        />
                    </div>
                    <div>
                        <label className="block font-semibold">Device Type</label>
                        <select
                            value={selectedDeviceType ?? ""}
                            onChange={(e) => setSelectedDeviceType(Number(e.target.value))}
                            className="w-full border px-2 py-1 rounded"
                        >
                            <option value="">Selecciona un device type</option>
                            {deviceTypes.map((dt) => (
                                <option key={dt.id} value={dt.id}>{dt.name}</option>
                            ))}
                        </select>
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
            </Modal> */}


        </div>
    );
}
