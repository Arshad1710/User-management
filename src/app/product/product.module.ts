import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UploadProductComponent } from './upload-product/upload-product.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [
    ProductPageComponent,
    ProductDetailComponent,
    UploadProductComponent,
    WishlistComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
