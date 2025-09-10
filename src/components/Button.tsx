import React from 'react';
import { ButtonProps } from '../types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const buttonClasses = [
    'cart-button',
    `cart-button--${variant}`,
    `cart-button--${size}`,
    disabled ? 'cart-button--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};