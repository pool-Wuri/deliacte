import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { entityObjectOptionFields } from '../models/entite.modele';

const ENTITE_API=environment.apiUrl +"/entity_object";
const ENTITE_API_DOC_SAVE=environment.apiUrl +"/user-entity-objects";

const ENTITE_API_USER=environment.apiUrl +"/user-entity-objects/user-connected";
const ENTITE_API_USER_SAVE=environment.apiUrl +"/user-entity-objects/multiples";
const ENTITE_API_OPERATION=environment.apiUrl +"/champ-operations";
const ENTITE_API_OPERATION_LIER=environment.apiUrl +"/operations/lier-entite";
const ENTITE_API_OPERATION_RETIRER=environment.apiUrl +"/operations/retirer-entite";

const ENTITE_API_OPERATION_LISTE=environment.apiUrl +"/operations/entites";
const CHAMP=environment.apiUrl+ "/entity_objec_field";
const CHAMPOption=environment.apiUrl+ "/entity_objec_field_option";

@Injectable({
  providedIn: 'root'
})


export class EntiteService {

  httpParams: HttpHeaders | undefined;
  

  constructor(private http: HttpClient,) { }

  public search_Entite(filterParam =''): Observable<any> {
    return this.http
    .get(ENTITE_API , {
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

  public saveEntite(entite:any):Observable<any>{
    return this.http.post<any>(ENTITE_API,entite).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }

  public updateEntite(entite:any,id?:string):Observable<any>{
    return this.http
          .put<any>(ENTITE_API+'/'+id, entite)
          .pipe(
            tap((data) => {
              //console.log('api.service > update-procedure> tap :', data);
            })
          );
  }


  public delete_entite(entiteId?: string): Observable<any> {
    return this.http
      .delete(ENTITE_API + '/' + entiteId, {
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

  getEntityByEntity(id?:string): Observable<any> {
    return this.http
      .get(ENTITE_API+ '/' + id, {
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

  ajouterChamp(champ:any):Observable<any>{
    console.log(champ)
    return this.http.post<any>(CHAMP,champ).pipe(
      tap((data)=>{
        console.log(data);
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


  addOption(option:entityObjectOptionFields):Observable<any>{
    return this.http.post<any>(CHAMPOption,option).pipe(
      tap((data)=>{
        //console.log(data);
      })
    )
  }

  getChampByEntity(id?:string): Observable<any> {
    return this.http
      .get(CHAMP+ '/by-entity/' + id, {
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

  public search_EntiteUser(filterParam =''): Observable<any> {
    return this.http
    .get(ENTITE_API_USER , {
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


  public saveEntiteUser(entite:any):Observable<any>{
    return this.http.post<any>(ENTITE_API_USER_SAVE,entite).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }

  public saveEntiteOperation(entite:any):Observable<any>{
    return this.http.post<any>(ENTITE_API_OPERATION_LIER,entite).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }
  public retirerEntiteOperation(entite:any):Observable<any>{
    return this.http.post<any>(ENTITE_API_OPERATION_RETIRER,entite).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }

  public saveEntiteChampOperation(entite:any,operationId:number):Observable<any>{
    return this.http.post<any>(ENTITE_API_OPERATION+"/"+operationId+"/add-entities",entite).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }

  public saveDoc(doc:any):Observable<any>{
    return this.http.post<any>(ENTITE_API_DOC_SAVE,doc).pipe(
      tap((data)=>{
       // console.log(data);
      })
    )
  }


  public search_EntiteByOperation(operationId:number): Observable<any> {
    return this.http
    .get(ENTITE_API_OPERATION_LISTE+"?operationId="+operationId , {
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

}
