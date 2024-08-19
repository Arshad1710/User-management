import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductDataService } from '../product-data.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productDataService: ProductDataService
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

}
