import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    setLoading(true);
    api.getProducts()
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, []);

  return { products, loading, error };
}

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getProduct(id)
      .then(data => { setProduct(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [id]);

  return { product, loading, error };
}

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading,    setLoading]    = useState(true);

  useEffect(() => {
    api.getCategories()
      .then(data => { setCategories(['all', ...data]); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return { categories, loading };
}

export function useProductsByCategory(category) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    setLoading(true);
    const promise = category === 'all' ? api.getProducts() : api.getByCategory(category);
    promise
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [category]);

  return { products, loading, error };
}