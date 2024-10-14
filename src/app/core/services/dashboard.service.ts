import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { environment } from 'src/environnements/environment';



@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  httpParams: HttpHeaders | undefined;

  private ORGEVOLUTION_API=environment.apiUrl +"/statistiques/organizations/evolution";
  private USERSEVOLUTION_API=environment.apiUrl +"/statistiques/users/evolution";
  private PROBYORGEVOLUTION_API=environment.apiUrl +"/statistiques/organizations";



  constructor(private http: HttpClient) { }

  getOrganizationEvolution(): Observable<any> {
    return this.http.get(this.ORGEVOLUTION_API);
  }

  getUserEvolution(): Observable<any> {
    return this.http.get(this.USERSEVOLUTION_API);
  }

  getProBYOrgEvolution(id?:number): Observable<any> {
    return this.http.get(this.PROBYORGEVOLUTION_API+ '/' + id +'/procedures/evolution');
  }
}
