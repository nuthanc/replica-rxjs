import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../product';
import { ProductDetailService } from '../product-detail/product-detail.service';
import { ProductListAltService } from './product-list-alt.service';

@Component({
  selector: 'app-product-list-alt',
  templateUrl: './product-list-alt.component.html',
  styleUrls: ['./product-list-alt.component.css'],
})
export class ProductListAltComponent implements OnInit {
  products$!: Observable<Product[]>;
  selectedIndex!: number;

  constructor(
    private productListAltService: ProductListAltService,
    private productDetailService: ProductDetailService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productListAltService.productsWithCategories$;
  }

  onSelectProduct(id: number, index: number) {
    this.productDetailService.selectProduct(id);
    this.selectedIndex = index;
  }
}
