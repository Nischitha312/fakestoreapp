import React from 'react';
import './CategoryFilter.css';

export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map(cat => (
        <button
          key={cat}
          className={`category-filter__btn ${active === cat ? 'category-filter__btn--active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}