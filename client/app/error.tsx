"use client"

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
          Oops, something went wrong
        </h1>
        <p className="mb-6 text-gray-300">
          We're sorry for the inconvenience. An unexpected error occurred.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Try again
          </button>
          <Link 
            href="/"
            className="px-6 py-3 border border-gray-700 hover:border-gray-500 text-white font-semibold rounded-lg transition-all duration-300"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  )
}
