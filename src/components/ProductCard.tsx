import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../hooks';
import { Card, Button } from './index';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  className?: string;
  showAddToCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  showAddToCart = true
}) => {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const fallbackImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

  return (
    <Card className={`cart-product-card ${className}`} hoverable>
      <div className="cart-product-image">
        {product.image && !imageError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            onError={handleImageError}
          />
        ) : (
          <div className="cart-product-placeholder">
            <img 
              src={fallbackImage} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      <div className="cart-product-info">
        <h3 className="cart-product-name">{product.name}</h3>

        {product.category && (
          <span className="cart-product-category">{product.category}</span>
        )}

        {product.description && (
          <p className="cart-product-description">{product.description}</p>
        )}

        <div className="cart-product-footer">
          <span className="cart-product-price">{formatPrice(product.price)}</span>

          {showAddToCart && (
            <Button
              variant="primary"
              size="small"
              onClick={handleAddToCart}
            >
              Thêm vào giỏ
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};