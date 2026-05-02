import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { FormsModule, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../Models/Interfaces/iproduct';

@Component({
  selector: 'app-products-form',
  imports: [FormsModule],
  templateUrl: './products-form.html',
  styleUrl: './products-form.css',
})
export class ProductsForm implements OnInit {
  formModel = {
    title: '',
    category: '',
    price: null as number | null,
    stock: null as number | null,
    sku: '',
    brand: '',
    images: '',
    description: '',
  };
  isEditMode = false;
  private productId?: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const rawId = this.route.snapshot.paramMap.get('id');
    const productId = Number(rawId);
    if (!Number.isNaN(productId)) {
      const product = this.productService.getProductById(productId);
      if (product) {
        this.isEditMode = true;
        this.productId = productId;
        this.formModel = {
          title: product.title ?? '',
          category: product.category ?? '',
          price: product.price ?? null,
          stock: product.stock ?? null,
          sku: product.sku ?? '',
          brand: product.brand ?? '',
          images: product.images?.[0] ?? '',
          description: product.description ?? '',
        };
      }
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      form.form.markAllAsTouched();
      return;
    }

    const payload = { ...form.value };
    const images = payload.images ? [payload.images] : [];
    const baseProduct = {
      title: payload.title?.trim() || 'Untitled product',
      description: payload.description?.trim() || 'No description provided.',
      category: payload.category,
      price: Number(payload.price) || 0,
      stock: Number(payload.stock) || 0,
      images,
      brand: payload.brand?.trim() || undefined,
      sku: payload.sku?.trim() || `SKU-${Date.now()}`,
      thumbnail: images[0] || '',
    };

    if (this.isEditMode && this.productId) {
      this.productService.updateProductById(this.productId, baseProduct);
      this.router.navigate(['/product', this.productId]);
      return;
    }

    const now = new Date().toISOString();
    const newProduct: Omit<IProduct, 'id'> = {
      ...baseProduct,
      discountPercentage: 0,
      rating: 0,
      tags: [],
      weight: 0,
      dimensions: {
        width: 0,
        height: 0,
        depth: 0,
      },
      warrantyInformation: 'No warranty',
      shippingInformation: 'Shipping info pending',
      availabilityStatus: baseProduct.stock > 0 ? 'In Stock' : 'Out of Stock',
      reviews: [],
      returnPolicy: 'No return policy',
      minimumOrderQuantity: 1,
      meta: {
        createdAt: now,
        updatedAt: now,
        barcode: '',
        qrCode: '',
      },
    };

    this.productService.AddProduct(newProduct);
    form.resetForm();
    this.formModel = {
      title: '',
      category: '',
      price: null,
      stock: null,
      sku: '',
      brand: '',
      images: '',
      description: '',
    };
    this.router.navigate(['/']);
  }

}
