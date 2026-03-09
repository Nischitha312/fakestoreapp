import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/Skeleton';
import { useProducts } from '../hooks/useProducts';
import './ProductsPage.css';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat   = category === 'all' || p.category === category;
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, search, category]);

  return (
    <main className="products-page">

      {/* Header */}
      <div className="products-page__header">
        <h1 className="products-page__title">Our Products</h1>
        <p className="products-page__sub">
          {products.length} items · Free shipping over $50
        </p>
      </div>

      {/* Controls */}
      <div className="products-page__controls">
        {/* Search */}
        <input
          type="text"
          className="products-page__search"
          placeholder="🔍  Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Category filter */}
        <div className="products-page__categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`products-page__cat-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="products-page__error">
          Failed to load products. Please try again.
        </div>
      )}

      {/* Grid */}
      <div className="products-page__grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
          : filtered.length === 0
          ? (
            <div className="products-page__empty">
              No products found for "<strong>{search}</strong>"
            </div>
          )
          : filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>

    </main>
  );
}