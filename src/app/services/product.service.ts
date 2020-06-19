import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(product) {
    return this.http.post('/api/new-product', product);
  }

  updateProduct(id, product) {
    return this.http.put(`/api/product/update/${id}`, product);
  }

  findOneProduct(id) {
    return this.http.get(`/api/products/${id}`);
  }

  getAll() {
    return this.http.get('/api/products');
  }

  deleteProduct(id) {
    return this.http.delete(`/api/product/delete/${id}`);
  }
}
