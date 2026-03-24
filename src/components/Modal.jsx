import React, { useEffect } from 'react'

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-3xl' }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (isOpen) {
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative h-full w-full overflow-y-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 flex min-h-full items-start sm:items-center justify-center">
          <div role="dialog" aria-modal="true" className={`w-full ${maxWidth} rounded-xl bg-white shadow-2xl ring-1 ring-black/10`}>
            <div className="flex items-start justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 text-gray-700 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
