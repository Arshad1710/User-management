import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems: any[] = []; // Replace `any` with your product type

  getWishlistItems() {
    return this.wishlistItems;
  }

  addToWishlist(item: any) {
    this.wishlistItems.push(item);
  }

  removeFromWishlist(item: any) {
    this.wishlistItems = this.wishlistItems.filter(wishlistItem => wishlistItem !== item);
  }
}
