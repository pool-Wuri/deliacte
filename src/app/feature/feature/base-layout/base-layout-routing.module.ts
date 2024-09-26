import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout.component';

const routes: Routes = [
  { path: '', component: BaseLayoutComponent} // Par exemple, redirection vers un sous-module
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseLayoutRoutingModule { }
