'use client';

import React from 'react';

export default function Modal({
  show,
  onClose,
  children,
}: {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!show) return null;

  return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg p-6 shadow-lg w-[95%] max-w-5xl h-[85vh] overflow-y-auto relative">
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
      onClick={onClose}
    >
      ✖
    </button>
    {children}
  </div>
</div>

  );
}
