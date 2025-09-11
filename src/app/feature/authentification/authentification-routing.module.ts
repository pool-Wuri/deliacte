import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { DossierSuiviComponent } from './dossier-suivi/dossier-suivi.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { PageCompteCreateComponent } from './page-compte-create/page-compte-create.component';

const routes: Routes = [
  {path:'',component:SigninComponent},
  {path:'details/:id',component:DossierSuiviComponent},
  {path:'creationUtilisateur',component:PageCompteCreateComponent},
  {path:'reset-password/:id',component:ResetPassComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
