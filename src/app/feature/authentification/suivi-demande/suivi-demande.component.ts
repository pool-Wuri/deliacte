import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-suivi-demande',
  templateUrl: './suivi-demande.component.html',
  styleUrls: ['./suivi-demande.component.scss']
})
export class SuiviDemandeComponent {
  numDossier!:any;
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
    this.numDossier="";
  }
  
  validerDemande(dossierNumbur:any){
    this.submitted=true;
    if(dossierNumbur){
      this.router.navigate(['/deliacte/login/details', dossierNumbur]);

    }
   }

 
}
