import { Routes } from '@angular/router';
import { MainLayout } from '../Components/main-layout/main-layout';
import { MasterProduct } from '../Components/master-product/master-product';
import { ProductDetails } from '../Components/product-details/product-details';
import { ProductsForm } from '../Components/products-form/products-form';
import { Register } from '../Components/register/register';
import { Login } from '../Components/login/login';
import { Dashboard } from '../Components/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'products', redirectTo: "", pathMatch: "full"
      },
      {
        path: '', component: MasterProduct
      },
      {
        path: 'products/new', component: ProductsForm
      },
      {
        path: 'products/edit/:id', component: ProductsForm
      },
      {
        path: 'product/:id', component: ProductDetails
      },
      {
        path: 'dashboard', component: Dashboard
      }
    ]
  }, {
    path: 'register', component: Register
  }, {
    path: 'login', component: Login
  }
];
