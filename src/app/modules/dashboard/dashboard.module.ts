import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { BoardComponent } from './board/board.component';
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [
    BoardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
