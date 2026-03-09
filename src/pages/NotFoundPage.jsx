import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <main className="notfound">
      <div className="notfound__content">
        <span className="notfound__code">404</span>
        <h1 className="notfound__title">Page Not Found</h1>
        <p className="notfound__sub">The page you're looking for doesn't exist.</p>
        <Link to="/" className="notfound__btn">← Back to Shop</Link>
      </div>
    </main>
  );
}
