'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-100 to-red-300 p-4">
      <h2 className="text-2xl font-bold text-red-800 mb-4">出錯了！</h2>
      <p className="text-red-700 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        重試
      </button>
    </div>
  )
}

