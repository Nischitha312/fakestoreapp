import React from 'react';
import './StarRating.css';

export default function StarRating({ rating = 0, count, size = 'md' }) {
  const full  = Math.floor(rating);
  const frac  = rating - full;
  const empty = 5 - Math.ceil(rating);

  return (
    <div className={`star-rating star-rating--${size}`} aria-label={`${rating} out of 5`}>
      <div className="star-rating__stars">
        {Array.from({ length: full }).map((_, i) => (
          <svg key={`f${i}`} className="star star--full" viewBox="0 0 24 24">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        ))}
        {frac > 0 && (
          <svg className="star star--partial" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`grad-${rating}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${frac * 100}%`} stopColor="var(--clr-accent)" />
                <stop offset={`${frac * 100}%`} stopColor="var(--clr-text-faint)" />
              </linearGradient>
            </defs>
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={`url(#grad-${rating})`}
            />
          </svg>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <svg key={`e${i}`} className="star star--empty" viewBox="0 0 24 24">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
          </svg>
        ))}
      </div>
      {count !== undefined && <span className="star-rating__count">({count})</span>}
    </div>
  );
}