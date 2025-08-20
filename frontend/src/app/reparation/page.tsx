/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import Step3Model from '@/components/RepairForm/steps/Step3Model'
import Step4Repairs from '@/components/RepairForm/steps/Step4Repairs'
import Step5PostalCode from '@/components/RepairForm/steps/Step5PostalCode'
import Step6Date from '@/components/RepairForm/steps/Step6Date'
import Step7Shipping from '@/components/RepairForm/steps/Step7Shipping'
import Step8Summary from '@/components/RepairForm/steps/Step8Summary'
import Step1DeviceType from '@/components/RepairForm/steps/Step1DeviceType'
import Step2Brand from '@/components/RepairForm/steps/Step2Brand'
import ProgressBar from '@/components/RepairForm/progress/ProgressBar'
import Steps from '@/components/RepairForm/progress/Steps'

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
    position: "absolute",
    width: "100%",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
    width: "100%",
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -40 : 40,
    opacity: 0,
    position: "absolute",
    width: "100%",
  }),
};

export default function ReparationPage() {
  const [step, setStep] = useState(1)
   const [direction, setDirection] = useState(1);

  // Estado único para todos los datos del formulario
  const [formData, setFormData] = useState<any>({
    brandId: null,
    brandName: null,
    deviceTypeId: null,
    deviceTypeName: null,
    modelId: null,
    modelName: null,
    repairs: [],
    postalCode: '',
    date: '',
    personalInfo: {
      name: '',
      email: '',
      phone: '',
    },
    shipping: {
      address: '',
      number: '',
      cp: '',
      city: '',
    },
  })

  function updateForm(data: Partial<typeof formData>) {
    setFormData((prev: any) => ({
      ...prev,
      ...data,
    }))
  }

  const stepKeys = [
  'deviceTypeName',
  'brandName',
  'modelName',
  'repairs',
  'postalCode',
  'date',
  'shipping'
  ]

  function resetFormAfterStep(stepIndex: number) {
  setFormData((prev: any) => {
    const updated = { ...prev }
    stepKeys.slice(stepIndex).forEach((key) => {
      if (Array.isArray(updated[key])) {
        updated[key] = []
      } else if (typeof updated[key] === 'object' && updated[key] !== null) {
        updated[key] = {}
      } else {
        updated[key] = null
      }
    })
    return updated
  })
}

  function nextStep() {
    setStep(prev => Math.min(prev + 1, 8))
  }

  function prevStep() {
  const targetStep = Math.max(step - 1, 1)
  resetFormAfterStep(targetStep) // limpia posteriores
  setStep(targetStep)
}

//   const variants = {
//   enter: (direction) => ({
//     x: direction > 0 ? 100 : -100,
//     opacity: 0
//   }),
//   center: {
//     x: 0,
//     opacity: 1
//   },
//   exit: (direction) => ({
//     x: direction > 0 ? -100 : 100,
//     opacity: 0
//   })
// };

   return (
    <main className="grid grid-cols-3 w-[80%] mx-auto pt-10 gap-4">
      <div className='hidden md:block'>
        <Steps
          step={step}
          formData={formData}
          setStep={(target) => {
            if (target < step) {
              resetFormAfterStep(target)
              setStep(target)
            }
          }}
        />
      </div>

      {/* 👇 Contenedor adaptativo y sin recortes */}
      <div className="col-span-2 relative flex flex-col justify-center max-h-[calc(100vh-120px)] min-h-[500px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full overflow-y-auto overflow-x-hidden pr-2 pb-2 [scrollbar-gutter:stable]"
          >
            {step === 1 && (
              <Step1DeviceType
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 2 && (
              <Step2Brand
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 3 && (
              <Step3Model
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 4 && (
              <Step4Repairs
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 5 && (
              <Step5PostalCode
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 6 && (
              <Step6Date
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 7 && (
              <Step7Shipping
                nextStep={nextStep}
                prevStep={prevStep}
                formData={formData}
                updateForm={updateForm}
              />
            )}
            {step === 8 && (
              <Step8Summary
                prevStep={prevStep}
                formData={formData}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
