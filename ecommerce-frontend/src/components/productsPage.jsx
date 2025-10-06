import React, { useEffect, useState } from 'react';
import './productsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products?page=1&per_page=10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="plp-loading">Loading products...</div>;
  if (error) return <div className="plp-error">Error: {error}</div>;

  return (
    <div className="plp-main">
      <header className="plp-header">
        <h1>E commerce</h1>
        <input className="plp-search" type="text" placeholder="Search for products, brands and more" />
      </header>
      <div className="plp-grid">
        {products.map((product) => (
          <div className="plp-card" key={product.id}>
            <img src={product.image} alt={product.name} className="plp-image" />
            <div className="plp-info">
              <h3 className="plp-name">{product.name}</h3>
              <p className="plp-price">₹{product.price}</p>
              <button className="plp-buy-btn">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;