import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Products } from "../Components/products/products";
import { MasterProduct } from '../Components/master-product/master-product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Ecommerce');
}
