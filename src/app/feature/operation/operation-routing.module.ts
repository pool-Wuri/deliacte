import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationComponent } from './operation.component';
import { ListOperationComponent } from './list-operation/list-operation.component';

const routes: Routes = [{ path: '', component: OperationComponent ,children:
  [
    {path:'',pathMatch:'full',redirectTo:'list'},
    {path:'list',component:ListOperationComponent},

  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OperationRoutingModule { }
