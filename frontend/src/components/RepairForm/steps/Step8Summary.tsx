/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import api from '@/lib/api'

type Props = {
  prevStep: () => void
  formData: any
}

type RequestBody = {
  brand: string,
  deviceType: string,
  model: string,
  repairsIds: number[],
  totalPrice: string,
  cp: string,
  address: string,
  client: string,
  phone: string,
  email: string
}


export default function Step8Summary({ prevStep, formData }: Props) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uuid, setUuid] = useState<string | null>(null)
  const [orderStatus, setOrderStatus] = useState<string | null>(null)

  function statusTranslation(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pendiente';
      case 'COLLECTING':
        return 'En proceso de recogida';
      case 'BEING_REPAIRED':
        return 'En reparación';
      case 'DELIVERING':
        return 'En entrega';
      case 'COMPLETED':
        return 'Completado';
      case 'CANCELED':
        return 'Cancelado';
      default:
        return status;
    }
  }

  async function handleConfirm() {
    setLoading(true)
    setError(null)

    try {
      console.log('Enviando datos del formulario:', formData)
      const requestBody: RequestBody = {
        brand: formData.brandName,
        deviceType: formData.deviceTypeName,
        model: formData.modelName,
        repairsIds: formData.repairs?.map((r: any) => r.id) || [],
        totalPrice: formData.repairs?.reduce((total: number, r: any) => total + r.price, 0).toFixed(2) || '0.00',
        cp: formData.postalCode,
        address: formData.shipping?.address || '',
        client: formData.personalInfo?.name || '',
        phone: formData.personalInfo?.phone || '',
        email: formData.personalInfo?.email || ''
      }
      // const response = await fetch('/api/v1/orders/create', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(requestBody),
      // })

      const response = await api.post('/api/v1/orders/create', requestBody)
      if (!response.status.toString().startsWith('2')) {
        throw new Error('Error al enviar el pedido.')
      }

      setSuccess(true)
      setUuid(response.data.uuid)
      setOrderStatus(response.data.status)
    } catch (err: any) {
      setError(err.message || 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }
    

  if (success) {
    return (
      <div className="text-center p-4">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          ¡Pedido creado con éxito!
        </h2>
        <p>Gracias por confiar en nosotros</p>
        <p className="mt-2">Tu número de pedido es: <strong>{uuid}</strong></p>
        {orderStatus && (
          <p className="mt-2">
            Estado del pedido: <strong>{(statusTranslation(orderStatus))}</strong>
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="p-4">
      

      <div className="space-y-2 text-sm flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Resumen del pedido</h2>
        <div className="w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <strong>Marca:</strong> {formData.brandName || formData.brandId}
          </div>
          <div>
            <strong>Tipo:</strong> {formData.deviceTypeName || formData.deviceTypeId}
          </div>
          <div>
            <strong>Modelo:</strong> {formData.modelName || formData.modelId}
          </div>
          <div>
            <strong>Reparaciones:</strong>{' '}
            {formData.repairs?.map((r: any) => r.label).join(', ')}
          </div>
          <div>
            <strong>Precio total:</strong>{' '}
            {formData.repairs?.reduce((total: number, r: any) => total + r.price, 0).toFixed(2)} €
          </div>
          <div>
            <strong>Código Postal:</strong> {formData.postalCode}
          </div>
          <div>
            <strong>Fecha preferida:</strong>{' '}
            {new Date(formData.date).toLocaleDateString()}
          </div>
          <div>
            <strong>Nombre:</strong> {formData.personalInfo?.name}
          </div>
          <div>
            <strong>Dirección:</strong> {formData.shipping?.address}
          </div>
          <div>
            <strong>Email:</strong> {formData.personalInfo?.email}
          </div>
          <div>
            <strong>Teléfono:</strong> {formData.personalInfo?.phone}
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {/* <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-6 w-full px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        type="button"
      >
        {loading ? 'Enviando...' : 'Confirmar Pedido'}
      </button> */}
      <div className='flex items-center justify-center mt-4'>
        <button onClick={() => prevStep()} className="px-6 py-2 bg-red-500 text-white rounded-full text-sm mr-2 transition-colors duration-300 hover:bg-white hover:text-red-500 border border-red-500">Volver</button>
        <button onClick={handleConfirm} disabled={loading} type="button" className="px-6 py-2 bg-green-600 text-white rounded-full text-sm ml-2 transition-colors duration-300 hover:bg-white hover:text-green-600 border border-green-600">
          {loading ? 'Enviando...' : 'Confirmar Pedido'}
        </button>
      </div>
    </div>
  )
}
