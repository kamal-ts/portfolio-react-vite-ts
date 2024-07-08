// src/components/ProductList.js

import  { useEffect, useState } from 'react';

const products = [
  { id: 1, name: 'Product 1', description: 'Description for product 1' },
  { id: 2, name: 'Product 2', description: 'Description for product 2' },
  { id: 3, name: 'Product 3', description: 'Description for product 3' },
  { id: 4, name: 'Product 4', description: 'Description for product 4' },
];

const ProductList = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Product List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`bg-white p-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-48 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
