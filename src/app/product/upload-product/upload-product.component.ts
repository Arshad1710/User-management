import { Component, OnInit } from '@angular/core';
import * as Papa from 'papaparse'; 
import { Product } from '../product.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductDataService } from '../product-data.service';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    NavbarComponent
  ],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.scss'
})
export class UploadProductComponent implements OnInit{

  ngOnInit(): void {
    const storedData = localStorage.getItem('productData');
    if (storedData) {
      this.products = JSON.parse(storedData);
    }
  }
  products: Product[] = [];
  csvContent: string | ArrayBuffer | null = '';
  currentIndex: number | null = null;
  constructor(private productDataService: ProductDataService) {}

  onFileSelected(event: any): void{
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.csvContent = reader.result;
      };
      reader.readAsText(file);
    }
  }
  processCSV(): void {
    if (this.csvContent) {
      Papa.parse(this.csvContent as string, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          this.products = result.data.map((item: any) => ({
            brand: item['brand'],
            shortDescription: item['shortDescription'],
            price: item['price'],
            actualPrice: item['actualPrice'],
            imageUrl: item['imageUrl']
          }));
          localStorage.setItem('productData', JSON.stringify(this.products));
          this.productDataService.setProducts(this.products);
        }
      });
    }
  }
  editProduct(index: number): void {
    this.currentIndex = index;
    const product = this.products[index];
    // Prompt user for new values (this is a simple example, you can use a modal or form for a better UI)
    const newBrand = prompt('Enter new brand:', product.brand);
    const newDescription = prompt('Enter new description:', product.shortDescription);
    const newPrice = prompt('Enter new price:', product.price.toString());
    const newActualPrice = prompt('Enter new actual price:', product.actualPrice.toString());
    const newImageUrl = prompt('Enter new image URL:', product.imageUrl);

    if (newBrand && newDescription && newPrice && newActualPrice && newImageUrl) {
      const price = parseFloat(newPrice);
      const actualPrice = parseFloat(newActualPrice);
  
      // Ensure price is a valid number
      if (!isNaN(price) && !isNaN(actualPrice)) {
        this.products[index] = {
          brand: newBrand,
          shortDescription: newDescription,
          price: price,
          actualPrice: actualPrice,
          imageUrl: newImageUrl
        };
  
        // Update localStorage
        localStorage.setItem('productData', JSON.stringify(this.products));
      } else {
        alert('Invalid price format.');
      }
    }
  }

  deleteProduct(index: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.products.splice(index, 1);

      // Update localStorage
      localStorage.setItem('productData', JSON.stringify(this.products));
    }
  }
}
