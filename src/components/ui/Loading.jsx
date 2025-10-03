import React from 'react'

const Loading = () => {
  return (
    <div className="min-h-screen grid place-items-center p-2 sm:p-4">
      <div className="flex flex-col items-center gap-4">
        <span className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-gray-600 text-base sm:text-lg">Yükleniyor…</p>
      </div>
    </div>
  )
}

export default Loading
