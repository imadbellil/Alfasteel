import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={e => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-[95vw] p-8 shadow-2xl relative animate-in slide-in-from-bottom-8 duration-300 outline-none"
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center">
          {/* Product Image */}
          <div className="w-full flex justify-center items-center h-64 max-h-[60vw] mb-5">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-xl"
            />
          </div>

          {/* Product Title */}
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white font-mono mb-3 text-center">
            {product.name}
          </h3>

          {/* Description */}
          <div className="text-gray-600 dark:text-gray-300 mb-3 text-center">
            {product.description}
          </div>

          {/* Specifications */}
          <div className="text-sm text-gray-800 dark:text-gray-200 mb-3">
            <ul className="list-disc list-inside space-y-1">
              {product.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Details */}
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {product.details}
          </div>
        </div>
      </div>
    </div>
  );
}