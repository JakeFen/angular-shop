import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product;
  @Input('shopping-cart') shoppingCart;
  @Output('onButtonClick') onButtonClick = new EventEmitter<boolean>();

  constructor(private cartService: ShoppingCartService) {}

  async addToCart(product) {
    await this.cartService.addToCart(product);
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    wait(2 * 50).then(() => this.update(true));
  }

  update(clicked: true) {
    console.log('clicked');
    this.onButtonClick.emit(clicked);
    return true;
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;
    else {
      let cartProduct = this.shoppingCart.CartProducts;
      let result = cartProduct.find((item) => {
        return item.productId === this.product.id;
      });
      return result === undefined ? 0 : result.quantity;
    }
  }
}
