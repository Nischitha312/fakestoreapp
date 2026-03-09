import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct, useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import Badge from '../components/Badge';
import ProductCard from '../components/ProductCard';
import { SkeletonBox } from '../components/Skeleton';
import './ProductDetailPage.css';

function DetailSkeleton() {
  return (
    <div className="product-detail__skeleton">
      <SkeletonBox height="500px" radius="var(--r-lg)" />
      <div className="product-detail__skeleton-body">
        <SkeletonBox width="40%"  height="14px" />
        <SkeletonBox width="90%"  height="36px" />
        <SkeletonBox width="30%"  height="36px" />
        <SkeletonBox width="60%"  height="14px" />
        <SkeletonBox height="120px" />
        <SkeletonBox height="52px" radius="var(--r-md)" />
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { products } = useProducts();
  const { addItem, items } = useCart();
  const [qty, setQty]         = useState(1);
  const [added, setAdded]     = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const inCart = items.some(i => i.id === Number(id));

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Related: same category, exclude current
  const related = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (error) {
    return (
      <main className="product-detail-page">
        <div className="container product-detail-error">
          <p>Product not found.</p>
          <Link to="/" className="product-detail-back-btn">← Back to Shop</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="product-detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="product-detail__breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Shop</Link>
          <span aria-hidden="true">›</span>
          {loading ? (
            <SkeletonBox width="120px" height="14px" />
          ) : (
            <>
              <span>{product?.category}</span>
              <span aria-hidden="true">›</span>
              <span className="product-detail__breadcrumb-current">{product?.title?.slice(0, 30)}…</span>
            </>
          )}
        </nav>

        {loading ? (
          <DetailSkeleton />
        ) : (
          <div className="product-detail">
            {/* Image */}
            <div className="product-detail__image-wrap">
              <div className={`product-detail__image-bg ${imgLoaded ? 'product-detail__image-bg--loaded' : ''}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-detail__image"
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
              <div className="product-detail__image-badge">
                <StarRating rating={product.rating?.rate} size="sm" />
              </div>
            </div>

            {/* Info */}
            <div className="product-detail__info">
              <div className="product-detail__top">
                <Badge variant="accent">{product.category}</Badge>
                <span className="product-detail__id">SKU #{String(product.id).padStart(4, '0')}</span>
              </div>

              <h1 className="product-detail__title">{product.title}</h1>

              <div className="product-detail__rating-row">
                <StarRating rating={product.rating?.rate} count={product.rating?.count} size="md" />
                <span className="product-detail__rating-label">
                  {product.rating?.rate?.toFixed(1)} / 5
                </span>
              </div>

              <div className="product-detail__price-row">
                <span className="product-detail__price">${product.price?.toFixed(2)}</span>
                <span className="product-detail__price-note">Free shipping · In stock</span>
              </div>

              <p className="product-detail__description">{product.description}</p>

              <div className="product-detail__qty-row">
                <label className="product-detail__qty-label">Quantity</label>
                <div className="product-detail__qty-ctrl">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    disabled={qty <= 1}
                  >−</button>
                  <span>{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              <div className="product-detail__actions">
                <button
                  className={`product-detail__add-btn ${added ? 'product-detail__add-btn--added' : ''}`}
                  onClick={handleAdd}
                >
                  {added ? '✓ Added to Cart' : inCart ? 'Add More' : 'Add to Cart'}
                </button>
                <button className="product-detail__wish-btn" aria-label="Add to wishlist">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="product-detail__features">
                {[
                  { icon: '🔄', text: '30-day returns' },
                  { icon: '🔒', text: 'Secure checkout' },
                  { icon: '📦', text: 'Fast delivery' },
                ].map(f => (
                  <div key={f.text} className="product-detail__feature">
                    <span>{f.icon}</span>
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="product-related">
            <h2 className="product-related__title">You May Also Like</h2>
            <div className="product-related__grid">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
