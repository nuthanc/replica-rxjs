import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from 'src/app/product-categories/product-category';
import { ProductCategoryService } from 'src/app/product-categories/product-category.service';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  productCategories$!: Observable<ProductCategory[]>;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.productsWithCategories$;
    this.productCategories$ = this.productCategoryService.productCategories$;
  }

  onAddProduct() {
    this.productService.addProduct();
  }

  onCategorySelect(event: Event) {
    const categoryId = (event.target as HTMLInputElement).value;
    this.productService.filterByCategory(+categoryId);
  }
}
