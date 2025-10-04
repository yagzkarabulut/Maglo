import React from 'react'


// variant: 'full' (default) => takes whole viewport height; 'inline' => minimal height & centered in its box
// size: 'md' | 'sm'
const Loading = ({ variant = 'full', size = 'md', label = 'Yükleniyor…' }) => {
  const wrapperClass = variant === 'full'
    ? 'min-h-screen grid place-items-center p-2 sm:p-4 bg-white/70 backdrop-blur'
    : 'py-12 flex items-center justify-center';
  const spinnerSize = size === 'sm' ? 'w-6 h-6 border-2 sm:w-7 sm:h-7' : 'w-8 h-8 sm:w-10 sm:h-10 border-4';
  const textSize = size === 'sm' ? 'text-sm sm:text-base' : 'text-base sm:text-lg';
  return (
    <div className={wrapperClass} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className={`${spinnerSize} border-gray-300 border-t-blue-500 rounded-full animate-spin`} />
        <p className={`text-gray-600 ${textSize}`}>{label}</p>
      </div>
    </div>
  )
}

export default Loading
