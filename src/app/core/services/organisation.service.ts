import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { catchError } from 'rxjs/operators';

const ORGANISATION_API =environment.apiUrl +'/organisations';
const ORGANISATIONADMIN_API = environment.apiUrl + '/users';
const PROCEDUREBYORGANISATION_API = environment.apiUrl + '/procedures/procedureByorganisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {

  
  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,) { }

  public search_Organisations(filterParam =''): Observable<any> {
    return this.http
    .get(ORGANISATION_API , {
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


  public saveOrganisation (organisation:any): Observable<any>{
    return this.http.post<any>(ORGANISATION_API,organisation).pipe(
      tap((data)=>{
        console.log(data);
      })
    )

  }

  public get_Organisation(id?:number): Observable<any> {
    return this.http
      .get(ORGANISATION_API+ '/' + id, {
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

  public updateOrganisation(organisation:any,id?:number):Observable<any>{
    return this.http
          .put<any>(ORGANISATION_API+'?'+id, organisation)
          .pipe(
            tap((data) => {
              console.log('api.service > update_organisation> tap :', data);
            })
          );
  }


  public delete_organisation(organisationId?: number): Observable<any> {
    return this.http
      .delete(ORGANISATION_API + '/' + organisationId, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
          console.log(
            'api.service > delete_organisation > tap > server data :',
            data
          )
        )
      );
  }


  public getUserById(id?:number): Observable<any> {
    return this.http
      .get(ORGANISATIONADMIN_API+ '/' + id +'/organisations', {
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

  public getProcedureByOrg(id?:number): Observable<any> {
    return this.http
      .get(PROCEDUREBYORGANISATION_API+ '/' + id, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
          console.log(
            'api.service > get_ProcedureByOrg > tap > server data :',
            data
          )
        )
      );
  }

  
}


