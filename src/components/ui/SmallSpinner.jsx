import React from 'react';

// Küçük, satır içi spinner
export default function SmallSpinner({ className = '' }) {
  return (
    <span
      className={`inline-block align-middle ml-2 w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin ${className}`}
      aria-label="Yükleniyor"
    />
  );
}
