import React from 'react';
import styles from './BianCard.module.css';
import { FaShoppingCart } from 'react-icons/fa';

const BianCard = ({
  image,
  title,
  description,
  price,
  onAddToCart,
  className = '',
}) => {
  return (
    <div className={`${styles.cardContainer} ${className}`}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.productImage} />
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.priceSection}>
          <span className={styles.price}>{price}</span>
        </div>
        <button className={styles.addToCartButton} onClick={onAddToCart}>
          <FaShoppingCart className={styles.cartIcon} />
          <span>Agregar a tu pedido</span>
        </button>
      </div>
    </div>
  );
};

export default BianCard;
