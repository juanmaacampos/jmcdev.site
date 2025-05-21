import React, { useState, useEffect } from 'react';
import './MenuSection.css';
import BianCard from '../../bian_components/BianCard/BianCard';
import menuData from '../../data/menuData.json';

// Category icons mapping
const categoryIcons = {
  'chef': '👨‍🍳', // Chef icon
  'entradas': '🍢', // Appetizers icon
  'sushi-rolls': '🍣', // Sushi icon
  'maki': '🍙', // Rice roll icon
  'niguiri': '🍣', // Sushi emoji for niguiri
  'sashimi': '🔪', // Knife for sashimi
  'wok': '🥘', // Wok/cooking pan icon
  'combinados': '🍱', // Bento box for combinations
  'bebidas': '🥤', // Drink icon
  'all': '🍽️' // All food icon
};

const MenuSection = ({ menuRef }) => {
  const [activeCategory, setActiveCategory] = useState('chef');
  const [visibleItems, setVisibleItems] = useState(
    menuData.menuItems.filter(item => item.category === 'chef')
  );
  
  // Filter menu items based on selected category
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleItems(menuData.menuItems);
    } else {
      setVisibleItems(menuData.menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Handle category change - removed scrolling behavior
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    // Removed scrolling code to prevent unwanted navigation to the header
  };
  
  return (
    <section className="menu-section" id="menu" ref={menuRef}>
      <div className="menu-title-wrapper">
        <h2 className="menu-title">Nuestro Menú</h2>
        <p className="menu-description">El sabor de la cocina japonesa en tu mesa 👉 </p>
      </div>

      <div className="category-filters">
        {menuData.categories.map(category => (
          <button 
            key={category.id} 
            className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span className="category-icon">{categoryIcons[category.id] || '🍽️'}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {visibleItems.map(item => (
          <BianCard
            key={item.id}
            image={item.image}
            title={item.name}
            description={item.description}
            price={item.price}
            onAddToCart={() => console.log(`Added ${item.name} to cart`)}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
