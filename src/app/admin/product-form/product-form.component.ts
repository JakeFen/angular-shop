import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  newProductForm: FormGroup;
  id;

  constructor(
    fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id)
      this.productService
        .findOneProduct(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.newProductForm.setValue({
            title: p['title'],
            price: p['price'],
            category: p['category'],
            imageURL: p['imageURL'],
          });
        });

    this.newProductForm = fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageURL: ['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  ngOnInit(): void {}

  get title() {
    return this.newProductForm.get('title');
  }

  get price() {
    return this.newProductForm.get('price');
  }

  get category() {
    return this.newProductForm.get('category');
  }

  get imageURL() {
    return this.newProductForm.get('imageURL');
  }

  addProduct(form) {
    const control = form.controls;

    const product = {
      title: control.title.value,
      price: control.price.value,
      category: control.category.value,
      imageURL: control.imageURL.value,
    };

    if (this.id) {
      this.productService
        .updateProduct(this.id, product)
        .subscribe((response) => {
          this.router.navigate(['/admin/products']);
        });
    } else {
      this.productService.createProduct(product).subscribe((response) => {
        this.newProductForm.reset();
        this.router.navigate(['/admin/products']);
      });
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(this.id).subscribe((response) => {
      this.router.navigate(['/admin/products']);
    });
  }
}
