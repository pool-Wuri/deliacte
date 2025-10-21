import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from 'src/environnements/environment';
import { catchError, map, Observable, retry, tap, throwError } from 'rxjs';
import { JwToken } from '../models/jwt-token.module';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private readonly TOKEN_KEY = 'TOKEN';
  API_URL=environment.apiUrl;
  httpParams: HttpHeaders | undefined;

  constructor(private http: HttpClient, private router: Router) {}

  authenticate(login: User): Observable<{ token: string; user: User;message:string}> {
    return this.http.post<{ user: User; access_token: string; refresh_token: string; message:string }>(`${this.API_URL}/auth/authenticate`, login).pipe(
      map(response => {
        // Renommer access_token en token
        return {
          token: response.access_token,
          user: response.user,
          refresh_token: response.refresh_token,
          message: response.message,
        };
      }),
      tap(({ token, user ,refresh_token}) => {
       
        this.saveToken(token);
        this.saveRefreshToken(refresh_token); // Vous pouvez ajouter un saveRefreshToken si besoin
        localStorage.setItem('USER', JSON.stringify(user));
      }),
      catchError(err => {
        // Gérer les erreurs ici
        return throwError(err);
      })
    );
  }

  saveToken(token: string): void {
      localStorage.setItem('ACCESS_TOKEN', token);
      // stocker aussi l'heure d'expiration (24h = 86400000 ms)
      const expireAt = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("expireAt", expireAt.toString());
  }

  saveRefreshToken(token: string): void {
    localStorage.setItem('REFRESH_TOKEN', token);
  }

  getAccessToken(): string | null {
      return localStorage.getItem('ACCESS_TOKEN');
  }

  getRefreshToken(): string | null {
      return localStorage.getItem('REFRESH_TOKEN');
  }

  logOut(): void {
    try {
      localStorage.removeItem('ACCESS_TOKEN');
      this.getAccessToken();
      localStorage.removeItem('REFRESH_TOKEN');
      localStorage.removeItem('USER');
      this.router.navigate(['/deliacte/login']).catch(err => {
        //console.error('Navigation error:', err);
      });
    } catch (error) {
      //console.error('Logout error:', error);
    }
  }

  getUser(): User | null {
    const user = localStorage.getItem("USER");
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    //return !!this.getAccessToken();
    const token = this.getAccessToken();
    const expireAt = localStorage.getItem("expireAt");
    //console.log(expireAt)

    if (!token || !expireAt) {
      return false;
    }
    const now = new Date().getTime();
    if (now > Number(expireAt)) {
      this.logOut(); // si expiré → logout auto
      return false;
    }

    return true;
  }

  oublieservice(mail:any):Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return this.http.post<any>(`${this.API_URL}/users/sendPasswordRejectionRequest`, mail).pipe(
      tap((data) => {
        //console.log('Requête envoyée sans token');
       // console.log(data)
      })
    );
  }

  validerPass(newpass:any):Observable<any>{
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    return this.http.put<any>(this.API_URL+"/users/updatePassword",newpass).pipe(
      tap((data)=>{
      })
    )
  }


  getDossierAfficher(numDossier :any): Observable<any> {
    return this.http
    .get(this.API_URL + "/dossiers/dossierformated/"+ numDossier, {
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data: any) =>
          {}   
        )
      );
  }
  
}
