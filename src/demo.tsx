import React from 'react';
import { CartProvider, ShoppingCart, ProductCard } from './index';

// Sample products data
const sampleProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 29990000,
    description: 'Điện thoại thông minh cao cấp với camera xuất sắc',
    category: 'Điện thoại',
    image: 'https://cdn.tgdd.vn/Products/Images/42/299033/iphone-15-pro-blue-titanium-1.jpg'
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    price: 45990000,
    description: 'Laptop chuyên nghiệp cho developer và designer',
    category: 'Laptop',
    image: 'https://cdn.tgdd.vn/Products/Images/44/305400/macbook-pro-14-inch-2023-m3-pro-silver-1.jpg'
  },
  {
    id: '3',
    name: 'AirPods Pro',
    price: 5990000,
    description: 'Tai nghe không dây với tính năng chống ồn',
    category: 'Phụ kiện',
    image: 'https://cdn.tgdd.vn/Products/Images/54/312827/airpods-pro-2022-thumb-1.jpg'
  }
];

const Demo: React.FC = () => {
  return (
    <CartProvider>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>
          Shopping Cart Library Demo
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {sampleProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>

        <ShoppingCart
          onCheckout={() => alert('Thanh toán thành công!')}
        />
      </div>
    </CartProvider>
  );
};

export default Demo;