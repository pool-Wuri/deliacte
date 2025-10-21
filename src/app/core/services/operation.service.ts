import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';


const PROCEDURE_API=environment.apiUrl +"/operations";
const USER_API=environment.apiUrl + "/users"
const CHAMP=environment.apiUrl+ "/champ-operations";
const CHAMPOption=environment.apiUrl+ "/option-champ-operation"
const RESPONSABLE_API=environment.apiUrl+ "/option-champ-operation"
const OPERATION_BYPROCEDURE_API=environment.apiUrl +"/operations/procedure";
const CHAMP_API=environment.apiUrl +"/champ-operations/champByOperation";
const OPERATIONNextBYID=environment.apiUrl +"/operations/previousAndNext";

@Injectable({
  providedIn: 'root'
})
export class OperationService {
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
        tap((data: any) =>{
        //  console.log('api.service > get_formulaire > tap > server data :',data)     

        }
        )
      );
  }

  public saveProcedure(procedure:any):Observable<any>{
    return this.http.post<any>(PROCEDURE_API,procedure).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }

  public updateprocedure(procedure:any,id?:number):Observable<any>{
    return this.http
          .put<any>(PROCEDURE_API+'/'+id, procedure)
          .pipe(
            tap((data) => {
              //console.log('api.service > update-procedure> tap :', data);
            })
          );
  }


  public delete_operation(operationId?: number): Observable<any> {
    return this.http
      .delete(PROCEDURE_API + '/' + operationId, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>{
         // console.log('api.service > delete_procedure > tap > server data :',data )

        }
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
        tap((data) =>{
          
        }
        //  console.log()
         // console.log( 'api.service > get_formulaire > tap > server data :',data  )
        )
      );
  }

  public get_Operation(id?:number): Observable<any> {
    return this.http
      .get(OPERATION_BYPROCEDURE_API+ '/' + id, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
        {}
        )
      );
  }

  public get_OperationNext(id?:number): Observable<any> {
    return this.http
      .get(OPERATIONNextBYID+ '/' + id, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>{
          /*console.log(
            'api.service > get_formulaire > tap > server data :',
            data
          )*/
        }
       
        )
      );
  }

  ajouterChamp(champ:any):Observable<any>{
    return this.http.post<any>(CHAMP,champ).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }

  public updateChamp(champ:any,id?:number):Observable<any>{
    return this.http
          .put<any>(CHAMP+'?'+id, champ)
          .pipe(
            tap((data) => {
              //console.log('api.service > update-champ> tap :', data);
            })
          );
  }


  searchChamp(filterParam =''): Observable<any> {
    return this.http
    .get(CHAMP , {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data: any) =>
          {
            /*console.log(
            'api.service > get_formulaire > tap > server data :',
            data
          )  */
        }

        )
      );
  }


  public delete_Champ(champId?: number): Observable<any> {
    return this.http
      .delete(CHAMP + '/' + champId, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
         {}
        )
      );
  }


  addOption(option:any):Observable<any>{
    return this.http.post<any>(CHAMPOption,option).pipe(
      tap((data)=>{
        //console.log(data);
      })
    )
  }

  searchResponsable(idOperation:number): Observable<any> {
    return this.http
    .get(USER_API + '/'+ idOperation+'/operations', {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data: any) =>
        {} 
        )
      );
  }



  public get_ChampByOperation(id?:number): Observable<any> {
    return this.http
      .get(CHAMP_API+ '/' + id, {
        headers: this.httpParams,
        responseType: 'json',
      })
      .pipe(
        retry(1),
        tap((data) =>
         {}
        )
      );
  }

}
