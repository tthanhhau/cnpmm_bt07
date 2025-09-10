import React from 'react';
import { InputProps } from '../types';
import './Input.css';

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
  className = '',
  label,
  error
}) => {
  const inputClasses = [
    'cart-input',
    error ? 'cart-input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="cart-input-wrapper">
      {label && (
        <label className="cart-input-label">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
      />
      {error && (
        <span className="cart-input-error">
          {error}
        </span>
      )}
    </div>
  );
};