import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Location } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

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
loading:boolean=false;
  constructor(private route:ActivatedRoute,
      private userService:UtilisateurService,
      private location: Location,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
  ){

  }


  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }
  ngOnInit():void{
    const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
  }
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.getUser(this.id)
     }
    );
  }

  getUser(id?:number){
    this.loading=true;
    if(this.user?.role=="ORG_ADMIN"){
      this.userService.procedureInfo(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result){
            this.procedure=result.data;
            this.loading=false;
          }
        },
        error:(error)=>{
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});

        }
      });
    }
    if(this.user?.role=="SUPER_ADMIN"){
      this.userService.userOrgaInfo(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result){
            this.organisation=result.data;
            this.loading=false;
          }
         
        },
        error:(error)=>{
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});

    }
      });
    }

    this.userService.get_User(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.utilisateur=result.data;
          this.loading=false;
        }
      },
      error:(error)=>{
        this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});
        this.loading=false;

      }
    })
   
   
  }

  retourPage(){
    this.location.back();
  }

}
