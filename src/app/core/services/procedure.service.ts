import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, of } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { Procedure, ProcedureStatus } from '../models/procedure.model';
import { catchError} from 'rxjs/operators';


const PROCEDURE_API=environment.apiUrl +"/procedures";
const USER_API=environment.apiUrl + "/users"

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,) { }

  public search_Procedure(filterParam =''): Observable<any> {
    return this.http
    .get(PROCEDURE_API , {
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


  public saveProcedure(procedure:any):Observable<any>{
    return this.http.post<any>(PROCEDURE_API,procedure).pipe(
      tap((data)=>{
        console.log(data);
      })
    )
  }

  public updateprocedure(procedure:any,id?:number):Observable<any>{
    return this.http
          .put<any>(PROCEDURE_API+'?'+id, procedure)
          .pipe(
            tap((data) => {
              console.log('api.service > update-procedure> tap :', data);
            })
          );
  }


  public delete_procedure(procedureId?: number): Observable<any> {
    return this.http
      .delete(PROCEDURE_API + '/' + procedureId, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
          console.log(
            'api.service > delete_procedure > tap > server data :',
            data
          )
        )
      );
  }

  public get_Procedure(id?:number): Observable<any> {
    return this.http
      .get(PROCEDURE_API+ '/' + id, {
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




  public getUserById(id?:number): Observable<any> {
    return this.http
      .get(USER_API+ '/' + id +'/procedures', {
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


  public updateProcedureStatus(procedure:any,id?:number):Observable<any>{
    return this.http
          .put<any>(PROCEDURE_API+ '?'+ id +'/status',  procedure)
          .pipe(
            tap((data) => {
              console.log('api.service > update-procedure> tap :', data);
            })
          );
  }
  
}
