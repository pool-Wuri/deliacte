import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilisateurComponent } from './utilisateur.component';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import { DetailsUtilisateurComponent } from './details-utilisateur/details-utilisateur.component';

const routes: Routes = [{ path: '', component: UtilisateurComponent ,children:
  [
    {path:'',pathMatch:'full',redirectTo:'list'},
    {path:'list',component:ListUtilisateurComponent},
    {path:'details/:id',component:DetailsUtilisateurComponent}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
