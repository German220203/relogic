/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import api from '@/lib/api'
import { useEffect, useState } from 'react'

type Props = {
  nextStep: () => void
  prevStep: () => void
  formData: any
  updateForm: (data: Partial<any>) => void
}

type Repair = {
  id: string
  price: number
  repairTypeName: string


}

export default function Step4Repairs({ nextStep, prevStep, formData, updateForm }: Props) {
  const [repairs, setRepairs] = useState<Repair[]>([])
  const [selected, setSelected] = useState<string[]>(formData.repairs?.map((r: any) => r.id) || [])

  useEffect(() => {
    if (!formData.modelId) return
      api.get(`/api/v1/repairs/by-model/${formData.modelId}`).then(r => r.data).then(setRepairs)
      // console.log("fetched: ", api.get(`/api/v1/repairs/by-model/${formData.modelId}`).then(r => r.data))
      // console.log('Repairs fetched:', repairs)
    // fetch(`/api/repairs?modelId=${formData.modelId}`)
    //   .then(res => res.json())
    //   .then(setRepairs)
    // setRepairs([
    //   { id: '1', name: 'Cambio de pantalla' },
    //   { id: '2', name: 'Reemplazo de batería' },
    //   { id: '3', name: 'Reparación de puerto USB' },
    //   { id: '4', name: 'Actualización de software' },
    // ])
  }, [formData.modelId])

  const toggleRepair = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    )
  }

  const handleContinue = () => {
    const selectedRepairs = repairs
      .filter(r => selected.includes(r.id))
      .map(r => ({ id: r.id, label: r.repairTypeName, price: r.price }))

    if (selectedRepairs.length === 0) {
      alert('Selecciona al menos una reparación')
      return
    }

    updateForm({ repairs: selectedRepairs })
    nextStep()
  }

    return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Selecciona las reparaciones necesarias
      </h2>

      <div className="grid gap-4 max-w-4xl justify-center grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
        {repairs.length === 0 && (
          <p className="text-gray-500">No hay reparaciones disponibles para este modelo.</p>
        )}
        {repairs.map(repair => (
          <button
            key={repair.id}
            type="button"
            onClick={() => toggleRepair(repair.id)}
            className={`flex flex-col items-start gap-1 border p-4 rounded-xl cursor-pointer transition-all duration-200
              ${selected.includes(repair.id)
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'}
              hover:scale-105 active:scale-95 hover:shadow-lg
            `}
          >
            <span className="font-medium">{repair.repairTypeName}</span>
            <span className="text-gray-500 text-sm">{repair.price.toFixed(2)} €</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => prevStep()}
          className="px-6 py-2 bg-red-500 text-white rounded-full text-sm mr-2 transition-colors duration-300 hover:bg-white hover:text-red-500 border border-red-500"
        >
          Volver
        </button>
        {repairs.length > 0 && (
          <button
            onClick={handleContinue}
            className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm ml-2 transition-colors duration-300 hover:bg-white hover:text-blue-500 border border-blue-500"
          >
            Continuar
          </button>)}
      </div>
    </div>
  )
}