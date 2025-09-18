'use client';
import { useParams } from "next/navigation";
import BrandForm from "../ModelForm";

export default function EditModelPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Modelo</h1>
      <BrandForm mode="edit" modelId={id as string} />
    </div>
  );
}