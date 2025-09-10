import React from 'react';
import { CardProps } from '../types';
import './Card.css';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false
}) => {
  const cardClasses = [
    'cart-card',
    hoverable ? 'cart-card--hoverable' : '',
    onClick ? 'cart-card--clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
    >
      {children}
    </div>
  );
};