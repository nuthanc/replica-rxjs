import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';

@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    RouterModule,
    ProductsRoutingModule
  ],
})
export class ProductsModule {}
