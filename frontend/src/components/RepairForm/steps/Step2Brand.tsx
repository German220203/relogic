'use client'

import api from '@/lib/api';
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-explicit-any
type Props = { nextStep: Function; prevStep: Function; formData: any; updateForm: Function }

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
                ? 'bg-blue-500 text-white border-blue-700'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100'}
              hover:scale-105 active:scale-95 hover:shadow-lg
            `}
          >
            {b.name}
          </button>
        ))}
      </div>

      <div className='flex items-center justify-center mt-4'>
        <button
          onClick={() => prevStep()}
          className="px-6 py-2 bg-red-500 text-white rounded-full text-sm mr-2 transition-colors duration-300 hover:bg-white hover:text-red-500 border border-red-500"
        >
          Volver
        </button>
      </div>
    </div>
  )
}
