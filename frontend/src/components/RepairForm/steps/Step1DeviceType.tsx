'use client'

import api from '@/lib/api';
import { useEffect, useState } from 'react'
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
type Props = { nextStep: Function; formData: any; updateForm: Function }

export default function Step1DeviceType({ nextStep, formData, updateForm }: Props) {
  const [types, setTypes] = useState<{
    image: any; id: string; name: string 
}[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/v1/device-types')
      .then(r => r.data)
      .then(setTypes)
      .catch(() => setTypes([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex flex-col items-center w-full">
      {/* Título fijo */}
      <h2 className="text-xl font-semibold mb-4 text-center sticky top-0 bg-white z-10 py-2">
        Selecciona el tipo de dispositivo
      </h2>

      {/* Contenedor scrollable */}
      <div
        className="
          w-full max-w-5xl
          grid gap-6
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
          justify-center
          overflow-y-auto max-h-[60vh] p-4
          scrollbar-thin scrollbar-thumb-emerald-400 scrollbar-track-gray-100
        "
      >
        {loading && <p className="text-gray-500 text-center col-span-full">Cargando tipos...</p>}

        {!loading && types.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">No hay dispositivos disponibles</p>
        )}

        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              updateForm({ deviceTypeId: t.id, deviceTypeName: t.name })
              console.log('Actualizado a:', { deviceTypeId: t.id, deviceTypeName: t.name })
              nextStep()
            }}
            className={`
              p-4 rounded-xl border text-center font-medium transition-all duration-200
              ${formData.deviceTypeId === t.id
                ? 'border-2 border-emerald-600 text-white'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-emerald-50'}
              hover:scale-105 active:scale-95 hover:shadow-lg
              w-full h-40 flex flex-col justify-center items-center
            `}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api","")}${t.image}`}
              alt={t.name}
              width={70}
              height={70}
              className="object-contain"
            />
            <p className="mt-3 text-emerald-600 text-sm font-medium">{t.name}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
