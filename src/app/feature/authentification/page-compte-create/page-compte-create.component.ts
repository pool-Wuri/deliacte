import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/user.model';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-page-compte-create',
  templateUrl: './page-compte-create.component.html',
  styleUrls: ['./page-compte-create.component.scss']
})
export class PageCompteCreateComponent {

  utilisateur1 =new User;
  loading=false;
  submitted:boolean=false;


  constructor(
    private authentificationService: AuthentificationService,
    private formBuilder:FormBuilder,
    private userService:UtilisateurService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){}
  
  ngOnInit(): void {
    this.utilisateur1={};

  }

  saveUser(){
    // this.utilisateur1.role="CITOYEN";
     console.log(this.utilisateur1);
     this.submitted=true;
     this.utilisateur1.role=null;
     this.utilisateur1.password="";
     if(this.utilisateur1.lastName && this.utilisateur1.firstName && this.utilisateur1.email){
       this.confirmationService.confirm({
         message: 'Voulez-vous enregistrer cet utilisateur?',
         header: 'Confirmation',
         acceptLabel:'Oui',
         rejectLabel:'Non',
         icon: 'pi pi-exclamation-triangle',
         acceptButtonStyleClass:'acceptButton',
       accept: () => {
         this.utilisateur1.isActive=true;
         //console.log(this.utilisateur1);
         this.loading=true;
         this.userService.saveCitoyens(this.utilisateur1).subscribe({
           complete:()=>{},
           next:(result)=>{
             if(result.data){
               this.messageService.add({severity:'success', summary: 'Reussite', detail: 'Utilisateur enregistré', life: 3000});
               this.loading=false;
               this.router.navigate(['/deliacte/login']);
             }
             else{
               this.messageService.add({severity:'error', summary: 'Echec', detail: result.message , life: 3000});
               this.loading=false;
     
             }
           },
           error:(error)=>{
             this.messageService.add({severity:'error', summary: 'Echec', detail: error, life: 3000});
             this.loading=false;
           }
       
         })
           
       },
       reject:()=>{
         this.messageService.add({severity:'error', summary: 'Annuler', detail: "Opération annulée", life: 3000});
       }
       });
     }
    
    }
}
