import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ConfirmationService, Message,MessageService, PrimeNGConfig} from 'primeng/api';
import { retry } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
//import { AuthentificationService } from 'src/app/core/services/authentification.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  connexionForm: FormGroup = new FormGroup({});
  loading=false;
  connexionEtat:any;
  mess:Message[] =[];
  mess1:Message[] =[];
  formLogin:FormGroup<any> | undefined;
  utilisateur= new User();
  utilisateur1 =new User;
  addUser:boolean=false;
  user=new User;
demandePage:boolean=false;
oubliPage:boolean=false;

numDossier!:any;
mailOublie!:string;
dataMailOubli:any;
passPage:boolean=false;
newpass!:string;
submitted:boolean=false;
currentUrl: string = '';

constructor(
  private authentificationService: AuthentificationService,
  private formBuilder:FormBuilder,
  private userService:UtilisateurService,
  private router:Router,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
){}

ngOnInit(): void {
  this.initForm();
  this.currentUrl = this.router.url;
    console.log('URL actuelle :', this.currentUrl);
}
initForm(){
  this.connexionForm=this.formBuilder.group(
    {
      email: this.formBuilder.control('',Validators.required),
      password:this.formBuilder.control('',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{4,}/)])
    },{updateOn:'submit'}
  )
}


get f(): { [key: string]: AbstractControl } {
  return this.connexionForm.controls;
}

onSubmit(){
  this.submitted=true;
  this.utilisateur=this.connexionForm.value as User;
  console.log(this.utilisateur);
  if(this.utilisateur.email && this.utilisateur.password){
    this.loading=true;

    this.authentificationService.authenticate(this.utilisateur).subscribe({
      next: response => {
        console.log(response);
        if(response.user){
          this.loading=false;
          this.authentificationService.saveToken(response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          const userData = localStorage.getItem('user');
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Connexion réussie'});
          if (userData) {
            this.user = JSON.parse(userData);
            console.log(this.user)
          }    
          if(this.user.role=="CITOYEN" || this.user.role=="PROCEDURE_MANAGER" || this.user.role=="AGENT"){
            this.router.navigate(['/deliacte/dossier/list']);
          }
          else
          setTimeout(()=>{
            this.router.navigate(['/deliacte/dashboard/']);
          },2000)
        }
        else{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: response.message});
          setTimeout(()=>{
            this.loading=false;
          },2000)
  
        }
      },
      error: error => {
        console.error('Erreur lors de l\'authentification', error);
        this.loading=false;
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Veuillez verifier vos identifiants'});
      }
    });
    
    }
  
 }


 ajouter(){
  this.utilisateur1={};
  this.addUser=true;

 }

 saveUser(){
 // this.utilisateur1.role="CITOYEN";
  console.log(this.utilisateur1);
  this.submitted=true;
  if(this.utilisateur1.lastName && this.utilisateur1.firstName && this.utilisateur1.email){
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cet utilisateur?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.addUser=false;
      this.utilisateur1.isActive=true;
      console.log(this.utilisateur1);
      this.loading=true;
      this.userService.saveCitoyens(this.utilisateur1).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result.data){
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
            this.loading=false;
          }
          else{
            this.messageService.add({severity:'error', summary: 'Erreur', detail: result.message , life: 3000});
            this.loading=false;
  
          }
          console.log(result.message );
        },
        error:(error)=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});
          this.loading=false;
        }
    
      })
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.addUser=false;
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
    });
  }
 
 }

 fermerModal(){
  this.addUser=false;
 }

 suivreDemande(){
  this.demandePage=true;
  console.log(this.demandePage)
  console.log(this.numDossier)
 }

 validerDemande(dossierNumbur:any){
  console.log(dossierNumbur)
  this.router.navigate(['/deliacte/login/details', dossierNumbur]);
 }

 Oublie(){
  this.oubliPage=true;
  console.log(this.oubliPage)
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
          this.oubliPage=false;
          this.loading=false;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Verifier votre boite mail pour valider', life: 3000});
        },
        error:(error)=>{
          console.log(error);
          setTimeout(()=>{
            this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Problème de reseau', life: 3000});
            this.loading=false;
            },2000)
        
        }
        
      })      
    },
    reject:()=>{
      this.oubliPage=false;
      this.messageService.add({severity:'error', summary: 'error', detail: 'non je ne veux pas modifier', life: 3000});
    }
    });
 }
}
