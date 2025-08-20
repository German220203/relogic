'use client';

import Modal from "@/components/Modal";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

class Brand {
    id!: number;
    name!: string;
    image!: string;
    models!: ModelDTO[];
    createdAt!: string;
    updatedAt!: string;
}

class ModelDTO {
    id!: number;
    name!: string;
    brandId!: number;
    deviceTypeId!: number;
    createdAt!: string;
    updatedAt!: string;
}

export default function AdminBrands() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

    const router = useRouter();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await api.get(`/api/v1/brands?page=${page}&size=${size}`);
                setBrands(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log("Marcas:", response.data);
            } catch (error) {
                console.error("Error fetching brands:", error);
            }
        };

        fetchBrands();
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

    const filteredBrands = brands.filter(brand =>
        brand.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                        <col className="w-28" />   {/* Image */}
                        <col className="w-48" />   {/* Models */}
                        <col className="w-28" />   {/* createdAt */}
                        <col className="w-60" />   {/* updatedAt */}
                        <col className="w-20" />   {/* Actions */}
                    </colgroup>
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                        <th className="px-3 py-1 text-left">ID</th>
                        <th className="px-3 py-1 text-left">Nombre</th>
                        <th className="px-3 py-1 text-left">Imagen</th>
                        <th className="px-3 py-1 text-left">Modelos</th>
                        <th className="px-3 py-1 text-left">Fecha de Creación</th>
                        <th className="px-3 py-1 text-left">Fecha de Actualización</th>
                        <th className="px-3 py-1 text-left">Acciones</th>
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
                        </colgroup>
                        <tbody>
                        {filteredBrands.map((brand: Brand) => (
                            <tr key={brand.id}
                            onClick={() => router.push(`/admin/brands/${brand.id}`)}
                            className="cursor-pointer hover:bg-gray-100">
                                <td className="px-3 py-1 text-sm">{brand.id}</td>
                                <td className="px-3 py-1 text-sm">{brand.name}</td>
                                <td className="px-3 py-1 text-sm">{brand.image}</td>
                                <td className="px-3 py-1 text-sm">
                                    {brand.models && brand.models.length > 0 ? (
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                                            onClick={(e) => {
                                                e.stopPropagation(); // evita que se dispare el click de la fila
                                                setSelectedBrand(brand); // asigna la marca seleccionada
                                                setShowModal(true);      // abre el modal
                                            }}
                                        >
                                            Ver modelos
                                        </button>
                                    ) : (
                                        <Link
                                            onClick={(e) => e.stopPropagation()} // evita que se dispare el click de la fila
                                            href="/admin/models/create"
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
                                        >
                                            Crear modelo
                                        </Link>
                                    )}
                                    </td>
                                <td className="px-3 py-1 text-sm">{brand.createdAt}</td>
                                <td className="px-3 py-1 text-sm">{brand.updatedAt}</td>
                                <td className="px-3 py-1 text-sm">
                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation(); // evita que se dispare el click de la fila
                                            if (confirm(`¿Estás seguro de eliminar la marca ${brand.name}?`)) {
                                                try {
                                                    await api.delete(`/api/v1/brands/${brand.id}`);
                                                    setBrands(brands.filter(b => b.id !== brand.id));
                                                } catch (error) {
                                                    console.error("Error eliminando la marca:", error);
                                                }
                                            }
                                        }}
                                        className="w-full h-full text-red-600 text-lg hover:scale-125 transition-transform"
                                    >
                                        ❌
                                    </button>
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
                    href="/admin/brands/create"
                    className="px-4 py-2 bg-green-500 text-white rounded"
                >
                    Crear marca
                </Link>
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Modelos de {selectedBrand?.name ?? 'N/A'}
                </h2>

                {!(selectedBrand?.models && selectedBrand.models.length > 0) ? (
                    <p>No hay modelos para esta marca.</p>
                ) : (
                    <ul className="space-y-4">
                    {(selectedBrand?.models ?? []).map((model: ModelDTO) => (
                        <li key={model.id} className="border rounded p-4 cursor-pointer hover:bg-gray-100"
                        onClick={() => router.push(`/admin/models/${model.id}`)}>
                        <p><strong>ID:</strong> {model.id}</p>
                        <p><strong>Nombre del modelo:</strong> {model.name}</p>
                        <p><strong>Creado:</strong> {model.createdAt}</p>
                        <p><strong>Actualizado:</strong> {model.updatedAt}</p>
                        </li>
                    ))}
                    </ul>
                )}
                <Link
                    onClick={(e) => e.stopPropagation()} // evita que se dispare el click de la fila
                    href="/admin/models/create"
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4 inline-block"
                >
                    Crear modelo
                </Link>
            </Modal>


        </div>
    );
}
