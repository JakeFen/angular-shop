import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  constructor(private http: HttpClient) {}

  private create() {
    let product: {};
    return this.http.post('/api/new/shopping-cart', product).toPromise();
  }

  private createProductId(cartId, product) {
    console.log('Create Product Success');
    return this.http.post(`/api/new/cart-product/${cartId}`, product);
  }

  private updateCartProduct(cartId, quantity: Object, productId) {
    console.log('Update Cart');
    console.log(cartId + ' ' + productId + ' ' + quantity);
    return this.http.put(
      `/api/shopping-cart/item/update/${cartId}/${productId}`,
      quantity
    );
  }

  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.http.get(`api/shopping-carts/${cartId}`);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;
    else {
      return this.create().then((response) => {
        localStorage.setItem('cartId', response['id']);
        return response['id'];
      });
    }
  }

  async addToCart(product) {
    let cartId = await this.getOrCreateCartId();
    let item = this.http.get(
      `/api/shopping-cart/${cartId}/items/${product.id}`
    );
    item.subscribe((response) => {
      if (!response)
        this.createProductId(cartId, product).subscribe((response) => {});
      else {
        let body = {
          quantity: response['quantity'] + 1,
        };
        let productId = product['id'];
        this.updateCartProduct(cartId, body, productId).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    });
  }
}
