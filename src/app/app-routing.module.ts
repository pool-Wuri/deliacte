import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './feature/authentification/signin/signin.component';
import { BaseLayoutComponent } from './feature/feature/base-layout/base-layout.component';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'deliacte/login' }, // Redirection vers 'dialecte'

  {
    path: 'deliacte/login',
    loadChildren: () => import('./feature/authentification/authentification.module').then(m => m.AuthentificationModule)
  },

  {
    path: 'deliacte/procedure-published',
    loadChildren: () => import('./feature/procedure-published/procedure-published.module').then(m => m.ProcedurePublishedModule)
  },
  {
    path: 'baseLayout',
    loadChildren: () => import('./feature/feature/base-layout/base-layout.module').then(m => m.BaseLayoutModule)
  },

  {
    path: 'deliacte',
    canActivate: [LoginGuard],
    component: BaseLayoutComponent, // Assurez-vous que ce composant existe
    children: [
      {
        path: 'organisations',
        loadChildren: () => import('./feature/organisations/organisations.module').then(m => m.OrganisationsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./feature/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'utilisateur',
        loadChildren: () => import('./feature/utilisateur/utilisateur.module').then(m => m.UtilisateurModule)
      },
      {
        path: 'procedure',
        loadChildren: () => import('./feature/procedure/procedure.module').then(m => m.ProcedureModule)
      }, 

      {
        path: 'dossier', loadChildren: () => import('./feature/type-doc/type-doc.module').then(m => m.TypeDocModule)

      },
      {
        path: 'type-operation',
        loadChildren: () => import('./feature/type-operation/type-operation.module').then(m => m.TypeOperationModule)
      },
      {
        path: 'operation',
        loadChildren: () => import('./feature/operation/operation.module').then(m => m.OperationModule)
      },
      {
        path: 'entite',
        loadChildren: () => import('./feature/entite/entite.module').then(m => m.EntiteModule)
      },
      {
        path: 'reglage',
        loadChildren: () => import('./feature/reglage/reglage.module').then(m => m.ReglageModule)
      },

    ]
  },


  { path: '**', redirectTo: '' } // Route de secours pour gérer les URL non trouvées

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
