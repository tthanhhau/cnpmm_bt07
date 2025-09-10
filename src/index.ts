// Components
export {
  Button,
  Input,
  Modal,
  Card,
  ShoppingCart,
  ProductCard
} from './components';

// Context and Hooks
export {
  CartProvider,
  useCart
} from './contexts';

// Types
export type {
  Product,
  CartItem,
  CartContextType,
  ButtonProps,
  InputProps,
  ModalProps,
  CardProps
} from './types';

// Import styles
import './styles.css';

// Re-export React for convenience
export { default as React } from 'react';