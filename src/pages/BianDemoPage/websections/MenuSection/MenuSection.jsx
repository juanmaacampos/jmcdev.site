import React, { useState, useEffect } from 'react';
import './MenuSection.css';

// Menu data moved from BianDemoPage
const MENU_ITEMS = [
  {
    id: 1,
    name: 'Nigiri Salmón',
    price: '$850',
    description: 'Arroz cubierto con finos cortes de salmón fresco',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500&auto=format&fit=crop',
    category: 'nigiri'
  },
  {
    id: 2,
    name: 'Maki California',
    price: '$1200',
    description: 'Roll relleno de kanikama, palta y pepino',
    image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=500&auto=format&fit=crop',
    category: 'rolls'
  },
  {
    id: 3,
    name: 'Sashimi Variado',
    price: '$1500',
    description: 'Selección de cortes frescos de salmón, atún y pez blanco',
    image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?q=80&w=500&auto=format&fit=crop',
    category: 'sashimi'
  },
  {
    id: 4,
    name: 'Temaki Spicy Tuna',
    price: '$950',
    description: 'Cono de alga nori con atún picante y verduras',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=500&auto=format&fit=crop',
    category: 'temaki'
  },
  {
    id: 5,
    name: 'Uramaki Philadelphia',
    price: '$1300',
    description: 'Roll invertido con salmón, queso crema y palta',
    image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=500&auto=format&fit=crop',
    category: 'rolls'
  },
  {
    id: 6,
    name: 'Gyoza de Cerdo',
    price: '$900',
    description: 'Empanadillas japonesas rellenas de cerdo y verduras',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?q=80&w=500&auto=format&fit=crop',
    category: 'appetizers'
  }
];

// Categories moved from BianDemoPage
const CATEGORIES = [
  { id: 'all', name: 'Todos' },
  { id: 'nigiri', name: 'Nigiri' },
  { id: 'rolls', name: 'Rolls' },
  { id: 'sashimi', name: 'Sashimi' },
  { id: 'temaki', name: 'Temaki' },
  { id: 'appetizers', name: 'Entradas' }
];

const MenuSection = ({ menuRef }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleItems, setVisibleItems] = useState(MENU_ITEMS);
  
  // Filter menu items based on selected category
  useEffect(() => {
    if (activeCategory === 'all') {
      setVisibleItems(MENU_ITEMS);
    } else {
      setVisibleItems(MENU_ITEMS.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);
  
  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Scroll to menu section when category is changed (if needed)
    if (menuRef && menuRef.current && categoryId !== 'all') {
      const menuTopOffset = menuRef.current.offsetTop;
      const filtersHeight = document.querySelector('.category-filters')?.offsetHeight || 0;
      
      window.scrollTo({
        top: menuTopOffset - filtersHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="menu-section" id="menu" ref={menuRef}>
      <div className="section-title-container">
        <h2 className="section-title">Nuestro Menú</h2>
        <p className="section-subtitle">Descubre las creaciones especiales de nuestro chef</p>
      </div>

      <div className="category-filters">
        {CATEGORIES.map(category => (
          <button 
            key={category.id} 
            className={`category-filter ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {visibleItems.map(item => (
          <div className="menu-item" key={item.id}>
            <div className="menu-item-image-container">
              <img src={item.image} alt={item.name} className="menu-item-image" />
            </div>
            <div className="menu-item-info">
              <div className="menu-item-header">
                <h3 className="menu-item-name">{item.name}</h3>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p className="menu-item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
