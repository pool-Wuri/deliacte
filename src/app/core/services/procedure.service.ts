import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap, of } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { Procedure, ProcedureStatus } from '../models/procedure.model';
import { catchError} from 'rxjs/operators';
import { TreeNode } from 'primeng/api';


const PROCEDURE_API=environment.apiUrl +"/procedures";
const CHAMP_API=environment.apiUrl +"/champ-operations/champByProcedure";

const PROCEDURE_PUBLIE_API=environment.apiUrl +"/procedures/status/";

const USER_API=environment.apiUrl + "/users";
const DEMANDE_API=environment.apiUrl + "/dossiers/traitement/"
const DOSSIERBYCITOYEN=environment.apiUrl+"/dossiers/"


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

  public search_ProcedurePublier(statut =''): Observable<any> {
    return this.http
    .get(PROCEDURE_PUBLIE_API + statut, {
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
  


  public saveDemande(demande:any,message:any):Observable<any>{
    return this.http.post<any>(DEMANDE_API+message,demande).pipe(
      tap((data)=>{
        console.log(data);
      })
    )
  }

  public get_Champ(id?:number): Observable<any> {
    return this.http
      .get(CHAMP_API+ '/' + id, {
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


  public saveDoc(doc:any,numDossier:number):Observable<any>{
    return this.http.post<any>(DOSSIERBYCITOYEN+numDossier,doc).pipe(
      tap((data)=>{
        console.log(data);
      })
    )
  }


  getFiles() {
    return this.http.get<any>('assets/files.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
    }

    getLazyFiles() {
    return this.http.get<any>('assets/files-lazy.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
    }

}
