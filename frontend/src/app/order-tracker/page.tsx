'use client'

import api from "@/lib/api";
import { useState } from "react";
import { CheckCircle, Package, Wrench, Truck, Home, Clock, XCircle } from "lucide-react";

export default function OrderTracker() {
  const [uuid, setUuid] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [reparations, setReparations] = useState<any[]>([]);
  const [deliveryInfo, setDeliveryInfo] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: "PENDING", label: "Pendiente", icon: Clock },
    { id: "COLLECTING", label: "Recogida", icon: Package },
    { id: "BEING_REPAIRED", label: "Reparando", icon: Wrench },
    { id: "DELIVERING", label: "En entrega", icon: Truck },
    { id: "COMPLETED", label: "Completado", icon: CheckCircle },
  ];

  function statusTranslation(status: string): string {
    switch (status) {
      case "PENDING": return "Pendiente";
      case "COLLECTING": return "En proceso de recogida";
      case "BEING_REPAIRED": return "En reparación";
      case "DELIVERING": return "En entrega";
      case "COMPLETED": return "Completado";
      case "CANCELLED": return "Cancelado";
      default: return status;
    }
  }

  const trackOrder = async () => {
    if (!uuid.trim()) {
      setError("Introduce un código de seguimiento válido.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await api.get(`/api/v1/orders/track/${uuid}`);
      setOrderStatus(response.data.status);
      setReparations(response.data.reparations || []);
      setDeliveryInfo(response.data.deliveryInfo || null);
    } catch {
      setError("Error rastreando el pedido. Por favor, verifica el código de seguimiento.");
      setOrderStatus(null);
      setReparations([]);
      setDeliveryInfo(null);
    } finally {
      setLoading(false);
    }
  };

  // Determina el paso actual
  const currentStepIndex = steps.findIndex(s => s.id === orderStatus);

  return (
    <div className="flex flex-col items-center w-full px-4 py-5">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-emerald-700 mb-8">
          Rastreador de pedidos
        </h1>

        {/* GRID RESPONSIVA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Columna izquierda: búsqueda */}
          <div className="flex flex-col items-center md:items-start">
            <input
              type="text"
              placeholder="Introduce el código de seguimiento"
              value={uuid}
              onChange={(e) => setUuid(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 w-full max-w-md mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={trackOrder}
              disabled={loading}
              className={`px-6 py-3 rounded-xl border transition-all duration-200 font-medium
                ${loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-white hover:text-emerald-600 border-emerald-600 hover:shadow-lg'}
              `}
            >
              {loading ? "Buscando..." : "Rastrear pedido"}
            </button>

            {error && <p className="text-red-500 mt-4 text-center md:text-left">{error}</p>}
          </div>

          {/* Columna derecha: resultados */}
          <div className="space-y-6">
            {orderStatus && (
              <>
                {/* PROGRESO */}
                {orderStatus !== "CANCELLED" ? (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-between w-full relative max-w-md">
                      {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index <= currentStepIndex;
                        const isCompleted = index < currentStepIndex;

                        return (
                          <div key={step.id} className="flex flex-col items-center z-10">
                            <div
                              className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                isActive
                                  ? "bg-emerald-600 border-emerald-600 text-white"
                                  : "border-gray-300 text-gray-400 bg-white"
                              }`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <p
                              className={`text-xs mt-2 ${
                                isActive ? "text-emerald-700 font-semibold" : "text-gray-500"
                              }`}
                            >
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                      {/* Línea de conexión */}
                      <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 -z-10" />
                      <div
                        className="absolute top-5 left-0 h-0.5 bg-emerald-600 -z-10 transition-all duration-500"
                        style={{
                          width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-red-600">
                    <XCircle className="w-6 h-6" />
                    <p className="font-medium">Pedido cancelado</p>
                  </div>
                )}

                {/* Detalles del pedido
                <div className="p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h2 className="text-lg font-semibold text-emerald-700 mb-2">Detalles del pedido</h2>
                  <p className="text-gray-700">
                    <span className="font-medium">Estado:</span> {statusTranslation(orderStatus)}
                  </p>
                </div> */}
              </>
            )}

            {reparations.length > 0 && (
              <div className="p-4 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-emerald-700 mb-2">Reparaciones</h2>
                <ul className="list-disc list-inside text-gray-700">
                  {reparations.map((repair, i) => (
                    <li key={i}>
                      {repair.repairTypeName} – {repair.price} €
                    </li>
                  ))}
                </ul>
                <p className="mt-2 font-semibold text-gray-800">
                  Total: {reparations.reduce((t, r) => t + r.price, 0).toFixed(2)} €
                </p>
              </div>
            )}

            {deliveryInfo && (
              <div className="p-4 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-lg font-semibold text-emerald-700 mb-2">Información de entrega</h2>
                <p className="text-gray-700">Dirección: {deliveryInfo.address}</p>
                <p className="text-gray-700">Código postal: {deliveryInfo.postalCode}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
