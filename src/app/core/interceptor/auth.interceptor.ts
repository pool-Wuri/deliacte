import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authentificationService:AuthentificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authentificationService.getAccessToken();
  
    // ✅ 1. Vérifier d'abord si on veut ignorer le token
    if (request.url.includes('/sendPasswordRejectionRequest') || request.url.includes('/auth/authenticate')) {
      return next.handle(request); // ne pas ajouter le token
    }
  
    // ✅ 2. Sinon, ajouter le token
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  
    return next.handle(request);
  }
  
}
