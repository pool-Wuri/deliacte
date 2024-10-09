import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private readonly LOGIN_ROUTE = '/deliacte/login'; // Corrigé

  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  // Vérifie si l'utilisateur peut accéder à la route
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.authService.getToken();
    console.log(token)
    // Si le jeton existe, permettre l'accès
    if (token) {
      return true;
    }

    // Sinon, rediriger vers la page de connexion
    this.router.navigate([this.LOGIN_ROUTE]);
    return false;
  }
}
