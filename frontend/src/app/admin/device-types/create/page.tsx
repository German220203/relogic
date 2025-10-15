'use client';

import DeviceTypeForm from "../DeviceTypeForm";

export default function CreateDeviceTypePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Crear Tipo de Dispositivo</h1>
      <DeviceTypeForm mode="create" />
    </div>
  );
}