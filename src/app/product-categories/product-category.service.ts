import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../product-categories/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private http: HttpClient) {}

  // getProductCategories() {
    // return this.http.get<ProductCategory[]>('api/productCategories');
  // }
  productCategories$ = this.http.get<ProductCategory[]>(
    'api/productCategories'
  ); // Pipe and shareReplay here itself
}
