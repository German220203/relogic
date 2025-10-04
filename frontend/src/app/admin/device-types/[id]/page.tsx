'use client';
import { useParams } from "next/navigation";
import DeviceTypeForm from "../DeviceTypeForm";

export default function EditDeviceTypePage() {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Editar Tipo de Dispositivo</h1>
      <DeviceTypeForm mode="edit" deviceTypeId={id as string} />
    </div>
  );
}