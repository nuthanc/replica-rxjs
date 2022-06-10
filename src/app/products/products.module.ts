import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { ProductListAltComponent } from './product-shell/product-list-alt/product-list-alt.component';
import { ProductShellComponent } from './product-shell/product-shell.component';
import { ProductDetailComponent } from './product-shell/product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductListAltComponent,
    ProductShellComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ProductsRoutingModule
  ],
})
export class ProductsModule {}
