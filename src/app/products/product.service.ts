import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';
import {
  merge,
  scan,
  BehaviorSubject,
  Subject,
  map,
  combineLatest,
  shareReplay,
} from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  newlyAddedProduct$ = new BehaviorSubject<Product[]>([]);
  selectedCategoryId$ = new BehaviorSubject<number>(0);
  // newlyAddedProduct$ = new Subject<Product>(); Author used Subject and asObservable
  productId = 15;
  

  constructor(
    private http: HttpClient,
    private productCategoryService: ProductCategoryService
  ) {}

  fetchProducts$ = this.http
    .get<Product[]>('api/products')
    .pipe(shareReplay(1));

  products$ = merge(this.fetchProducts$, this.newlyAddedProduct$).pipe(
    scan((acc: Product[], products) => [...acc, ...products], []) // Use of instanceof Array and for accumulator to get proper type,  use [] as Product[] as seed
  );

  // products$ = merge(
  //   this.http.get<Product[]>('api/products'),
  //   this.newlyAddedProduct$
  // ).pipe(
  //   scan((acc: Product[], products) => {
  //     return products.constructor === Array
  //       ? [...acc, ...products]
  //       : [...acc, products];
  //   }, [])
  // );
  productsWithCategories$ = combineLatest([
    this.products$,
    this.productCategoryService.productCategories$.pipe(shareReplay(1)),
    this.selectedCategoryId$,
  ]).pipe(
    map(([products, categories, id]) => {
      // return products.map((product) => {
      //   const category = categories.find(
      //     (category) => category.id === product.categoryId
      //   );
      //   return {
      //     ...product,
      //     category: category?.name,
      //   } as Product;
      // });
      return products
        .filter((product) => product.categoryId === id || id === 0)
        .map((product) => {
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

  // productCategoriesSelected$ = combineLatest([
  //   this.productsWithCategories$,
  //   this.selectedCategoryId$,
  // ]).pipe(
  //   map(([products, id]) => {
  //     if (id === 0) return products;
  //     const selectedProducts = products.filter(
  //       (product) => product.categoryId === id
  //     );
  //     return selectedProducts;
  //   })
  // );

  addProduct() {
    const product = {
      id: this.productId,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Another useless product',
      price: 8.9,
      categoryId: 3,
      quantityInStock: 5,
    } as Product;
    this.newlyAddedProduct$.next([product]);
    // this.newlyAddedProduct$.next(product);
    this.productId++;
  }

  filterByCategory(id: number) {
    this.selectedCategoryId$.next(id);
  }
}
