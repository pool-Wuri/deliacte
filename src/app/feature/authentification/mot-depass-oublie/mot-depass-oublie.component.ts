import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-mot-depass-oublie',
  templateUrl: './mot-depass-oublie.component.html',
  styleUrls: ['./mot-depass-oublie.component.scss']
})
export class MotDepassOublieComponent {
  mailOublie!:string;
  dataMailOubli:any;
  loading=false;

  constructor(
    private authentificationService: AuthentificationService,
    private formBuilder:FormBuilder,
    private userService:UtilisateurService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){}
  
  ngOnInit(): void {
    this.mailOublie="";
  }


  saveMailoublie(){
    this.dataMailOubli={
      "email":this.mailOublie,
      "password":null,
      "encodeEmail": null
    }
      this.confirmationService.confirm({
        message: 'Voulez-vous reinitialiser votre mot de passe?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.authentificationService.oublieservice(this.dataMailOubli).subscribe({
          complete:()=>{},
          next:(result)=>{
            console.log(result+"User add");
            this.loading=false;
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Verifier votre boite mail pour valider', life: 3000});
            this.router.navigate(['/deliacte/login']);

          },
          error:(error)=>{
          //  console.log(error);
            setTimeout(()=>{
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Problème de reseau', life: 3000});
              this.loading=false;
              },2000)
          
          }
          
        })      
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'error', detail: 'non je ne veux pas modifier', life: 3000});
      }
      });
   }
}
