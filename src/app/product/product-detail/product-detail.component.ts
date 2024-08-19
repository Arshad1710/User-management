import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../product.model';
import { ProductDataService } from '../product-data.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CartService } from '../cart.service';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productDataService: ProductDataService,
    private cartService: CartService,
    private router: Router,
    private wishlistService: WishlistService,
  ) {}
  product: Product | undefined;
  ngOnInit(): void {
    const productName = this.route.snapshot.paramMap.get('name');
    if (productName) {
      this.product = this.productDataService.getProductByName(productName); // Fetch product details
    }
  }
  getProductByName(name: string): Product | undefined {

    const products: Product[] = JSON.parse(localStorage.getItem('productData') || '[]');
    return products.find(p => p.brand === name);
  }
  addToCart() {
    const productToAdd = { ...this.product, quantity: 1 };
    this.cartService.addToCart(productToAdd);
    this.router.navigate(['/cart']); // Navigate to the cart page after adding the product
  }
  addToWishlist() {
    this.wishlistService.addToWishlist(this.product);
    this.router.navigate(['/wishlist']); // Navigate to the wishlist page after adding the product
  }
}
