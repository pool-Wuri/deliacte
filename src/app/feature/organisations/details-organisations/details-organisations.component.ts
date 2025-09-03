import { Component } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-organisations',
  templateUrl: './details-organisations.component.html',
  styleUrls: ['./details-organisations.component.scss']
})
export class DetailsOrganisationsComponent {
  
  id:number | undefined;
  organisation=new Organisation;
  utilisateurs=new Array <User> ();
  procedures=new Array <Procedure> ();
  loading:boolean=false;
  ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
  SUPER_ADMIN= 'SUPER_ADMIN'
  PROCEDURE_MANAGER= 'PROCEDURE_MANAGER'
  statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération

  constructor(private route:ActivatedRoute, 
    private organisationService:OrganisationService,
    private location: Location,
  ){

}

parseStatus(status: string): string {
  return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
}

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
    this.getOrganisation(this.id)
   }
  );
}


getOrganisation(id?:number){
  
  this.organisationService.getProcedureByOrg(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      this.procedures=result.data;
      console.log(this.procedures)
    },
    error:(er)=>{console.log("get_error")}
  })

  this.organisationService.getUserById(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      this.utilisateurs=result.data;
      console.log(this.utilisateurs)
    },
    error:(er)=>{console.log("get_error_User")}
  })

  this.organisationService.get_Organisation(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result)
      this.organisation=result.data;
    },
    error:(error)=>{
      console.log(error)
    }
  })
}
retourPage(){
  this.location.back();
}

}