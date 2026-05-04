import { Routes } from '@angular/router';
import { MainLayout } from '../Components/main-layout/main-layout';
import { MasterProduct } from '../Components/master-product/master-product';
import { ProductDetails } from '../Components/product-details/product-details';
import { ProductsForm } from '../Components/products-form/products-form';
import { Register } from '../Components/register/register';
import { Login } from '../Components/login/login';
import { Dashboard } from '../Components/dashboard/dashboard';
import { authGuardGuard } from '../guards/auth-guard-guard';
import { childGuardGuard } from '../guards/child-guard-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivateChild: [childGuardGuard],
    children: [
      {
        path: 'products', component: MasterProduct
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
        path: 'dashboard', component: Dashboard, canActivate: [authGuardGuard]
      }
    ]
  }, {
    path: 'register', component: Register
  }, {
    path: 'login', component: Login
  }
];
