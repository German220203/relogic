'use client';

import Modal from "@/components/Modal";
import api from "@/lib/api";
import { useEffect, useState } from "react";

class User {
    id!: number;
    username!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    phone!: string;
    authority!: string;
}

class Reparation {
    id!: number;
    modelId!: number;
    price!: number;
    repairTypeName!: string;
    createdAt!: string;
    updatedAt!: string;
}

class OrderDTO {
    id!: number;
    trackId!: string;
    status!: string;
    createdAt!: string;
    updatedAt!: string;
    reparations!: Reparation[]
}

export default function AdminUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [userOrders, setUserOrders] = useState<OrderDTO[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
    const [loading, setLoading] = useState(true);

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

    function promoteUserToAdmin(userId: number) {
        api.post(`/api/v1/user/promote/${userId}`)
            .then(response => {
                console.log("Usuario promovido a admin:", response.data);
                const updatedUser = response.data;
                // Actualiza la lista de usuarios después de promover
                setUsers(users.map(user =>
                    user.id === userId ? updatedUser : user
                ));
            })
            .catch(error => {
                console.error("Error promoviendo usuario a admin:", error);
            });
    }

    function demoteUserToCustomer(userId: number) {
        api.post(`/api/v1/user/demote/${userId}`)
            .then(response => {
                console.log("Usuario promovido a cliente:", response.data);
                const updatedUser = response.data;
                // Actualiza la lista de usuarios después de promover
                setUsers(users.map(user =>
                    user.id === userId ? updatedUser : user
                ));
            })
            .catch(error => {
                console.error("Error promoviendo usuario a cliente:", error);
            });
    }

    function orderByUser(user: User) {
        api.get('api/v1/orders/user/' + user.id)
            .then(response => {
                console.log("Órdenes del usuario:", response.data);
                setUserOrders(response.data);
                setSelectedUser(user);
                setShowModal(true);
            })
            .catch(error => {
                console.error("Error obteniendo órdenes del usuario:", error);
            });
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get(`/api/v1/user/all?page=${page}&size=${size}`);
                setUsers(response.data.content);
                setTotalPages(response.data.totalPages);
                console.log("Usuarios:", response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page, size]);

    const filteredUsers = users.filter(user =>
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
            <div className="mb-4">
                <label htmlFor="size" className="mr-2 font-semibold">Usuarios por página:</label>
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
                    placeholder="Buscar usuario..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-3 py-1 w-full sm:w-64"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border border-gray-200">
                    <colgroup>
                        <col className="w-12" />   {/* ID */}
                        <col className="w-32" />   {/* Username */}
                        <col className="w-28" />   {/* Nombre */}
                        <col className="w-28" />   {/* Apellido */}
                        <col className="w-60" />   {/* Email */}
                        <col className="w-32" />   {/* Teléfono */}
                        <col className="w-24" />   {/* Rol */}
                        <col className="w-48" />   {/* Cambiar Rol */}
                        <col className="w-40" />   {/* Ver pedidos */}
                    </colgroup>
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                        <th className="px-3 py-1 text-left">ID</th>
                        <th className="px-3 py-1 text-left">Nombre de Usuario</th>
                        <th className="px-3 py-1 text-left">Nombre</th>
                        <th className="px-3 py-1 text-left">Apellido</th>
                        <th className="px-3 py-1 text-left">Email</th>
                        <th className="px-3 py-1 text-left">Teléfono</th>
                        <th className="px-3 py-1 text-left">Rol</th>
                        <th className="px-3 py-1 text-left">Cambiar Rol</th>
                        <th className="px-3 py-1 text-left">Ver pedidos</th>
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
                        <col className="w-28" />
                        <col className="w-60" />
                        <col className="w-32" />
                        <col className="w-24" />
                        <col className="w-48" />
                        <col className="w-40" />
                        </colgroup>
                        <tbody>
                        {filteredUsers.map((user: User) => (
                            <tr key={user.id}>
                            <td className="px-3 py-1 text-sm">{user.id}</td>
                            <td className="px-3 py-1 text-sm">{user.username}</td>
                            <td className="px-3 py-1 text-sm">{user.firstName}</td>
                            <td className="px-3 py-1 text-sm">{user.lastName}</td>
                            <td className="px-3 py-1 text-sm">{user.email}</td>
                            <td className="px-3 py-1 text-sm">{user.phone}</td>
                            <td className="px-3 py-1 text-sm">{user.authority}</td>
                            <td className="px-3 py-1 text-sm">
                                {user.authority !== 'ADMIN' ? (
                                <button
                                    onClick={() => promoteUserToAdmin(user.id)}
                                    className="px-4 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                                >
                                    Promover a ADMIN
                                </button>
                                ) : (
                                <button
                                    onClick={() => demoteUserToCustomer(user.id)}
                                    className="px-4 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600 transition-colors"
                                >
                                    Degradar a CUSTOMER
                                </button>
                                )}
                            </td>
                            <td className="px-3 py-1 text-sm">
                                <button
                                onClick={() => orderByUser(user)}
                                className="px-4 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                                >
                                Ver Pedidos
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
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2 className="text-xl font-bold mb-4">
                    Pedidos de {selectedUser?.firstName} {selectedUser?.lastName1}
                </h2>

                {userOrders.length === 0 ? (
                    <p>No hay pedidos para este usuario.</p>
                ) : (
                    <ul className="space-y-4">
                    {userOrders.map((order) => (
                        <li key={order.id} className="border rounded p-4">
                        <p><strong>Track ID:</strong> {order.trackId}</p>
                        <p><strong>Estado:</strong> {order.status}</p>
                        <p><strong>Creado:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                        <p><strong>Actualizado:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
                        <p><strong>Reparaciones:</strong></p>
                        <ul className="pl-4 list-disc">
                            {order.reparations.map((rep) => (
                            <li key={rep.id}>
                                {rep.repairTypeName} - {rep.price}€
                            </li>
                            ))}
                        </ul>
                        <p><strong>Total:</strong> {order.reparations.reduce((acc, rep) => acc + rep.price, 0).toFixed(2)}€</p>
                        </li>
                        
                    ))}
                    </ul>
                )}
            </Modal>


        </div>
    );
}
