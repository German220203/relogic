/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type Props = {
  nextStep: () => void
  prevStep: () => void
  formData: any
  updateForm: (data: Partial<any>) => void
}

const schema = z.object({
  postalCode: z
    .string()
    .min(4, 'Código postal demasiado corto')
    .max(10, 'Código postal demasiado largo')
    .regex(/^\d{4,10}$/, 'Formato inválido'),
})

export default function Step5PostalCode({ nextStep, prevStep, formData, updateForm }: Props) {
  const [isChecking, setIsChecking] = useState(false)
  const [errorAPI, setErrorAPI] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ postalCode: string }>({
    resolver: zodResolver(schema),
    defaultValues: { postalCode: formData.postalCode || '' },
  })

  const onSubmit = async (data: { postalCode: string }) => {
    setIsChecking(true)
    setErrorAPI(null)

    updateForm({ postalCode: data.postalCode })
    nextStep()


    // try {
    //   const res = await fetch(`/api/coverage?postalCode=${data.postalCode}`)
    //   const json = await res.json()

    //   if (!json.available) {
    //     setErrorAPI('Lo sentimos, no ofrecemos servicio en ese código postal.')
    //   } else {
    //     updateForm({ postalCode: data.postalCode })
    //     nextStep()
    //   }
    // } catch (err) {
    //   setErrorAPI('Error al verificar la disponibilidad. Intenta de nuevo.')
    // } finally {
    //   setIsChecking(false)
    // }
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4 text-center">Introduce tu código postal</h2>

      <input
        {...register('postalCode')}
        placeholder=""
        className={`
          w-full rounded-xl border font-medium text-center
          p-4 mb-2 transition-all duration-200
          border-gray-300 text-gray-800 bg-white
          ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}
        `}
      />
      {errors.postalCode && <p className="text-red-500 w-full mb-2">{errors.postalCode.message}</p>}
      {errorAPI && <p className="text-red-500 w-full mb-2">{errorAPI}</p>}

      <div className='flex items-center justify-center mt-4 w-full'>
        <button
          type="button"
          onClick={() => prevStep()}
          className="px-6 py-2 bg-red-500 text-white rounded-full text-sm mr-2 transition-colors duration-300 hover:bg-white hover:text-red-500 border border-red-500"
        >
          Volver
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-full text-sm ml-2 transition-colors duration-300 hover:bg-white hover:text-blue-500 border border-blue-500"
          disabled={isChecking}
        >
          {isChecking ? 'Verificando...' : 'Continuar'}
        </button>
      </div>
    </form>
  )
}
