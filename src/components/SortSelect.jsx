import React from 'react';
import './SortSelect.css';

export const SORT_OPTIONS = [
  { value: 'default',     label: 'Featured'          },
  { value: 'price-asc',   label: 'Price: Low → High'  },
  { value: 'price-desc',  label: 'Price: High → Low'  },
  { value: 'rating-desc', label: 'Top Rated'           },
  { value: 'name-asc',    label: 'Name A → Z'          },
];

export default function SortSelect({ value, onChange }) {
  return (
    <div className="sort-select">
      <svg className="sort-select__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="4" y1="6"  x2="11" y2="6"/>
        <line x1="4" y1="12" x2="11" y2="12"/>
        <line x1="4" y1="18" x2="13" y2="18"/>
        <polyline points="15 15 18 18 21 15"/>
        <line x1="18" y1="6" x2="18" y2="18"/>
      </svg>
      <select className="sort-select__select" value={value} onChange={e => onChange(e.target.value)}>
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}