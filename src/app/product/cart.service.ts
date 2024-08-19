import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = []; // Replace `any` with your product type

  getCartItems() {
    return this.cartItems;
  }

  addToCart(item: any) {
    this.cartItems.push(item);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
