import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListeDashboardComponent } from './liste-dashboard/liste-dashboard.component';
import { ChartModule } from 'primeng/chart';
import {PanelModule} from 'primeng/panel';
import {CalendarModule} from 'primeng/calendar';

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
    CalendarModule
  ]
})
export class DashboardModule { }
