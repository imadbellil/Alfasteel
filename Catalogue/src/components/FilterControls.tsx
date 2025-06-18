import React from 'react';
import { Product, CategoryGroup, SortOption } from '../types';

interface FilterControlsProps {
  products: Product[];
  categoryGroups: CategoryGroup[];
  selectedCategory: string;
  searchTerm: string;
  sortOption: SortOption;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: SortOption) => void;
}

export function FilterControls({
  products,
  categoryGroups,
  selectedCategory,
  searchTerm,
  sortOption,
  onCategoryChange,
  onSearchChange,
  onSortChange
}: FilterControlsProps) {
  const getNameCounts = () => {
    const counts: Record<string, number> = {};
    products.forEach(product => {
      counts[product.name] = (counts[product.name] || 0) + 1;
    });
    return counts;
  };

  const nameCounts = getNameCounts();
  const sortedNames = Object.keys(nameCounts).sort((a, b) => a.localeCompare(b, 'fr'));

  return (
    <div className="flex flex-wrap gap-5 justify-center items-center mb-11">
      {/* Category Filter */}
      <div className="flex flex-col gap-1 min-w-[180px]">
        <select
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value)}
          className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none transition-all duration-300 focus:border-gray-400 dark:focus:border-gray-500 focus:bg-gray-50 dark:focus:bg-gray-700 box-border"
        >
          <option value="all">Toutes catégories</option>
          {categoryGroups.map(group => {
            const groupCount = group.names
              .map(name => nameCounts[name] || 0)
              .reduce((a, b) => a + b, 0);
            return (
              <option key={group.label} value={`group:${group.label}`}>
                {group.label} ({groupCount})
              </option>
            );
          })}
          {sortedNames
            .filter(name => !categoryGroups.some(g => g.names.includes(name)))
            .map(name => (
              <option key={name} value={name}>
                {name} ({nameCounts[name]})
              </option>
            ))}
        </select>
      </div>

      {/* Search Input */}
      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Rechercher un produit..."
          className="w-56 max-w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none transition-all duration-300 focus:border-gray-400 dark:focus:border-gray-500 focus:bg-gray-50 dark:focus:bg-gray-700 box-border"
        />
      </div>

      {/* Sort Options */}
      <div className="flex flex-col gap-1 min-w-[180px]">
        <select
          value={sortOption}
          onChange={e => onSortChange(e.target.value as SortOption)}
          className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 outline-none transition-all duration-300 focus:border-gray-400 dark:focus:border-gray-500 focus:bg-gray-50 dark:focus:bg-gray-700 box-border"
        >
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
        </select>
      </div>
    </div>
  );
}