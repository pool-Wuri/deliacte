import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';

const TYPEDOC_API=environment.apiUrl +"/type-documents";
const DOSSIER=environment.apiUrl+"/dossiers";
const DOSSIERBYCITOYEN=environment.apiUrl+"/dossiers/dossierByNumero/"
const DOCUMENTAPI=environment.mockApiUrl+"/uploads/";
const DOSSIERBYPROCEDURE=environment.apiUrl+"/dossiers/dossierByProcedure/";
const DOSSIERAtraiter=environment.apiUrl+"/dossiers/userConnectedDossierATraiter";
const DOSSIERTraitements=environment.apiUrl+"/dossiers/dossierTraiterByNumero";
const DOCUMENT_DOWNLOADAPI=environment.apiUrl+"/documentstemplate/pdffromword";
const DOSSIER_BY_OPERATION=environment.apiUrl+"/dossiers/atraiterParAgentAffecter";





@Injectable({
  providedIn: 'root'
})
export class TypeDocService {

  httpParams: HttpHeaders | undefined;
  constructor(private http: HttpClient,) { }

  public search_TypeDoc(filterParam =''): Observable<any> {
    return this.http
    .get(TYPEDOC_API , {
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


  public saveTypeDoc(typeDoc:any):Observable<any>{
    return this.http.post<any>(TYPEDOC_API,typeDoc).pipe(
      tap((data)=>{
        //console.log(data);
      })
    )
  }

  public updateTypeDoc(type:any,id?:number):Observable<any>{
    return this.http
          .put<any>(TYPEDOC_API+'?'+id, type)
          .pipe(
            tap((data) => {
              //console.log('api.service > update-type> tap :', data);
            })
          );
  }


  public delete_typeDoc(typeId?: number): Observable<any> {
    return this.http
      .delete(TYPEDOC_API + '/' + typeId, {
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

  public get_TpeDoc(id?:number): Observable<any> {
    return this.http
      .get(TYPEDOC_API+ '/' + id, {
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


  public searchDoosier(): Observable<any> {
    return this.http
    .get(DOSSIER, {
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

  public searchDoosierByProcedure(id:number): Observable<any> {
    return this.http
    .get(DOSSIERBYPROCEDURE +id, {
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
  public searchDoosierByOperations(id:number): Observable<any> {
    return this.http
    .get(DOSSIER_BY_OPERATION + '/'+ id, {
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

  getDossier(id?:number): Observable<any> {
    return this.http
      .get(DOSSIERBYCITOYEN+ id, {
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

  getDossierAtraiter(): Observable<any> {
    return this.http
      .get(DOSSIERAtraiter, {
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

  getDossierPour(numDossier?:number): Observable<any> {
    return this.http
      .get(DOSSIERTraitements+"/"+numDossier, {
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


  public voirDoc(name:string): Observable<string> {
    return this.http
      .get<string>(DOCUMENTAPI+name)
      .pipe(
        retry(1),
        tap((data) =>
        {}
        )
      );
  }


  telechargerDoc(operationId: string, numeroDossier: any): Observable<any> {
    const params = new HttpParams()
      .set('operationId', operationId)
      .set('numeroDossier', numeroDossier);
  
      return this.http.post<string>(DOCUMENT_DOWNLOADAPI, null, { params })
      .pipe(
        retry(1),
        tap(data => {
          //console.log(data)
        })
      );
    }
}
