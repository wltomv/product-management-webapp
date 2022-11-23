import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageProductComponent } from './components/manage-product/manage-product.component';


@NgModule({
  declarations: [
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ProductsModule { }
