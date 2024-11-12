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
  private DOSSIEREVOLUTION_API=environment.apiUrl +"/statistiques/dossierEvolution";
  private DOSSIERBYPROCEDURE_API=environment.apiUrl +"/statistiques/dossierEvolutionByProcedure";
  private USERBYORGANISATION_API=environment.apiUrl +"/organizations";
  private DOSSIERBYORGANISATION_API=environment.apiUrl +"/statistiques/dossierEvolutionByOrganisation";

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

  getDossierEvolution(): Observable<any>{
    return this.http.get(this.DOSSIEREVOLUTION_API);
  }

  getDossierByProcedure(id?:number): Observable<any>{
    return this.http.get(this.DOSSIERBYPROCEDURE_API+ '/' + id);
  }

  getDossierByOrganisation(id?:number): Observable<any>{
    return this.http.get(this.DOSSIERBYORGANISATION_API+ '/' + id);
  }

  getUserBYOrgEvolution(id?:number): Observable<any> {
    return this.http.get(this.USERBYORGANISATION_API+ '/' + id +'/users/evolution');
  }
}
