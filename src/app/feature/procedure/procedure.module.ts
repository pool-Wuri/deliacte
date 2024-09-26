import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureRoutingModule } from './procedure-routing.module';
import { ProcedureComponent } from './procedure.component';
import { ListProcedureComponent } from './list-procedure/list-procedure.component';


@NgModule({
  declarations: [
    ProcedureComponent,
    ListProcedureComponent
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule
  ]
})
export class ProcedureModule { }
