import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { catchError } from 'rxjs/operators';

const TYPEOPERATION_API =environment.apiUrl +'/type-operations';

@Injectable({
  providedIn: 'root'
})
export class TypeOperationService {

  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,) { }


  public search_Typeoperation(filterParam =''): Observable<any> {
    return this.http
    .get(TYPEOPERATION_API , {
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

  public saveTypeoperation (TypeOperation:any): Observable<any>{
    return this.http.post<any>(TYPEOPERATION_API,TypeOperation).pipe(
      tap((data)=>{
        console.log(data);
      })
    )

  }

  public get_Typeoperation(id?:number): Observable<any> {
    return this.http
      .get(TYPEOPERATION_API+ '/' + id, {
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

  public updateTypeoperation(TypeOperation:any,id?:number):Observable<any>{
    return this.http
          .put<any>(TYPEOPERATION_API+'/'+id, TypeOperation)
          .pipe(
            tap((data) => {
              console.log('api.service > update_organisation> tap :', data);
            })
          );
  }


  public delete_Typeoperation(TypeOperationId?: number): Observable<any> {
    return this.http
      .delete(TYPEOPERATION_API + '/' + TypeOperationId, {
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

  
}
