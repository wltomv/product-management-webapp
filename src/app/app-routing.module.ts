import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  {
    path: 'managements',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/managements/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'categories',
        loadChildren: () => import('./modules/category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'products',
        loadChildren: () => import('./modules/products/products.module').then(m => m.ProductsModule),
      },
      {
        path: 'sale',
        loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule),
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
