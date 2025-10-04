'use client';

import DeviceTypeForm from "../DeviceTypeForm";

class DeviceType {
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

export default function CreateDeviceTypePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Tipo de Dispositivo</h1>
      <DeviceTypeForm mode="create" />
    </div>
  );
}