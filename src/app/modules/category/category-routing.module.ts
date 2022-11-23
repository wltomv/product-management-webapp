import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';

const routes: Routes = [
  {
    path: '',
    component: ManageCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
