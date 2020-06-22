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

  addToCart(product) {
    this.cartService.addToCart(product);
  }

  update(clicked: true) {
    this.onButtonClick.emit(clicked);
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
