'use client'

import Image from "next/image"

type Props = {
  onPrev?: () => void
  onNext?: () => void
  disableNext?: boolean
  isChecking?: boolean
  onlyBack?: boolean
  nextVariant?: "blue" | "green"
  nextIcon?: string
}

export default function NavButtons({
  onPrev,
  onNext,
  disableNext,
  isChecking,
  onlyBack,
  nextVariant = "blue",
  nextIcon = "/icons/arrow-big-right.svg",
}: Props) {
  const nextColors =
    nextVariant === "blue"
      ? "bg-blue-500 hover:bg-white hover:text-blue-500 border border-blue-500"
      : "bg-green-500 hover:bg-white hover:text-green-500 border border-green-500"

  return (
    <div className="flex items-center justify-center mt-4">
      {onPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-red-500 text-white border border-red-500 transition-colors duration-300 hover:bg-white hover:text-red-500"
        >
          <Image
            src="/icons/arrow-big-left.svg"
            alt="Atrás"
            width={20}
            height={20}
          />
        </button>
      )}

      {!onlyBack && onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext || isChecking}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white border transition-colors duration-300 ml-3 ${nextColors} disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Image
            src={nextIcon}
            alt="Siguiente"
            width={20}
            height={20}
          />
        </button>
      )}
    </div>
  )
}
