import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReglageListComponent } from './reglage-list/reglage-list.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'list'},
  {path:'list',component:ReglageListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReglageRoutingModule { }
