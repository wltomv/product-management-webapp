import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { MaterialModule } from '../shared/material.module';
import { BestSellerComponent } from './components/best-seller/best-seller.component';


@NgModule({
  declarations: [
    HomePageComponent,
    BestSellerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ]
})
export class HomeModule { }
