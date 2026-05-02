import { Component, ViewChild } from '@angular/core';
import { Products } from '../products/products';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-master-product',
  imports: [Products, FormsModule, RouterLink],
  templateUrl: './master-product.html',
  styleUrl: './master-product.css',
})
export class MasterProduct {
  @ViewChild(Products) productsComponent!: Products;
  totalPrice: number = 0;
  selectedCategory: string = 'all';
  constructor() {

  }
  onTotalPriceChange(data: any) {
    this.totalPrice = data;
  }

}
