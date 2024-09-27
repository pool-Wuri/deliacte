import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';

const TYPEDOC_API=environment.apiUrl +"/type-documents";

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
          console.log(
            'api.service > get_formulaire > tap > server data :',
            data
          )     
        )
      );
  }


  public saveTypeDoc(typeDoc:any):Observable<any>{
    return this.http.post<any>(TYPEDOC_API,typeDoc).pipe(
      tap((data)=>{
        console.log(data);
      })
    )
  }

  public updateTypeDoc(type:any,id?:number):Observable<any>{
    return this.http
          .put<any>(TYPEDOC_API+'?'+id, type)
          .pipe(
            tap((data) => {
              console.log('api.service > update-type> tap :', data);
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
          console.log(
            'api.service > delete_typeDoc > tap > server data :',
            data
          )
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
          console.log(
            'api.service > get_formulaire > tap > server data :',
            data
          )
        )
      );
  }
}
