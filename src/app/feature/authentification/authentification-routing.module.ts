import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DossierSuiviComponent } from './dossier-suivi/dossier-suivi.component';

const routes: Routes = [
  {path:'',component:SigninComponent},
  {path:'details/:id',component:DossierSuiviComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
