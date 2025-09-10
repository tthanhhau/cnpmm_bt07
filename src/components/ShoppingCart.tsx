import React, { useState, useMemo } from 'react';
import { useCart } from '../hooks';
import { Card, Button } from './index';
import './ShoppingCart.css';

interface ShoppingCartProps {
  className?: string;
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  className = '',
  showCheckoutButton = true,
  onCheckout
}) => {
  const { items, totalItems, removeItem, updateQuantity, clearCart } = useCart();
  const [showConfirmClear, setShowConfirmClear] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity >= 0) {
      updateQuantity(productId, quantity);
    }
  };

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [items]);

  const shipping = useMemo(() => {
    return subtotal > 50000000 ? 0 : 30000;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + shipping;
  }, [subtotal, shipping]);

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
    setIsCheckoutModalOpen(true);
  };

  if (items.length === 0) {
    return (
      <Card className={`cart-shopping-cart cart-shopping-cart--empty ${className}`}>
        <div className="cart-empty-state">
          <div className="cart-empty-icon">🛒</div>
          <h3 className="cart-empty-title">Giỏ hàng trống</h3>
          <p className="cart-empty-description">
            Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className={`cart-shopping-container ${className}`}>
      <div className="cart-shopping-header">
        <h2>Giỏ hàng</h2>
        <span className="cart-item-count">({totalItems} sản phẩm)</span>
      </div>

      <div className="cart-shopping-content">
        <div className="cart-shopping-items">
          {items.map((item) => (
            <div key={item.product.id} className="cart-shopping-item">
              <div className="cart-item-image">
                <img 
                  src={item.product.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='} 
                  alt={item.product.name} 
                />
              </div>
              
              <div className="cart-item-details">
                <div className="cart-item-info">
                  <h3>{item.product.name}</h3>
                  <p className="cart-item-price">{formatPrice(item.product.price)}</p>
                </div>
                
                <div className="cart-item-actions">
                  <div className="cart-item-quantity">
                    <button 
                      className="cart-quantity-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      onChange={(e) => handleQuantityChange(item.product.id, e.target.value)}
                      min="1"
                    />
                    <button 
                      className="cart-quantity-btn"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="cart-item-total">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                  
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-shopping-summary">
          <div className="cart-summary-row">
            <span>Tạm tính:</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-summary-row">
            <span>Phí vận chuyển:</span>
            <span>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</span>
          </div>
          <div className="cart-summary-total">
            <span>Tổng cộng:</span>
            <span>{formatPrice(total)}</span>
          </div>

          {showCheckoutButton && (
            <button 
              className="cart-checkout-button"
              onClick={handleCheckout}
            >
              Thanh toán
            </button>
          )}
        </div>
      </div>

      {showConfirmClear && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <h3>Xác nhận xóa giỏ hàng</h3>
            <p>Bạn có chắc chắn muốn xóa tất cả sản phẩm?</p>
            <div className="cart-modal-actions">
              <button 
                className="cart-modal-cancel"
                onClick={() => setShowConfirmClear(false)}
              >
                Hủy
              </button>
              <button 
                className="cart-modal-confirm"
                onClick={() => {
                  clearCart();
                  setShowConfirmClear(false);
                }}
              >
                Xóa tất cả
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};