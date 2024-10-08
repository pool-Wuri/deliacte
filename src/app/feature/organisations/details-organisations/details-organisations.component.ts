import { Component } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Result } from 'postcss';

@Component({
  selector: 'app-details-organisations',
  templateUrl: './details-organisations.component.html',
  styleUrls: ['./details-organisations.component.scss']
})
export class DetailsOrganisationsComponent {
  
  id:number | undefined;
  organisation=new Organisation;
  utilisateurs=new Array <Organisation> ();
  constructor(private route:ActivatedRoute, 
    private organisationService:OrganisationService){

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

  this.organisationService.getUserById(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      this.utilisateurs=result;
      console.log(this.utilisateurs)
    },
    error:(er)=>{console.log("get_error_User")}
  })

  this.organisationService.get_Organisation(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result)
      this.organisation=result;
    },
    error:(error)=>{
      console.log(error)
    }
  })
}

}