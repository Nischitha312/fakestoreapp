import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </div>

      <div className="product-card__body">
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`} className="product-card__btn">
          View Details
        </Link>
      </div>
    </div>
  );
}