import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListeDashboardComponent } from './liste-dashboard/liste-dashboard.component';
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {CalendarModule} from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms'; // Pour ngModel


@NgModule({
  declarations: [
    DashboardComponent,
    ListeDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartModule,
    PanelModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
   
  ]
})
export class DashboardModule { }
