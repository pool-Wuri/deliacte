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
  organisationId!: number;
  admins: any[] = [];

  id:number | undefined;
  organisation=new Organisation;
  constructor(private route:ActivatedRoute, 
    private organisationService:OrganisationService){

}

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
    this.getOrganisation(this.id)

    // Récupérer l'ID de l'organisation à partir de l'URL
    this.organisationId = +this.route.snapshot.paramMap.get('id')!;
    this.getOrganisationAdmins(this.organisationId);
   }
  );
}


getOrganisationAdmins(id: number): void {
  this.organisationService.getAdminsByOrganisationId(id).subscribe(
    (data: any[]) => this.admins = data,
    (error) => console.error(error)
  );
}

getOrganisation(id?:number){
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