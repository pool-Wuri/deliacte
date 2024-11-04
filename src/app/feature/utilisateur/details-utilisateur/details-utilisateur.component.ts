import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent {
  id:number | undefined;
  utilisateur=new User;
  organisation=new Array <Organisation>();
  procedure=new Array <Procedure>();
ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
SUPER_ADMIN= 'SUPER_ADMIN'
PROCEDURE_MANAGER= 'PROCEDURE_MANAGER'
statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération
user: User | null = null;

  constructor(private route:ActivatedRoute,
      private userService:UtilisateurService
  ){

  }


  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }
  ngOnInit():void{
    const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    console.log(this.user)
  }
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
      this.getUser(this.id)
     }
    );
  }

  getUser(id?:number){
    if(this.user?.role=="ORG_ADMIN"){
      this.userService.procedureInfo(id).subscribe({
        complete:()=>{},
    next:(result)=>{
      this.procedure=result.data;
      console.log(this.procedure)
    },
    error:(error)=>{
      console.log(error)
    }
      });
   
     
    }

    if(this.user?.role=="SUPER_ADMIN"){
      this.userService.userOrgaInfo(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.organisation=result.data;
          console.log(this.organisation)
        },
        error:(error)=>{
          console.log(error)
    }
      });
    }

    this.userService.get_User(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.utilisateur=result.data;
       
      },
      error:(error)=>{
        console.log(error)
      }
    })
   
   
  }

}
