'use client'

import api from '@/lib/api';
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
type Props = { nextStep: Function; formData: any; updateForm: Function }

export default function Step1DeviceType({ nextStep, formData, updateForm }: Props) {
  const [types, setTypes] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    api.get('/api/v1/device-types')
      .then(r => r.data)
      .then(setTypes)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6 text-center">
        Selecciona el tipo de dispositivo
      </h2>

      <div className="grid gap-3 max-w-4xl justify-center grid-cols-3">
        {types.map(t => (
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
                ? 'bg-blue-500 text-white border-blue-700'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'}
              hover:scale-105 active:scale-95 hover:shadow-lg
            `}
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  )
}
