import React, { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();

  // Trap scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`cart-overlay ${open ? 'cart-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`} aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Cart</h2>
          <span className="cart-drawer__count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <ul className="cart-list">
              {items.map(item => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item__image-wrap">
                    <img src={item.image} alt={item.title} className="cart-item__image" />
                  </div>
                  <div className="cart-item__details">
                    <p className="cart-item__title">{item.title}</p>
                    <p className="cart-item__price">${(item.price * item.qty).toFixed(2)}</p>
                    <div className="cart-item__qty">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease">−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase">+</button>
                    </div>
                  </div>
                  <button className="cart-item__remove" onClick={() => removeItem(item.id)} aria-label="Remove item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
                      <path d="M10 11v6"/><path d="M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-total">
              <span>Total</span>
              <span className="cart-total__amount">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="cart-checkout-btn">Checkout</button>
            <button className="cart-clear-btn" onClick={clearCart}>Clear cart</button>
          </div>
        )}
      </aside>
    </>
  );
}
