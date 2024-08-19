import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Product } from '../product.model';
import { ProductDataService } from '../product-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit{
  products: Product[] = [];
  constructor(
    private productDataService: ProductDataService, 
    private router: Router,
    private wishlistService: WishlistService,
  ) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('productData');
    if (storedData) {
      this.products = JSON.parse(storedData);
    } else {
      this.products = this.productDataService.getProducts();
    }
  }
  viewProductDetail(product: Product): void {
    this.router.navigate(['/product', product.brand]); 
  }
  addToWishlist(){
    this.wishlistService.addToWishlist(this.products);
    this.router.navigate(['/wishlist']);
  }
}
