/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'


import { useState } from 'react'
import DatePicker from 'react-datepicker'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays } from 'date-fns'
import Image from 'next/image';
import NavButtons from '@/components/NavButtons'

type Props = {
  nextStep: () => void
  prevStep: () => void
  formData: any
  updateForm: (data: Partial<any>) => void
}

// ✅ Zod schema corregido
const schema = z.object({
  date: z
    .date()
    .refine(val => !!val, { message: 'La fecha es obligatoria' })
})

type FormData = z.infer<typeof schema>

export default function Step6Date({ nextStep, prevStep, formData, updateForm }: Props) {
  
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: formData.date ? new Date(formData.date) : new Date(addDays(new Date(), 1))
    }
  })

  const onSubmit = (data: FormData) => {
    updateForm({ date: data.date.toISOString() })
    nextStep()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full max-w-sm mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Selecciona una fecha preferida</h2>

        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <div className="w-full flex justify-center">
              <DatePicker
                inline
                selected={field.value}
                onChange={field.onChange}
                minDate={addDays(new Date(), 1)}
                dateFormat="dd/MM/yyyy"
                locale="es"
                calendarClassName="custom-datepicker"
              />
            </div>
          )}
        />

        {errors.date && <p className="text-red-500 mt-2">{errors.date.message}</p>}

        <NavButtons 
          onPrev={prevStep} 
          onNext={handleSubmit(onSubmit)}
        />
      </form>

      <style jsx global>{`
        /* Contenedor del calendario centrado */
        .custom-datepicker {
          font-size: 1.125rem; /* 18px */
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3),
            0 4px 6px -2px rgba(59, 130, 246, 0.05);
          border-radius: 1rem;
          border: 1px solid #d1d5db; /* gris-300 */
          background: white;
          padding: 1rem;
          width: 340px; /* un poco más ancho */
        }

        /* Ajustamos la cabecera para que el título tenga más espacio */
        .custom-datepicker .react-datepicker__header {
          padding: 0.5rem 1rem 1rem;
          position: relative;
        }

        /* Título del mes */
        .custom-datepicker .react-datepicker__current-month {
          color: #009966; /* azul-500 */
          font-weight: 600;
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        /* Flechas de navegación */
        .custom-datepicker .react-datepicker__navigation--previous {
          top: 1.25rem;
          left: 1rem;
          border-right-color: #009966; /* azul-400 */
        }
        .custom-datepicker .react-datepicker__navigation--next {
          top: 1.25rem;
          right: 1rem;
          border-left-color: #009966; /* azul-400 */
        }

        /* Ajustamos tamaño y posición para que no se superpongan */
        .custom-datepicker .react-datepicker__navigation {
          width: 1.5rem;
          height: 1.5rem;
        }

        /* Centrar días y tamaño */
        .custom-datepicker .react-datepicker__month {
          margin: 0 auto;
          width: fit-content;
        }

        /* Días */
        .custom-datepicker .react-datepicker__day {
          width: 2.5rem;
          line-height: 2.5rem;
          margin: 0.15rem;
          border-radius: 0.5rem;
        }

        /* Días seleccionados */
        .custom-datepicker .react-datepicker__day--selected,
        .custom-datepicker .react-datepicker__day--keyboard-selected {
          background-color: #009966; /* azul-400 */
          color: white;
        }

        /* Hover sobre días */
        .custom-datepicker .react-datepicker__day:hover {
          background-color: #c7f9dcff; /* azul-200 */
          color: rgba(0, 0, 0, 1)/* azul-900 */
        }

        /* Días fuera de mes */
        .custom-datepicker .react-datepicker__day--outside-month {
          color: #9ca3af; /* gris-400 */
        }

        /* Días deshabilitados */
        .custom-datepicker .react-datepicker__day--disabled {
          color: #d1d5db; /* gris-300 */
          cursor: not-allowed;
        }
      `}</style>
    </>
  )
}