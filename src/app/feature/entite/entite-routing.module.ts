import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntiteListComponent } from './entite-list/entite-list.component';

const routes: Routes = [
      {path:'',pathMatch:'full',redirectTo:'list'},
      {path:'list',component:EntiteListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntiteRoutingModule { }
