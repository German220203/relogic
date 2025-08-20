'use client';

import api from "@/lib/api";
import { useState } from "react";

export default function OrderTracker() {

    const [uuid, setUuid] = useState("");
    const [orderStatus, setOrderStatus] = useState(null);
    const [reparations, setReparations] = useState([]);
    const [deliveryInfo, setDeliveryInfo] = useState(null);
    const [error, setError] = useState("");

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

    const trackOrder = async () => {
        try {
            const response = await api.get("/api/v1/orders/track/" + uuid);
            setOrderStatus(response.data.status);
            setReparations(response.data.reparations);
            setDeliveryInfo(response.data.deliveryInfo);
            console.log(response.data);
        } catch (err) {
            setError("Error rastreando el pedido. Por favor, verifica el código de seguimiento.");
        }
    };

    return (
        <div className="order-tracker">
            <h1 className="text-center text-xl mb-4">Rastreador de pedidos</h1>
            <input
                type="text"
                placeholder="Introduce el código de seguimiento"
                value={uuid}
                onChange={(e) => setUuid(e.target.value)}
                className="border p-2 rounded w-full max-w-md mb-4"
            />
            <button
                onClick={trackOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-blue-500 border border-blue-500"
            >
                Rastrear pedido
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {orderStatus && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Detalles del pedido</h2>
                    <p>Estado del pedido: {statusTranslation(orderStatus)}</p>
                    <h1 className="text-lg font-semibold">Reparaciones</h1>
                    {reparations.length > 0 && (
                        <div className="mt-2">
                            <ul className="mt-2">
                                {reparations.map((repair, index) => (
                                    <li key={index} className="mb-2">
                                        {repair.repairTypeName} - {repair.price} €
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2">Total: {reparations.reduce((total, repair) => total + repair.price, 0).toFixed(2)} €</p>
                        </div>
                    )}
                </div>
            )}

            {deliveryInfo && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Información de entrega</h2>
                    <p>Dirección: {deliveryInfo.address}</p>
                    <p>Código postal: {deliveryInfo.postalCode}</p>
                    {/* <p>Fecha estimada de entrega: {new Date(deliveryInfo.estimatedDate).toLocaleDateString()}</p> */}
                </div>
            )}


            {/* {orderStatus && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Estado del pedido: {orderStatus}</h2>
                    {reparations.length > 0 && (
                        <ul className="mt-2">
                            {reparations.map((repair, index) => (
                                <li key={index} className="mb-2">
                                    Reparación: {repair.description} - Fecha: {new Date(repair.date).toLocaleDateString()}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )} */}
        </div>

    )

}