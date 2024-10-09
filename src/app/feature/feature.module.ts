import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedurePublishedComponent } from './procedure-published/procedure-published.component';
import { ListProcedurePublishedComponent } from './procedure-published/list-procedure-published/list-procedure-published.component';



@NgModule({
  declarations: [
    ProcedurePublishedComponent,
    ListProcedurePublishedComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FeatureModule { }
