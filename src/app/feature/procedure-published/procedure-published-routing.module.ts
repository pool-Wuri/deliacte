import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedurePublishedComponent } from './procedure-published.component'; 
import { ListProcedurePublishedComponent } from './list-procedure-published/list-procedure-published.component';
import { DemandePageComponent } from './demande-page/demande-page.component';

const routes: Routes = [
  { path: '', component: ProcedurePublishedComponent ,children:
    [
      {path:'',pathMatch:'full',redirectTo:'list'},
      {path:'list',component:ListProcedurePublishedComponent},
      {path:'demandePage/:id',component:DemandePageComponent}
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedurePublishedRoutingModule { }
