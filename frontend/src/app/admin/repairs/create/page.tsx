'use client';

import RepairForm from "../RepairForm";

export default function CreateRepairPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Reparación</h1>
      <RepairForm mode="create" />
    </div>
  );
}