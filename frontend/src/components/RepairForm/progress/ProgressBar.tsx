type Step = {
  label: string
  key?: string
  nestedKey?: string
}

const steps: Step[] = [
  { label: 'Tipo', key: 'deviceTypeName' },
  { label: 'Marca', key: 'brandName' },
  { label: 'Modelo', key: 'modelName' },
  { label: 'Reparaciones', key: 'repairs' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Fecha', key: 'date' },
  { label: 'Envío', key: 'shipping', nestedKey: 'name' },
  { label: 'Resumen' }
]

export default function ProgressBar({
  step,
  formData,
  setStep
}: {
  step: number
  formData: any
  setStep: (s: number) => void
}) {
  const totalSteps = steps.length
  const circleSize = 24 // tamaño px de los círculos
  const halfCircle = circleSize / 2

  // Avance hasta el centro del siguiente círculo
  const progressPercent = ((step - 0.5) / (totalSteps - 1)) * 100

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-8">
      <div className="relative flex items-center">
        {/* Línea base gris */}
      <div
        className="absolute top-[28px] left-[16px] right-[16px] h-1 bg-gray-300"
        style={{ zIndex: 0 }}
      />

      {/* Línea de progreso azul */}
      <div
        className="absolute top-[28px] left-[16px] h-1 bg-blue-600 transition-all duration-500"
        style={{
          width: `calc(${((step - 1) / (steps.length - 1)) * 100}% - ${circleSize / 2}px)`,
          zIndex: 0,
        }}
      />

        {/* Círculos y textos */}
        {steps.map((s, idx) => {
          let subtitle = '\u00A0'
          if (s.key && formData[s.key]) {
            if (Array.isArray(formData[s.key])) {
              subtitle = formData[s.key].length > 0 ? formData[s.key].join(', ') : '\u00A0'
            } else if (typeof formData[s.key] === 'object' && s.nestedKey) {
              subtitle = formData[s.key][s.nestedKey] || '\u00A0'
            } else {
              subtitle = String(formData[s.key])
            }
          }

          return (
            <div key={idx} className="flex-1 flex flex-col items-center relative z-10">
              <div className="flex flex-col items-center mb-2">
                <span
                  className={`${idx + 1 <= step ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}
                >
                  {s.label}
                </span>
                <span className="truncate max-w-[80px] text-gray-600 text-[10px]">{subtitle}</span>
              </div>

              <div
                onClick={() => setStep(idx + 1)}
                className={`rounded-full border-4 w-6 h-6 flex items-center justify-center cursor-pointer transition
                  ${idx + 1 < step
                    ? 'bg-blue-600 border-blue-600 hover:bg-blue-700'
                    : idx + 1 === step
                    ? 'border-blue-600 bg-white hover:bg-blue-50'
                    : 'border-gray-300 bg-white hover:border-blue-400'}`}
              >
                {idx + 1 < step && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}



