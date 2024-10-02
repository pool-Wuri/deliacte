import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeOperationComponent } from './type-operation.component';
import { ListTypeOperationComponent } from './list-type-operation/list-type-operation.component';
import { DetailsTypeoperationComponent } from './details-typeoperation/details-typeoperation.component';

const routes: Routes = [
  { path: '', component: TypeOperationComponent ,children:
    [
      {path:'',pathMatch:'full',redirectTo:'list'},
      {path:'list',component:ListTypeOperationComponent},
      {path:'details/:id',component:DetailsTypeoperationComponent}
    ]
  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeOperationRoutingModule { }
