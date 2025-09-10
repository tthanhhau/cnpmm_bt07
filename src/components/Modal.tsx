import React, { useEffect } from 'react';
import { ModalProps } from '../types';
import './Modal.css';

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  className = ''
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalClasses = [
    'cart-modal-overlay',
    className
  ].filter(Boolean).join(' ');

  const modalContentClasses = [
    'cart-modal-content',
    `cart-modal-content--${size}`
  ].join(' ');

  return (
    <div className={modalClasses} onClick={onClose}>
      <div
        className={modalContentClasses}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || typeof onClose === 'function') && (
          <div className="cart-modal-header">
            {title && <h2 className="cart-modal-title">{title}</h2>}
            <button
              className="cart-modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        )}
        <div className="cart-modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};