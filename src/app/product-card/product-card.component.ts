import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input('product') product;

  constructor(private cartService: ShoppingCartService) {}

  addToCart(product) {
    this.cartService.addToCart(product);
    // let cartId = localStorage.getItem('cartId');
    // if (!cartId) {
    //   this.cartService.create(product).subscribe((response) => {
    //     localStorage.setItem('cartId', response['id']);
    //     console.log(response);
    //   });
    // }
  }
}
