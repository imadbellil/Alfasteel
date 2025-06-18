import React, { useState, useMemo } from 'react';
import { Product, SortOption } from './types';
import { products, categoryGroups } from './data/products';
import { searchProducts } from './utils/search';
import { DarkModeToggle } from './components/DarkModeToggle';
import { BackToMenuButton } from './components/BackToMenuButton';
import { FilterControls } from './components/FilterControls';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('az');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      if (selectedCategory.startsWith('group:')) {
        const groupLabel = selectedCategory.slice(6);
        const group = categoryGroups.find(g => g.label === groupLabel);
        if (group) {
          filtered = filtered.filter(product => group.names.includes(product.name));
        }
      } else {
        filtered = filtered.filter(product => product.name === selectedCategory);
      }
    }

    // Filter by search
    filtered = searchProducts(filtered, searchTerm);

    // Sort
    filtered.sort((a, b) => {
      if (sortOption === 'az') {
        return a.name.localeCompare(b.name, 'fr');
      } else {
        return b.name.localeCompare(a.name, 'fr');
      }
    });

    return filtered;
  }, [selectedCategory, searchTerm, sortOption]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <BackToMenuButton />
      <DarkModeToggle />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-10 min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-9 font-mono tracking-tight">
          Catalogue Produits
        </h1>
        
        {/* Filter Controls */}
        <FilterControls
          products={products}
          categoryGroups={categoryGroups}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          sortOption={sortOption}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchTerm}
          onSortChange={setSortOption}
        />

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          onProductClick={handleProductClick}
        />

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              Aucun produit trouvé pour vos critères de recherche.
            </p>
          </div>
        )}
      </main>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;