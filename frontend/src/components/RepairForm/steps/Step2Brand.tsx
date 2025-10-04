'use client'

import api from '@/lib/api';
import { useEffect, useState } from 'react'
import NavButtons from '@/components/NavButtons';
import Image from 'next/image';
import "../../../styles/brands.css"

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
    <div className="flex flex-col items-center w-full">
  <h2 className="text-xl font-semibold mb-4 text-center sticky top-0 bg-white z-10 py-2">
    Selecciona la marca
  </h2>

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
  {brands.length === 0 && !loading && hasFetched ? (
    <p className="text-gray-500 text-center col-span-full">
      No hay marcas disponibles para este tipo de dispositivo.
    </p>
  ) : (
    brands.map((b) => (
      <button
        key={b.id}
        onClick={() => {
          updateForm({ brandId: b.id, brandName: b.name });
          nextStep();
        }}
        className={`
          p-4 rounded-xl border text-center font-medium transition-all duration-200
          ${formData.brandId === b.id
            ? 'border-2 border-emerald-600 text-white'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-emerald-50'}
          hover:scale-105 active:scale-95 hover:shadow-lg
          w-full h-40 flex flex-col justify-center items-center
        `}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}${b.image}`}
          alt={b.name}
          width={70}
          height={70}
          className="object-contain"
        />
        <p className="mt-3 text-emerald-600 text-sm font-medium">{b.name}</p>
      </button>
    ))
  )}
</div>
  <NavButtons
      onPrev={prevStep}
    />
</div>


  )
}
