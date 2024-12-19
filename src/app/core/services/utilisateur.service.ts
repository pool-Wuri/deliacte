import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { AuthentificationService } from './authentification.service';
import { MessageService } from 'primeng/api';

const USER_API =environment.apiUrl +'/users';
const USERBYORGANISATION_API =environment.apiUrl +'/users/MyOrganisationOrProcedureUsers';

const USER_API_FILTER =environment.apiUrl +'/users/mysUsers';

const ASSIGN_API=environment.apiUrl+'/organisations'
const ASSIGNPROCEDURE_API=environment.apiUrl+'/procedures';
const ASSIGNOPERATION_API=environment.apiUrl+'/operations'

const SAVE=environment.apiUrl + '/auth/register'
const GET_Role=environment.apiUrl + '/users/role/';


@Injectable({
  providedIn: 'root'
})

export class UtilisateurService {
  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,private authService: AuthentificationService,private messageService: MessageService  // Injection de MessageService
  ) { }


  public allUser(filterParam =''): Observable<any> {
    return this.http
    .get(USER_API, {
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

  public userOrganisation(filterParam =''): Observable<any> {
    return this.http
    .get(USERBYORGANISATION_API, {
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
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
    });
    return this.http.post<any>(USER_API, user, { headers }).pipe(
      tap((data) => {
        console.log('User saved:', data);
      }),
      catchError((error) => {
        // Utiliser le service ErrorHandler pour gérer l'erreur
        return this.handleError(error);  // Appel au service d'erreur
      })
    );
  }

  
  public saveCitoyens(user:any):Observable<any>{
    const token = this.authService.getAccessToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Ajoutez le token dans les en-têtes
    });
    return this.http.post<any>(USER_API, user).pipe(
      tap((data) => {
        console.log('User saved:', data);
      }),
      catchError((error) => {
        console.error('Error saving user:', error);
        return of(null); // Gestion des erreurs
      })
    );
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

  public assignerOperation(operationIds:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-operations', operationIds)
          .pipe(
            tap((data) => {
              console.log('api.service > update_user> tap :', data);
            })
          );
  }

  public revoquer(organisationIds:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-organisations', organisationIds)
          .pipe(
            tap((data) => {
              console.log('api.service > update_user> tap :', data);
            })
          );
  }

  public revoquerProc(procedureId:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-procedure', procedureId)
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

  public assigneroperation(operationId:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-operation', operationId)
          .pipe(
            tap((data) => {
              console.log('api.service > update_user> tap :', data);
            })
          );
  }

  public revoquerOperation(operationIds:any,id?:number):Observable<any>{
    return this.http
          .put<any>(USER_API+'/'+id+'/admin-operation', operationIds)
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

operationInfo(userId:any):Observable<any>{
  return this.http
.get(ASSIGNOPERATION_API+ '/user/' + userId , {
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


private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Une erreur s\'est produite. Veuillez réessayer plus tard ou vérifier les informations saisies.';
  if (error.status === 500) {
    errorMessage = 'l\'utilisateiur existe déja';
  } else if (error.status === 0) {
    errorMessage = 'Impossible de se connecter au serveur. Vérifiez votre connexion Internet.';
  }

  // Utiliser MessageService pour afficher l'erreur
  this.messageService.add({ 
    severity: 'error', 
    summary: 'Erreur', 
    detail: errorMessage 
  });
  console.log(this.messageService)

  return throwError(() => new Error(errorMessage));
}

}
