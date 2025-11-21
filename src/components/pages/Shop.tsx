// src/components/Shop.tsx
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import '../styles/Shop.css';
import type { Product, Category, BrandsMap, ProductsMap, CartContextType } from '../types/order';

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('brands');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const cart = useCart() as CartContextType;
  const { addToCart, user } = cart;

  const brands: BrandsMap = {
    'Studds': {
      logo: <i className="fas fa-shield-alt"></i>,
      categories: ['helmets', 'riding-gear'],
      description: 'Premium motorcycle safety gear'
    },
    'Bosch': {
      logo: <i className="fas fa-cogs"></i>,
      categories: ['car-parts', 'bike-parts'],
      description: 'High-quality automotive parts'
    },
    'Gulf': {
      logo: <i className="fas fa-oil-can"></i>,
      categories: ['oils', 'lubricants'],
      description: 'Premium automotive lubricants'
    },
    'Castrol': {
      logo: <i className="fas fa-tint"></i>,
      categories: ['oils', 'lubricants'],
      description: 'Advanced engine oils and fluids'
    },
    'MRF': {
      logo: <i className="fas fa-circle"></i>,
      categories: ['tyres'],
      description: 'Superior quality tyres'
    }
  };

  const products: ProductsMap = {
    'Studds': [
      {
        id: 1,
        name: 'Professional Full Face Helmet',
        price: 2499.99,
        iconClass: "fas fa-helmet-safety",
        description: 'DOT certified full face helmet',
        category: 'helmets'
      },
      {
        id: 2,
        name: 'Riding Gloves',
        price: 799.99,
        iconClass: "fas fa-mitten",
        description: 'Premium leather riding gloves',
        category: 'riding-gear'
      },
      {
        id: 3,
        name: 'Open Face Helmet',
        price: 1499.99,
        iconClass: "fas fa-helmet-safety",
        description: 'Lightweight open face helmet with visor',
        category: 'helmets'
      },
      {
        id: 4,
        name: 'Racing Jacket',
        price: 3999.99,
        iconClass: "fas fa-tshirt",
        description: 'Protective racing jacket with padding',
        category: 'riding-gear'
      },
      {
        id: 5,
        name: 'Modular Helmet',
        price: 3499.99,
        iconClass: "fas fa-helmet-safety",
        description: 'Flip-up modular helmet with dual visor',
        category: 'helmets'
      }
    ],
    'Bosch': [
      {
        id: 6,
        name: 'Spark Plug Set',
        price: 499.99,
        iconClass: "fas fa-plug",
        description: 'High performance spark plugs',
        category: 'car-parts'
      },
      {
        id: 7,
        name: 'Fuel Injection Kit',
        price: 12999.99,
        iconClass: "fas fa-gas-pump",
        description: 'Electronic fuel injection system',
        category: 'car-parts'
      },
      {
        id: 8,
        name: 'Brake Pads',
        price: 1499.99,
        iconClass: "fas fa-brake-circle",
        description: 'Ceramic brake pads for cars',
        category: 'car-parts'
      },
      {
        id: 9,
        name: 'Air Filter',
        price: 399.99,
        iconClass: "fas fa-wind",
        description: 'High-flow air filter for bikes',
        category: 'bike-parts'
      },
      {
        id: 10,
        name: 'Chain Kit',
        price: 2499.99,
        iconClass: "fas fa-link",
        description: 'Complete chain and sprocket kit',
        category: 'bike-parts'
      }
    ],
    'Gulf': [
      {
        id: 11,
        name: 'Engine Oil 5W-40',
        price: 799.99,
        iconClass: "fas fa-oil-can",
        description: 'Synthetic engine oil for cars',
        category: 'oils'
      },
      {
        id: 12,
        name: 'Gear Oil',
        price: 449.99,
        iconClass: "fas fa-cog",
        description: 'Transmission fluid for bikes',
        category: 'oils'
      },
      {
        id: 13,
        name: 'Chain Lube',
        price: 299.99,
        iconClass: "fas fa-tint",
        description: 'All-weather chain lubricant',
        category: 'lubricants'
      },
      {
        id: 14,
        name: 'Brake Fluid DOT4',
        price: 349.99,
        iconClass: "fas fa-tint",
        description: 'High performance brake fluid',
        category: 'lubricants'
      },
      {
        id: 15,
        name: 'Engine Oil 10W-30',
        price: 699.99,
        iconClass: "fas fa-oil-can",
        description: 'Semi-synthetic bike engine oil',
        category: 'oils'
      }
    ],
    'Castrol': [
      {
        id: 16,
        name: 'Power1 10W-50',
        price: 899.99,
        iconClass: "fas fa-oil-can",
        description: 'Racing grade motorcycle oil',
        category: 'oils'
      },
      {
        id: 17,
        name: 'EDGE 5W-40',
        price: 999.99,
        iconClass: "fas fa-oil-can",
        description: 'Full synthetic car engine oil',
        category: 'oils'
      },
      {
        id: 18,
        name: 'Fork Oil',
        price: 549.99,
        iconClass: "fas fa-tint",
        description: 'Suspension fork oil',
        category: 'lubricants'
      },
      {
        id: 19,
        name: 'Grease',
        price: 249.99,
        iconClass: "fas fa-oil-can",
        description: 'Multi-purpose automotive grease',
        category: 'lubricants'
      },
      {
        id: 20,
        name: 'GTX Diesel',
        price: 849.99,
        iconClass: "fas fa-oil-can",
        description: 'Diesel engine oil',
        category: 'oils'
      }
    ],
    'MRF': [
      {
        id: 21,
        name: 'Sport Bike Tyre',
        price: 3499.99,
        iconClass: "fas fa-circle",
        description: 'High grip sport bike tyre',
        category: 'tyres'
      },
      {
        id: 22,
        name: 'Car Alloy Wheel',
        price: 4999.99,
        iconClass: "fas fa-circle",
        description: 'Lightweight alloy wheel',
        category: 'tyres'
      },
      {
        id: 23,
        name: 'Cruiser Tyre',
        price: 2999.99,
        iconClass: "fas fa-circle",
        description: 'Long-lasting cruiser bike tyre',
        category: 'tyres'
      },
      {
        id: 24,
        name: 'Off-road Tyre',
        price: 3999.99,
        iconClass: "fas fa-circle",
        description: 'All-terrain bike tyre',
        category: 'tyres'
      },
      {
        id: 25,
        name: 'Scooter Tyre',
        price: 1499.99,
        iconClass: "fas fa-circle",
        description: 'Durable scooter tyre',
        category: 'tyres'
      }
    ]
  };

  const handleBrandSelect = (brandName: string) => {
    setSelectedBrand(brandName);
    setActiveCategory('all');
  };

  const handleAddToCart = (product: Product) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    addToCart(product);
  };

  // Show brands view
  if (!selectedBrand) {
    return (
      <div className="shop-container">
        <h1>Our Brands</h1>
        <div className="brands-grid">
          {Object.entries(brands).map(([brandName, brandInfo]) => (
            <div
              key={brandName}
              className="brand-card"
              onClick={() => handleBrandSelect(brandName)}
            >
              <div className="brand-logo">{brandInfo.logo}</div>
              <h3>{brandName}</h3>
              <p>{brandInfo.description}</p>
              <div className="brand-categories">
                {brandInfo.categories.map((category) => (
                  <span key={category} className="category-tag">
                    {category.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show products view for selected brand
  const brandProducts: Product[] = products[selectedBrand] ?? [];
  const categories = [...new Set(brandProducts.map((product) => product.category))];

  return (
    <div className="shop-container">
      <div className="brand-header">
        <button className="back-button" onClick={() => setSelectedBrand(null)}>
          <i className="fas fa-arrow-left"></i> Back to Brands
        </button>
        <h2>{selectedBrand} Products</h2>
      </div>

      <div className="shop-categories">
        <button
          className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Products
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.replace('-', ' ')}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {brandProducts
          .filter((product) => activeCategory === 'all' || product.category === activeCategory)
          .map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <i className={product.iconClass}></i>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">₹{product.price.toFixed(2)}</div>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shop;
