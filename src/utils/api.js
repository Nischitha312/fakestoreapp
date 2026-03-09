const BASE = 'https://fakestoreapi.com';

export const api = {
  getProducts:    ()    => fetch(`${BASE}/products`).then(r => r.json()),
  getProduct:     (id)  => fetch(`${BASE}/products/${id}`).then(r => r.json()),
  getCategories:  ()    => fetch(`${BASE}/products/categories`).then(r => r.json()),
  getByCategory:  (cat) => fetch(`${BASE}/products/category/${encodeURIComponent(cat)}`).then(r => r.json()),
};