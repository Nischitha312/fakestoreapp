import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__logo-mark">FS</span>
          <div>
            <p className="footer__brand-name">FakeStore </p>
            <p className="footer__brand-sub">Powered by  API</p>
          </div>
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} FakeStore ·{' '}
          <a href="https://fakestoreapi.com" target="_blank" rel="noopener noreferrer">
            FakeStore API
          </a>
        </p>
      </div>
    </footer>
  );
}