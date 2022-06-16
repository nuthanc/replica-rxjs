import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, combineLatest, map, shareReplay, tap, BehaviorSubject } from 'rxjs';
import { Supplier } from 'src/app/suppliers/supplier';
import { ProductListAltService } from '../product-list-alt/product-list-alt.service';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailService {
  constructor(
    private http: HttpClient,
    private productListAltService: ProductListAltService
  ) {}

  private selectedProductId$ = new BehaviorSubject<number>(0);
  // selectedProductId$ = new Subject<number>();

  fetchSuppliers$ = this.http
    .get<Supplier[]>('api/suppliers')
    .pipe(shareReplay(1));

  selectedProduct$ = combineLatest([
    this.productListAltService.productsWithCategories$,
    this.selectedProductId$,
  ]).pipe(
    map(([products, id]) => products.find((product) => product.id === id))
  );

  selectedProductSuppliers$ = combineLatest([
    this.selectedProduct$.pipe(tap((val) => console.log(val))),
    this.fetchSuppliers$.pipe(tap((val) => console.log(val))),
  ]).pipe(
    map(([product, suppliers]) => {
      console.log('In combineLatest');
      return product?.supplierIds?.map(
        (id) => suppliers.find((supplier) => supplier.id === id) as Supplier
      );
    })
  );

  selectProduct(productId: number) {
    this.selectedProductId$.next(productId);
  }
}
