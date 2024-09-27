import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './feature/authentification/signin/signin.component';
import { BaseLayoutComponent } from './feature/feature/base-layout/base-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dialecte' }, // Redirection vers 'dialecte'

  { 
    path: 'deliacte/login',
    loadChildren: () => import('./feature/authentification/authentification.module').then(m => m.AuthentificationModule) 
  },

  { 
    path: 'baseLayout',
    loadChildren: () => import('./feature/feature/base-layout/base-layout.module').then(m => m.BaseLayoutModule) 
  },

  {
    path: 'deliacte',
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
      { path: 'procedure', 
        loadChildren: () => import('./feature/procedure/procedure.module').then(m => m.ProcedureModule) 
      },
      { path: 'typeDoc', loadChildren: () => import('./feature/type-doc/type-doc.module').then(m => m.TypeDocModule) },

      
    ]
  },
  
  { path: '**', redirectTo: '' } // Route de secours pour gérer les URL non trouvées

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
