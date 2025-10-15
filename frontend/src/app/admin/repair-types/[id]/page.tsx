'use client';

import { useParams } from "next/navigation";
import RepairTypeForm from "../RepairTypeForm";

export default function CreateRepairTypePage() {
    const { id } = useParams();
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Editar Tipo de Reparación</h1>
            <RepairTypeForm mode="edit" repairTypeId={id as string} />
        </div>
    );
    }