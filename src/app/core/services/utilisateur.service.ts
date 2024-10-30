import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';

const USER_API =environment.apiUrl +'/users';
const USER_API_FILTER =environment.apiUrl +'/users/mysUsers';

const ASSIGN_API=environment.apiUrl+'/organisations'
const ASSIGNPROCEDURE_API=environment.apiUrl+'/procedures'
const SAVE=environment.apiUrl + '/auth/register'
const GET_Role=environment.apiUrl + '/users/role/';


@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,) { }


  public search_users(filterParam =''): Observable<any> {
    return this.http
    .get(USER_API_FILTER, {
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
    return this.http.post<any>(SAVE,user).pipe(
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

  public assigner(organisationIds:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-organisations', organisationIds)
          .pipe(
            tap((data) => {
              console.log('api.service > update_user> tap :', data);
            })
          );
  }

  public assignerProcedure(procedureId:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-procedure', procedureId)
          .pipe(
            tap((data) => {
              console.log('api.service > update_user> tap :', data);
            })
          );
  }


  userOrgaInfo(userId:any):Observable<any>{
      return this.http
    .get(ASSIGN_API+ '/' + userId + '/users', {
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


  procedureInfo(userId:any):Observable<any>{
    return this.http
  .get(ASSIGNPROCEDURE_API+ '/user/' + userId , {
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

getUserByRole(role?:string): Observable<any> {
  return this.http
    .get(GET_Role +role, {
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
