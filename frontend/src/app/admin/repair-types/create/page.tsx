'use client';

import RepairTypeForm from "../RepairTypeForm";

export default function CreateRepairTypePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Tipo de Reparación</h1>
      <RepairTypeForm mode="create" />
    </div>
  );
}