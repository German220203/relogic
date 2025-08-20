'use client';

class Brand {
    id!: number;
    name!: string;
    image!: string;
    models!: Model[];
    createdAt!: string;
    updatedAt!: string;
}

class Model {
    id!: number;
    name!: string;
    brandId!: number;
    deviceTypeId!: number;
    createdAt!: string;
    updatedAt!: string;
}

import BrandForm from "../BrandForm";

export default function CreateBrandPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Marca</h1>
      <BrandForm mode="create" />
    </div>
  );
}