import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from 'src/environnements/environment';
import { Observable } from 'rxjs';
import { JwToken } from '../models/jwt-token.module';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  API_URL=environment.apiUrl;
TOKEN_KEY="JWT_TOKEN";
  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  authenticate(login: User): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.API_URL}/auth/authenticate`, login);
  }

saveToken(token:string):void{
  localStorage.setItem(this.TOKEN_KEY,token);
}

getToken():string  | null{
  return localStorage.getItem(this.TOKEN_KEY);
}

logOut(){
  localStorage.clear();
  this.router.navigate(['/deliacte/login'])
}

getUser(){
  return localStorage.getItem("USER");
}

}
