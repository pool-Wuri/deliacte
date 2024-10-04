import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeDocComponent } from './type-doc.component';
import { ListDocTypeComponent } from './list-doc-type/list-doc-type.component';
import { DetailsTypeDocComponent } from './details-type-doc/details-type-doc.component';

const routes: Routes = [{ path: '', component: TypeDocComponent,children:
  [
    {path:'',pathMatch:'full',redirectTo:'list'},
    {path:'list',component:ListDocTypeComponent},
    {path:'details/:id',component:DetailsTypeDocComponent},

  ] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeDocRoutingModule { }
