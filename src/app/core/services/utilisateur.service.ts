import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';

const USER_API =environment.apiUrl +'/users';
const ASSIGN_API=environment.apiUrl+'/organisations'
const ASSIGNPROCEDURE_API=environment.apiUrl+'/procedures'


@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,) { }


  public search_users(filterParam =''): Observable<any> {
    return this.http
    .get(USER_API , {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data: any) =>
          console.log(
            'api.service > get_formulaire > tap > server data :',
            data
          )     
        )
      );
  }

  public saveUsers(user:any):Observable<any>{
    return this.http.post<any>(USER_API,user).pipe(
      tap((data)=>{
        console.log(data);
      })
    )
  }

  public updateUser(user:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'?'+id, user)
          .pipe(
            tap((data) => {
              console.log('api.service > update_user> tap :', data);
            })
          );
  }


  public delete_usert(userId?: number): Observable<any> {
    return this.http
      .delete(USER_API + '/' + userId, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
          console.log(
            'api.service > delete_user > tap > server data :',
            data
          )
        )
      );
  }

  public get_User(id?:number): Observable<any> {
    return this.http
      .get(USER_API+ '/' + id, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
          console.log(
            'api.service > get_formulaire > tap > server data :',
            data
          )
        )
      );
  }
}
