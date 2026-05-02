import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { IProduct } from '../../Models/Interfaces/iproduct';
import { ProductService } from '../../Services/product-service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  product?: IProduct;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const productId = Number(rawId);
    if (!Number.isNaN(productId)) {
      this.product = this.productService.getProductById(productId);
    }
  }
}
