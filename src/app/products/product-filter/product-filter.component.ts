import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  catagories = [
    { name: 'Bread', value: 'bread' },
    { name: 'Dairy', value: 'dairy' },
    { name: 'Fruits', value: 'fruits' },
    { name: 'Seasonings and spices', value: 'seasonings' },
    { name: 'Vegetables', value: 'vegetables' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
