'use client';

class Model {
    id!: number;
    name!: string;
    brandId!: number;
    deviceTypeId!: number;
    repairs!: string[];
    createdAt!: string;
    updatedAt!: string;
}

import ModelForm from "../ModelForm";

export default function CreateBrandPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Modelo</h1>
      <ModelForm mode="create" />
    </div>
  );
}