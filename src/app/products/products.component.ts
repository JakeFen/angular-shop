import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any = [];
  filteredProducts: any = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async getCart(clicked: boolean) {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => {
        console.log(cart);
        this.cart = cart;
      }
    );
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => {
        this.cart = cart;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
