import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ManageProductComponent } from './components/manage-product/manage-product.component';

const routes: Routes = [
  {
    path: '',
    component: ManageProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MaterialModule]
})
export class ProductsRoutingModule { }
