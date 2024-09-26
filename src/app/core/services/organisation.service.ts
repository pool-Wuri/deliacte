import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';

const ORGANISATION_API =environment.apiUrl +'/organisations';

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
}


