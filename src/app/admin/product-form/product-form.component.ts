import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  newProductForm: FormGroup;

  constructor(fb: FormBuilder, private productService: ProductService) {
    this.newProductForm = fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      imageURL: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addProduct(form) {
    const control = form.controls;

    const product = {
      title: control.title.value,
      price: control.price.value,
      category: control.category.value,
      imageURL: control.imageURL.value,
    };

    this.productService.createProduct(product).subscribe((response) => {
      console.log(response);
      this.newProductForm.reset();
    });
  }
}
