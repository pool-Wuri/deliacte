import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedureComponent } from './procedure.component';
import { ListProcedureComponent } from './list-procedure/list-procedure.component';
import { DetailsProcedureComponent } from './details-procedure/details-procedure.component';

const routes: Routes = [{ path: '', component: ProcedureComponent,children:
  [
    {path:'',pathMatch:'full',redirectTo:'list'},
    {path:'list',component:ListProcedureComponent},
    {path:'details/:id',component:DetailsProcedureComponent}

  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
