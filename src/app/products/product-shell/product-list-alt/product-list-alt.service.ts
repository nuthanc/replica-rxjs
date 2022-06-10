import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  map,
  combineLatest,
  shareReplay,
} from 'rxjs';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { Product } from '../../product';

@Injectable({
  providedIn: 'root',
})
export class ProductListAltService {

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService
  ) {}

  fetchProducts$ = this.http
    .get<Product[]>('api/products')
    .pipe(shareReplay(1));

  productsWithCategories$ = combineLatest([
    this.fetchProducts$,
    this.productCategoryService.productCategories$.pipe(shareReplay(1)),
  ]).pipe(
    map(([products, categories]) => {
      return products.map((product) => {
        const category = categories.find(
          (category) => category.id === product.categoryId
        );
        return {
          ...product,
          category: category?.name,
        } as Product;
      });
    })
  );
}
