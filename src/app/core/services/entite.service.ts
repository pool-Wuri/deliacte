import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';
import { entityObjectOptionFields } from '../models/entite.modele';

const ENTITE_API=environment.apiUrl +"/classeobject";
const CHAMP=environment.apiUrl+ "/champsclasse";
const CHAMPOption=environment.apiUrl+ "/optionschamps"

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
          console.log('api.service > get_formulaire > tap > server data :',data)     

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

}
