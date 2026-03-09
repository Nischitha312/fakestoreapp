import React from 'react';
import './Skeleton.css';

export function SkeletonBox({ width, height, radius, className = '' }) {
  return (
    <div className={`skeleton ${className}`}
      style={{ width: width || '100%', height: height || '1rem', borderRadius: radius || 'var(--r-sm)' }}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <SkeletonBox height="240px" radius="0" />
      <div className="product-card-skeleton__body">
        <SkeletonBox width="60%"  height="12px" />
        <SkeletonBox width="90%"  height="18px" />
        <SkeletonBox width="40%"  height="18px" />
        <SkeletonBox width="50%"  height="14px" />
        <SkeletonBox height="42px" radius="var(--r-md)" />
      </div>
    </div>
  );
}