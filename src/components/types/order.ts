export type Category = string;
export interface BrandInfo {
  logo: React.ReactNode;
  categories: Category[];
  description: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  iconClass?: string;
  description?: string;
  category: Category;
  // optionally a brand field if needed: brand?: string;
}

export type BrandsMap = Record<string, BrandInfo>;
export type ProductsMap = Record<string, Product[]>;

export interface User {
  id: string;
  name?: string;
  // add other fields your app uses
}

export interface CartContextType {
  addToCart: (product: Product) => void;
  user: User | null;
}

export interface CartItem {
  id: number;
  name?: string;
  price: number;
  quantity: number;
  iconClass?: string;
  description?: string;
  category?: string;
}