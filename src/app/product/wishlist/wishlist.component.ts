import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit{
  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService, private cartService: CartService) { }

  ngOnInit(): void {
    this.wishlistItems = this.wishlistService.getWishlistItems();
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
    this.removeFromWishlist(item); // Optionally remove from wishlist
  }

  removeFromWishlist(item: any) {
    this.wishlistService.removeFromWishlist(item);
    this.ngOnInit(); // Refresh the wishlist
  }

}
