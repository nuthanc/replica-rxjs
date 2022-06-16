import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Supplier } from 'src/app/suppliers/supplier';
import { Product } from '../../product';
import { ProductDetailService } from './product-detail.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  selectedProduct$ = this.productDetailService.selectedProduct$.pipe(
    tap((val) => console.log(val))
  );
  suppliers$ = this.productDetailService.selectedProductSuppliers$.pipe(
    tap((val) => console.log(val))
  );

  constructor(private productDetailService: ProductDetailService) {}
}
