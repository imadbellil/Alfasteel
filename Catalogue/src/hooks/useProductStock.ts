import { useState, useEffect } from 'react';
import { Product } from '../types';

export function useProductStock(products: Product[]) {
  const [stockMap, setStockMap] = useState<Record<number, number>>({});

  useEffect(() => {
    const generateStock = () => {
      const newStock: Record<number, number> = {};
      products.forEach(product => {
        newStock[product.id] = Math.floor(Math.random() * 48) + 3;
      });
      return newStock;
    };

    setStockMap(generateStock());
  }, [products]);

  return stockMap;
}