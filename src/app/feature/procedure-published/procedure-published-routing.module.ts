import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedurePublishedComponent } from './procedure-published.component'; 
import { ListProcedurePublishedComponent } from './list-procedure-published/list-procedure-published.component';

const routes: Routes = [
  { path: '', component: ProcedurePublishedComponent ,children:
    [
      {path:'',pathMatch:'full',redirectTo:'list'},
      {path:'list',component:ListProcedurePublishedComponent},
     
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedurePublishedRoutingModule { }
