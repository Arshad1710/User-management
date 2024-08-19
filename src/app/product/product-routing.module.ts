import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UploadProductComponent } from './upload-product/upload-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductPageComponent
  },
  { 
    path: ':name', 
    component: ProductDetailComponent 
  },
  { 
    path: 'cart', 
    component: CartComponent 
  },
  { 
    path: 'wishlist', 
    component: WishlistComponent 
  },
  {
    path: 'upload-product',
    component: UploadProductComponent,
    canActivate: [authGuard],
    data: { role: 'admin'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
