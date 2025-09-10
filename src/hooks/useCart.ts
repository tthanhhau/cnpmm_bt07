import { useCart as useCartContext } from '../contexts';

export const useCart = () => {
  return useCartContext();
};