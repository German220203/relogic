/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '@/lib/api'
import Image from 'next/image';
import NavButtons from '@/components/NavButtons'

type Props = { nextStep: () => void; prevStep: () => void; formData: any; updateForm: (data: any) => void }

const schema = z.object({ modelId: z.string().min(1, "Selecciona un modelo") })



export default function Step3Model({ nextStep, prevStep, formData, updateForm }: Props) {
  const [models, setModels] = useState<{ id: string; name: string }[]>([])
  const { register, handleSubmit, formState: { errors } } = useForm<{modelId: string}>({
    resolver: zodResolver(schema),
    defaultValues: { modelId: formData.modelId }
  })
  const [hasFetched, setHasFetched] = useState(false); // bandera
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!formData.brandId) return
    setHasFetched(false); // reiniciamos cada vez que se cambia el tipo de dispositivo
    setLoading(true);
    api.get(`/api/v1/models/by-brand-and-device-type/${formData.brandId}/${formData.deviceTypeId}`)
    .then(r => r.data)
    .then(setModels)
    .catch((err) => {setModels([])})
      .finally(() => {
      setLoading(false);
      setHasFetched(true);
    });

  }, [formData.brandId, formData.deviceTypeId])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    updateForm(data)
    nextStep()
  }

    return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Selecciona el modelo de dispositivo
      </h2>

      <div className="grid gap-4 max-w-4xl justify-center grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {models.length === 0 && !loading && hasFetched && (
          <p className="text-gray-500">No hay modelos disponibles para esta marca y tipo de dispositivo.</p>
        )}
        {models.map(m => (
          <button
            key={m.id}
            onClick={() => {
              updateForm({ modelId: m.id, modelName: m.name })
              console.log('Actualizado a:', { modelId: m.id, modelName: m.name })
              nextStep()
            }}
            className={`
              p-4 rounded-xl border text-center font-medium transition-all duration-200
              ${formData.modelId === m.id
                ? 'bg-emerald-600 text-white'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-emerald-50'}
              hover:scale-105 active:scale-95 hover:shadow-lg
            `}
          >
            {m.name}
          </button>
        ))}
      </div>

      <NavButtons
        onPrev={prevStep}
      />
    </div>
  )
}
