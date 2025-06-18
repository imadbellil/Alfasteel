export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  description: string;
  specs: string[];
  price: number | null;
  details: string;
}

export interface CategoryGroup {
  label: string;
  names: string[];
}

export type SortOption = 'az' | 'za';