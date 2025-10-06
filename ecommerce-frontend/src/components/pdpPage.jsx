import React, { useEffect, useState } from 'react';
import './productsPage.css';

const PDPPage = () => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch('http://localhost:5000/product/1')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				setProduct(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <div className="plp-loading">Loading product...</div>;
	if (error) return <div className="plp-error">Error: {error}</div>;
	if (!product) return null;

	return (
		<div className="pdp-main">
			<div className="pdp-card">
				<img src={product.image} alt={product.title} className="pdp-image" />
				<div className="pdp-info">
					<h1 className="pdp-title">{product.title}</h1>
					<p className="pdp-price">₹{product.price}</p>
					<p className="pdp-description">{product.description}</p>
					<button className="plp-buy-btn">Buy Now</button>
				</div>
			</div>
		</div>
	);
};

export default PDPPage;
