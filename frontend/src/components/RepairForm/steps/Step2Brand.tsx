'use client'

import api from '@/lib/api';
import { useEffect, useState } from 'react'
import NavButtons from '@/components/NavButtons';

type Props = { nextStep: () => void; prevStep: () => void; formData: any; updateForm: Function }

export default function Step2Brand({ nextStep, prevStep, formData, updateForm }: Props) {
  const [brands, setBrands] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [hasFetched, setHasFetched] = useState(false); // bandera

  useEffect(() => {
    if (!formData.deviceTypeId) return
    setHasFetched(false); // reiniciamos cada vez que se cambia el tipo de dispositivo
    setLoading(true);
    api.get('/api/v1/brands/by-device-type/' + formData.deviceTypeId)
      .then(r => r.data)
      .then(setBrands)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {setBrands([])})
      .finally(() => {
      setLoading(false);
      setHasFetched(true);
    });
  }, [formData.deviceTypeId])

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">Selecciona la marca</h2>
      
      <div className="grid gap-4 max-w-4xl justify-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))]">
        {loading && <p className="text-gray-500"></p>}
        {brands.length === 0 && !loading && hasFetched && (
          <p className="text-gray-500">No hay marcas disponibles para este tipo de dispositivo.</p>
        )}
        {brands.map(b => (
          <button
            key={b.id}
            onClick={() => {
              updateForm({ brandId: b.id, brandName: b.name })
              console.log('Actualizado a:', { brandId: b.id, brandName: b.name })
              nextStep()
            }}
            className={`
              p-4 rounded-xl border text-center font-medium transition-all duration-200
              ${formData.brandId === b.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-emerald-50'}
              hover:scale-105 active:scale-95 hover:shadow-lg
            `}
          >
            {b.name}
          </button>
        ))}
      </div>
      <NavButtons
        onPrev={prevStep}
      />
    </div>
  )
}
