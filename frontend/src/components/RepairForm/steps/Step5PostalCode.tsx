/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image';
import NavButtons from '@/components/NavButtons'

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

      <NavButtons
        onPrev={prevStep}
        onNext={handleSubmit(onSubmit)}
        disableNext={isChecking}
        isChecking={isChecking}
      />
    </form>
  )
}
