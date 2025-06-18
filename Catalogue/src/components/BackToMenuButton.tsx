import React from 'react';
import { ChevronLeft } from 'lucide-react';

export function BackToMenuButton() {
  return (
    <button
      onClick={() => window.location.href = '/'}
      className="fixed left-6 top-5 z-[1002] flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-medium"
      aria-label="Retour au menu principal"
    >
      <ChevronLeft className="w-5 h-5" />
      Menu principal
    </button>
  );
}