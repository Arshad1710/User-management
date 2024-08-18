import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  constructor() { }
  private products: Product[] = JSON.parse(localStorage.getItem('productData') || '[]');
  setProducts(products: Product[]): void {
    this.products = products;
  }
  getProductByName(name: string): Product | undefined {
    return this.products.find(product => product.brand === name);
  }
  getProducts(): Product[] {
    return this.products;
  }
}
