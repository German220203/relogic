'use client';
import { useParams } from "next/navigation";
import RepairForm from "../RepairForm";

export default function EditRepairPage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Reparación</h1>
      <RepairForm mode="edit" repairId={id as string} />
    </div>
  );
}