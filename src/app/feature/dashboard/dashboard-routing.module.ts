import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ListeDashboardComponent } from './liste-dashboard/liste-dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent ,children:
  [
    {path:'',pathMatch:'full',redirectTo:'list'},
    {path:'list',component:ListeDashboardComponent}
  ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
