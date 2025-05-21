import React, { useState, useEffect, useRef } from 'react';
import './MenuSection.css';
import BianCard from '../../bian_components/BianCard/BianCard';
import menuData from '../../data/menuData.json';
import prototipoImage from '../../bian_assets/images/Prototipo.png'; // Import the local image

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

// Map of menu item IDs to use the local image
const localImageMap = {
  'chef3': true,   // Furay cheese
  'e2': true,  // Locura
  'e3' : true,  // Locura II
  'e4': true,  // Salmón x 9 u.
  'e7': true,
  'sr5': true,
  'sr12': true,
    'sr14': true,
  'sr15': true,
    'maki2': true,
      'nig1': true,
        'sash2': true,
          'wok4': true,
            'comb4': true,
              'beb1': true,
};

const MenuSection = ({ menuRef }) => {
  // Explicitly set the first category ID from menuData.categories
  const firstCategoryIdInMenu = menuData.categories[0]?.id || "chef"; 
  
  // Initialize with the first category from the categories array
  const [activeCategory, setActiveCategory] = useState(firstCategoryIdInMenu);
  const [visibleItems, setVisibleItems] = useState(
    menuData.menuItems.filter(item => item.category === firstCategoryIdInMenu)
  );
  const categorySliderRef = useRef(null);

  // Filter menu items based on selected category
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleItems(menuData.menuItems);
    } else {
      setVisibleItems(menuData.menuItems.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Improved initial scroll position handling with more aggressive reset
  useEffect(() => {
    if (!categorySliderRef.current) return;
    
    // More aggressive approach to reset scroll position
    const resetScrollPosition = () => {
      const container = categorySliderRef.current;
      if (!container) return;
      
      // Apply all methods to ensure it works across browsers
      container.scrollLeft = 0;
      container.scrollTo(0, 0);
      container.scrollTo({
        left: 0,
        behavior: 'auto' 
      });
    };

    // Execute reset multiple times to ensure it works
    resetScrollPosition();
    
    // Additional resets with delays to catch any late-rendering issues
    const timeoutId = setTimeout(() => {
      resetScrollPosition();
      setTimeout(resetScrollPosition, 50);
      setTimeout(resetScrollPosition, 150);
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, []); 

  // Force scroll to ensure the active category (especially the first) is visible
  useEffect(() => {
    const ensureActiveCategoryVisible = () => {
      if (!categorySliderRef.current) return;
      
      const container = categorySliderRef.current;
      // Find the active category button
      const activeButton = container.querySelector(`.category-filter.active`);
      
      if (activeButton) {
        // If it's the first category, ensure scroll is at the start
        if (activeCategory === firstCategoryIdInMenu) {
          container.scrollLeft = 0;
          container.scrollTo(0, 0);
        } else {
          // Otherwise center the active category
          const containerWidth = container.offsetWidth;
          const buttonLeft = activeButton.offsetLeft;
          const buttonWidth = activeButton.offsetWidth;
          container.scrollTo({
            left: Math.max(0, buttonLeft - containerWidth / 2 + buttonWidth / 2),
            behavior: 'smooth'
          });
        }
      }
    };
    
    // Run immediately and after a short delay to catch post-render issues
    ensureActiveCategoryVisible();
    const timeoutId = setTimeout(ensureActiveCategoryVisible, 200);
    return () => clearTimeout(timeoutId);
  }, [activeCategory, firstCategoryIdInMenu]);

  // Handle category change with simplified and more reliable logic
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // Enhanced scroll arrows functionality
  const handleScroll = (direction) => {
    if (categorySliderRef.current) {
      const currentScroll = categorySliderRef.current.scrollLeft;
      const containerWidth = categorySliderRef.current.offsetWidth;
      const scrollAmount = direction === 'left' ? 
        Math.min(-100, -containerWidth/2) : 
        Math.max(100, containerWidth/2);
      
      categorySliderRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <section className="menu-section" id="menu" ref={menuRef}>
      <div className="menu-title-wrapper">
        <h2 className="menu-title">Nuestro Menú</h2>
        <p className="menu-description">Desliza para ver lo que ofrecemos! ➡️ </p>
      </div>

      <div className="category-slider-container">
        <div
          className="category-filters"
          ref={categorySliderRef}
          style={{ 
            overflowX: 'auto', 
            WebkitOverflowScrolling: 'touch', 
            msOverflowStyle: 'auto',
            scrollbarWidth: 'none' // Hide scrollbar in Firefox
          }}
        >
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
        <div className="slider-indicator">
          <span className="arrow left" onClick={() => handleScroll('left')}>‹</span>
          <span className="arrow right" onClick={() => handleScroll('right')}>›</span>
        </div>
      </div>

      <div className="menu-grid">
        {visibleItems.map(item => (
          <BianCard
            key={item.id}
            image={localImageMap[item.id] ? prototipoImage : item.image}
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
