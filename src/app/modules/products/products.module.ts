import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ProductComponent } from './components/product/product.component';


@NgModule({
  declarations: [
    ManageProductComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ProductsModule { }
