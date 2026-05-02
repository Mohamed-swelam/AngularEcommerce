import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../Models/Interfaces/iproduct';
import { LimitPipe } from '../../Pipes/limit-pipe';
import { Zooming } from '../../directives/zooming';
import { FormsModule } from '@angular/forms';
import { Buttons } from '../buttons/buttons';
import { ProductService } from '../../Services/product-service';

@Component({
  selector: 'app-products',
  imports: [LimitPipe, Zooming, FormsModule, Buttons, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnChanges, AfterViewChecked, OnInit {
  ProdList: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  totalPrice: number = 0;
  currentPage: number = 1;
  pageSize: number = 6;
  @Input() selectedCategory: string = 'all';
  @Output() totalPriceChange = new EventEmitter<number>();

  @ViewChild('label') label!: ElementRef;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.ProdList = this.productService.getProducts();
    this.filteredProducts = this.ProdList;
  }

  ngAfterViewChecked(): void {
    if (this.label?.nativeElement) {
      this.label.nativeElement.textContent = "Brand";
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.filterByCategory();
  }

  filterByCategory() {
    this.filteredProducts = this.productService.filterProductsByCategory(this.selectedCategory);

    this.currentPage = 1;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize));
  }

  get pagedProducts(): IProduct[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(startIndex, startIndex + this.pageSize);
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  get pageStart(): number {
    if (!this.filteredProducts.length) {
      return 0;
    }
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get pageEnd(): number {
    return Math.min(this.currentPage * this.pageSize, this.filteredProducts.length);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);

  }

  BuyProduct(product: any, quantity: any) {
    if (quantity > product.stock) {
      alert("Sorry, you can not purchase that item with this quantity");
    } else {
      this.totalPrice += product.price * quantity;
      product.stock -= quantity;
      this.totalPriceChange.emit(this.totalPrice);
    }
  }




}
