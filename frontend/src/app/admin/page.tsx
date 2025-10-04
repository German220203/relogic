'use client';

import api from "@/lib/api";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/api/v1/user/current", { withCredentials: true });
                setUser(response.data);
                setIsAdmin(response.data.isAdmin);
                console.log(response.data.username);
                console.log("User is admin:", response.data.isAdmin);
            } catch (error) {
                console.error("Error fetching user data:", error);
                if (error.response.data === "No autenticado" && error.response.status === 401) {
                    window.location.href = "/login";
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }
    if (!isAdmin) {
        return <div>No tienes permisos para acceder a esta página.</div>;
    }
    return (
        <div className="admin-page">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            <div className="admin-buttons grid grid-cols-3 md:grid-cols-3 gap-4">
                <Link href="/admin/users" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Usuarios</Link>
                <Link href="/admin/orders" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Pedidos</Link>
                <Link href="/admin/brands" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Marcas</Link>
                <Link href="/admin/models" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Modelos</Link>
                <Link href="/admin/device-types" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Tipos de Dispositivos</Link>
                <Link href="/admin/repairs" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Reparaciones</Link>
                <Link href="/admin/repair-types" className="bg-emerald-600 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-emerald-600 border border-emerald-600">Gestionar Tipos de Reparación</Link>
                {/* Agrega más enlaces o componentes según sea necesario */}
            </div>
        </div>
    );

}