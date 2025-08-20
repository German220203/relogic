import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";

export default function AdminButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get("/api/v1/user/current");
        // console.log(res);
        setIsAdmin(res.data.isAdmin);
      } catch (e) {
        setIsAdmin(false);
        console.log(e)
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) return <div>Cargando...</div>;

  if (isAdmin) {
    return (
      <Link href="/admin" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition">
        Administración
      </Link>
    );
  }

  return null;
}