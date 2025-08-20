'use client'

type Step = {
  label: string
  key?: string
  nestedKey?: string
}

const steps: Step[] = [
  { label: 'Tipo', key: 'deviceTypeName' },
  { label: 'Marca', key: 'brandName' },
  { label: 'Modelo', key: 'modelName' },
  { label: 'Reparaciones', key: 'repairs', nestedKey: 'label' },
  { label: 'Código Postal', key: 'postalCode' },
  { label: 'Fecha', key: 'date' },
  { label: 'Envío', key: 'shipping', nestedKey: 'name' },
  { label: 'Resumen' }
]

export default function Steps({
  step,
  formData,
  setStep
}: {
  step: number
  formData: any
  setStep: (s: number) => void
}) {
  return (
    <div className="rounded-lg bg-blue-600 p-6 flex flex-row md:flex-col gap-6 flex-wrap md:gap-4">
      {steps.map((s, i) => {
        let subtitle = '\u00A0'
        if (s.key && formData[s.key]) {
          if (Array.isArray(formData[s.key])) {
            const arr = formData[s.key]
            if (arr.length > 0) {
              if (typeof arr[0] === 'object' && s.nestedKey && s.nestedKey in arr[0]) {
                subtitle = arr.map((item: any) => item[s.nestedKey]).join(', ')
              } else {
                subtitle = arr.join(', ')
              }
            }
          } else if (typeof formData[s.key] === 'object' && s.nestedKey) {
            subtitle = formData[s.key][s.nestedKey] || '\u00A0'
          } else {
            if (s.key === "date" && formData[s.key]) {
              const fecha = new Date(formData[s.key])
              subtitle = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth()+1).toString().padStart(2, '0')}/${fecha.getFullYear()}`
            } else {
              subtitle = formData[s.key] || '\u00A0'
            }
          }
        }

        const stepNumber = i + 1
        const isActive = stepNumber === step
        const isCompleted = stepNumber < step
        const isLocked = stepNumber > step || stepNumber === step // 🔹 Bloquea pasos futuros

        return (
          <button
            key={i}
            onClick={() => {
              if (!isLocked) setStep(stepNumber)
            }}
            className="flex items-center p-1 rounded-lg md:items-start gap-3 group w-full hover:scale-105 active:scale-95 transition-all duration-200 hover:bg-blue-500 hover:shadow-lg"
          >
            {/* Círculo indicador */}
            <div
              className={`
                flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors duration-200
                ${isCompleted ? 'bg-green-500 border-green-500 text-white' :
                  isActive ? 'bg-white border-blue-300 text-blue-600' :
                  'border-white text-white group-hover:border-blue-200'}
              `}
            >
              {isCompleted ? '✓' : stepNumber}
            </div>

            {/* Texto */}
            <div className="flex flex-col items-start">
              <span
                className={`
                  text-sm font-semibold transition-colors
                  ${isActive ? 'text-white' : 'text-blue-100'}
                `}
              >
                {s.label}
              </span>
              <span className="text-xs text-blue-200 truncate max-w-[120px]">
                {subtitle}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
