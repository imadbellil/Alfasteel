// Application State
let currentProducts = [...products];
let filteredProducts = [...products];

// DOM Elements
const elements = {
  homeBtn: document.getElementById('home-btn'),
  themeToggle: document.getElementById('theme-toggle'),
  categoryFilter: document.getElementById('category-filter'),
  searchInput: document.getElementById('search-input'),
  sortSelect: document.getElementById('sort-select'),
  productsGrid: document.getElementById('products-grid'),
  noResults: document.getElementById('no-results'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalClose: document.getElementById('modal-close'),
  modalContent: document.getElementById('modal-content')
};

// Utility Functions
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Theme Manager
class ThemeManager {
  constructor() {
    this.theme = this.getInitialTheme();
    this.init();
  }

  getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  init() {
    this.updateTheme();
    this.setupEventListeners();
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.updateTheme();
    localStorage.setItem('theme', this.theme);
  }

  updateTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
  }

  setupEventListeners() {
    elements.themeToggle.addEventListener('click', () => this.toggle());
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.updateTheme();
      }
    });
  }
}

// Filter Manager
class FilterManager {
  constructor() {
    this.init();
  }

  init() {
    this.populateCategoryFilter();
    this.setupEventListeners();
  }

  populateCategoryFilter() {
    const select = elements.categoryFilter;
    select.innerHTML = '<option value="all">Toutes les catégories</option>';

    // Add category groups
    categoryGroups.forEach(group => {
      const count = group.names.reduce((total, name) => {
        return total + products.filter(p => p.name === name).length;
      }, 0);
      
      const option = document.createElement('option');
      option.value = `group:${group.label}`;
      option.textContent = `${group.label} (${count})`;
      select.appendChild(option);
    });

    // Add individual categories not in groups
    const groupedNames = categoryGroups.flatMap(g => g.names);
    const individualCategories = [...new Set(products.map(p => p.category))]
      .filter(category => !categoryGroups.some(g => g.label === category))
      .sort((a, b) => a.localeCompare(b, 'fr'));

    individualCategories.forEach(category => {
      const count = products.filter(p => p.category === category).length;
      const option = document.createElement('option');
      option.value = category;
      option.textContent = `${category} (${count})`;
      select.appendChild(option);
    });
  }

  setupEventListeners() {
    elements.categoryFilter.addEventListener('change', () => this.applyFilters());
    elements.searchInput.addEventListener('input', debounce(() => this.applyFilters(), 300));
    elements.sortSelect.addEventListener('change', () => this.applyFilters());
  }

  applyFilters() {
    let filtered = [...products];

    // Apply category filter
    const categoryValue = elements.categoryFilter.value;
    if (categoryValue && categoryValue !== 'all') {
      if (categoryValue.startsWith('group:')) {
        const groupLabel = categoryValue.slice(6);
        const group = categoryGroups.find(g => g.label === groupLabel);
        if (group) {
          filtered = filtered.filter(product => group.names.includes(product.name));
        }
      } else {
        filtered = filtered.filter(product => product.category === categoryValue);
      }
    }

    // Apply search filter
    const searchTerm = elements.searchInput.value.trim();
    if (searchTerm) {
      const searchWords = normalizeText(searchTerm).split(/\s+/).filter(Boolean);
      filtered = filtered.filter(product => {
        const searchableText = normalizeText([
          product.name,
          product.description,
          product.details,
          product.specs.join(' ')
        ].join(' '));
        
        return searchWords.every(word => searchableText.includes(word));
      });
    }

    // Apply sorting
    const sortValue = elements.sortSelect.value;
    filtered.sort((a, b) => {
      if (sortValue === 'az') {
        return a.name.localeCompare(b.name, 'fr');
      } else {
        return b.name.localeCompare(a.name, 'fr');
      }
    });

    filteredProducts = filtered;
    productRenderer.render(filteredProducts);
  }
}

// Product Renderer
class ProductRenderer {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
  }

  render(products) {
    elements.productsGrid.innerHTML = '';
    
    if (products.length === 0) {
      elements.noResults.style.display = 'block';
      return;
    }

    elements.noResults.style.display = 'none';

    products.forEach((product, index) => {
      const card = this.createProductCard(product, index);
      elements.productsGrid.appendChild(card);
      this.observer.observe(card);
    });
  }

  createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.setProperty('--index', index);
    card.setAttribute('data-product-id', product.id);
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Voir les détails de ${product.name}`);

    card.innerHTML = `
      <div class="card-container">
        <!-- Metallic Top Border -->
        <div class="card-top-border"></div>
        
        <!-- Image Container -->
        <div class="card-image-container">
          <div class="image-overlay"></div>
          <img 
            src="${product.image}" 
            alt="${product.name}" 
            class="card-image"
            loading="lazy"
          >
          
          <!-- Stock Status Badge -->
          <div class="stock-badge">
            <span>En stock</span>
          </div>
        </div>

        <!-- Content Container -->
        <div class="card-content">
          <!-- Product Title -->
          <div class="product-header">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
          </div>
          
          <!-- Specifications -->
          <div class="specifications">
            <h4 class="specs-title">Spécifications</h4>
            <div class="specs-list">
              ${product.specs.slice(0, 2).map(spec => `
                <div class="spec-item">
                  <div class="spec-dot"></div>
                  <span>${spec}</span>
                </div>
              `).join('')}
              ${product.specs.length > 2 ? `
                <div class="specs-more">
                  +${product.specs.length - 2} autres spécifications
                </div>
              ` : ''}
            </div>
          </div>
          
          <!-- Action Button -->
          <div class="action-button">
            <span>Voir détails</span>
          </div>
        </div>

        <!-- Bottom Accent -->
        <div class="card-bottom-border"></div>
      </div>
    `;

    // Add click event listeners
    card.addEventListener('click', () => modalManager.openModal(product));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        modalManager.openModal(product);
      }
    });

    return card;
  }
}

// Modal Manager
class ModalManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    elements.modalClose.addEventListener('click', () => this.closeModal());
    
    elements.modalOverlay.addEventListener('click', (e) => {
      if (e.target === elements.modalOverlay) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.modalOverlay.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  openModal(product) {
    elements.modalContent.innerHTML = `
      <img 
        src="${product.image}" 
        alt="${product.name}" 
        class="modal-image"
      >
      
      <div class="modal-header">
        <h2 class="modal-title">${product.name}</h2>
        <p class="modal-description">${product.description}</p>
      </div>
      
      <div class="modal-specs">
        <h3>Spécifications techniques</h3>
        <ul class="modal-specs-grid">
          ${product.specs.map(spec => `<li>${spec}</li>`).join('')}
        </ul>
      </div>
      
      <div class="modal-details">
        <h3>Détails d'utilisation</h3>
        <p>${product.details}</p>
      </div>
    `;

    elements.modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => {
      elements.modalClose.focus();
    }, 100);
  }

  closeModal() {
    elements.modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Navigation Manager
class NavigationManager {
  constructor() {
    this.init();
  }

  init() {
    elements.homeBtn.addEventListener('click', () => {
      // You can customize this behavior
      window.location.href = '/';
    });
  }
}

// Application Initialization
class App {
  constructor() {
    this.init();
  }

  init() {
    // Initialize managers
    this.themeManager = new ThemeManager();
    this.filterManager = new FilterManager();
    this.modalManager = new ModalManager();
    this.navigationManager = new NavigationManager();
    
    // Initialize product renderer
    window.productRenderer = new ProductRenderer();
    window.modalManager = this.modalManager;
    
    // Initial render
    this.filterManager.applyFilters();
  }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new App();
});


