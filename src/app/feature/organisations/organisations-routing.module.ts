import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganisationsComponent } from './organisations.component';
import { ListOrganisationsComponent } from './list-organisations/list-organisations.component';
import { DetailsOrganisationsComponent } from './details-organisations/details-organisations.component';

const routes: Routes = [
  { path: '', component: OrganisationsComponent ,children:
    [
      {path:'',pathMatch:'full',redirectTo:'list'},
      {path:'list',component:ListOrganisationsComponent},
      {path:'details/:id',component:DetailsOrganisationsComponent}
    ]
   }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganisationsRoutingModule { }
