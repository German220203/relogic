/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import NavButtons from '@/components/NavButtons';

type Props = {
  nextStep: () => void
  prevStep: () => void
  formData: any
  updateForm: (data: Partial<any>) => void
}

const shippingSchema = z.object({
  // Datos personales
  firstName: z.string().min(2, 'Nombre demasiado corto'),
  lastName: z.string().min(2, 'Apellidos demasiado cortos'),
  email: z.string().email('Email inválido'),
  phone: z.string().regex(/^\+?\d{7,15}$/, 'Teléfono inválido'),

  // Dirección
  address: z.string().min(5, 'Dirección inválida'),
  number: z.string().min(1, "Número inválido"),
  postalCode: z.string().min(4, 'Código postal inválido').max(10, 'Código postal inválido'),
  extraInfo: z.string().optional(),
  city: z.string().min(2, 'Ciudad inválida'),
})

type ShippingData = z.infer<typeof shippingSchema>

export default function Step7Shipping({ nextStep, prevStep, formData, updateForm }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: formData.shipping,
  })

  const onSubmit = (data: ShippingData) => {
    const fullAddress = [
      data.address,
      data.number,
      data.extraInfo?.trim() ? data.extraInfo : null,
      data.city,
    ]
      .filter(Boolean)
      .join(', ')

    updateForm({
      shipping: {
        address: fullAddress,
        number: data.number,
        cp: data.postalCode,
        city: data.city,
      },
      personalInfo: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
      },
    })

    nextStep()
  }

  const Label = ({ children, required }: { children: string; required?: boolean }) => (
    <label className="font-medium text-gray-700">
      {children}
      {required && <span className="text-red-500"> *</span>}
    </label>
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto flex flex-col gap-10 items-center"
    >
      {/* Bloque Datos Personales */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-6 text-center">Datos personales</h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label required>Nombre</Label>
            <input
              {...register('firstName')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.firstName ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </div>

          <div>
            <Label required>Apellidos</Label>
            <input
              {...register('lastName')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.lastName ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
              
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </div>

          <div>
            <Label required>Correo electrónico</Label>
            <input
              {...register('email')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.email ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <Label required>Móvil (con prefijo)</Label>
            <input
              {...register('phone')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.phone ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
            />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* Bloque Dirección */}
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-6 text-center">Dirección</h2>
        <div className="flex flex-col gap-4">
          <div>
            <Label required>Dirección</Label>
            <input
              {...register('address')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.address ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          </div>

          <div>
            <Label required>Número</Label>
            <input
              {...register('number')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.number ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
            />
            {errors.number && <p className="text-red-500">{errors.number.message}</p>}
          </div>

          <div>
            <Label required>Código postal</Label>
            <input
              {...register('postalCode')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
              value={formData.postalCode}
              readOnly

            />
            {errors.postalCode && <p className="text-red-500">{errors.postalCode.message}</p>}
          </div>

          <div>
            <Label>Más información (opcional)</Label>
            <input
              {...register('extraInfo')}
              className="w-full rounded-xl border border-gray-300 p-4 font-medium text-gray-800 bg-white"
            />
          </div>

          <div>
            <Label required>Ciudad</Label>
            <input
              {...register('city')}
              className={`w-full rounded-xl border p-4 font-medium transition-all duration-200
                ${errors.city ? 'border-red-500' : 'border-gray-300'}
                text-gray-800 bg-white`}
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}
          </div>
        </div>
      </div>

      {/* Botones */}
      <NavButtons
        onPrev={prevStep}
        onNext={handleSubmit(onSubmit)}
      />
    </form>
  )
}