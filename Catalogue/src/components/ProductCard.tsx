import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: () => void;
}

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.13 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative group cursor-pointer h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
          e.preventDefault();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Voir les détails de ${product.name}`}
    >
      {/* Main Card Container */}
      <div className="relative h-full bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] border border-slate-200/50 dark:border-gray-700/50 overflow-hidden">
        
        {/* Metallic Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600"></div>
        
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Image Background with Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-200/20 to-slate-300/20 dark:from-gray-700/20 dark:to-gray-600/20"></div>
          
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          {/* Stock Status Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-xs font-semibold text-white rounded-full border border-green-400/50">
              En stock
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-4">
          {/* Product Title */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {product.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
              Spécifications
            </h4>
            <div className="space-y-1">
              {product.specs.slice(0, 2).map((spec, i) => (
                <div key={i} className="flex items-center text-xs text-slate-700 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-gray-500 rounded-full mr-2 flex-shrink-0"></div>
                  <span className="line-clamp-1">{spec}</span>
                </div>
              ))}
              {product.specs.length > 2 && (
                <div className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                  +{product.specs.length - 2} autres spécifications
                </div>
              )}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <div className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-center transition-all duration-300 ${
              isHovered 
                ? 'bg-gradient-to-r from-slate-700 to-slate-800 dark:from-slate-600 dark:to-slate-700 text-white shadow-lg' 
                : 'bg-gradient-to-r from-slate-100 to-slate-200 dark:from-gray-700 dark:to-gray-600 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-gray-600'
            }`}>
              Voir détails
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 via-slate-300 to-slate-400 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600"></div>
      </div>
    </div>
  );
}