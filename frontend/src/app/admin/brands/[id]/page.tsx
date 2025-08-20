'use client';
import { useParams } from "next/navigation";
import BrandForm from "../BrandForm";

export default function EditBrandPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Marca</h1>
      <BrandForm mode="edit" brandId={id as string} />
    </div>
  );
}
