import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  private create(product) {
    return this.http.post('/api/new/shopping-cart', product);
  }

  private getCart(cartId) {
    return this.http.get(`/api/shopping-cart/:${cartId}`);
  }

  private async getOrCreateCartId(product) {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let response = await this.create(product);
    localStorage.setItem('cartId', response['id']);
    console.log(response);
    return response['id'];

    // this.create(product).subscribe((response) => {

    // });
  }

  async addToCart(product) {
    let cart = await this.getOrCreateCartId(product);
  }
}
