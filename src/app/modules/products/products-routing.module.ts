import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';

const routes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, MaterialModule]
})
export class ProductsRoutingModule { }
