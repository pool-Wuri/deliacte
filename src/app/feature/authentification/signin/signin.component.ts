import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ConfirmationService, Message,MessageService, PrimeNGConfig} from 'primeng/api';
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
}
initForm(){
  this.connexionForm=this.formBuilder.group(
    {
      email: this.formBuilder.control('',Validators.required),
      password:this.formBuilder.control('',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{4,}/)])
    },{updateOn:'submit'}
  )
}

submitted:boolean=false;

get f(): { [key: string]: AbstractControl } {
  return this.connexionForm.controls;
}

onSubmit(){
  this.submitted=true;
  this.loading=true;
  this.utilisateur=this.connexionForm.value as User;
  console.log(this.utilisateur)
  this.authentificationService.authenticate(this.utilisateur).subscribe({
    next: response => {
      console.log(response)
      this.loading=false;
      this.authentificationService.saveToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      const userData = localStorage.getItem('user');
      this.messageService.add({severity:'success', summary: 'Success', detail: 'Connexion réussie'});
      if (userData) {
        this.user = JSON.parse(userData);
        console.log(this.user)
      }    
      if(this.user.role=="CITOYEN"){
        this.router.navigate(['/deliacte/procedure-published/list']);
      }
      else
      setTimeout(()=>{
        this.router.navigate(['/deliacte/dashboard/']);
      },2000)
    },
    error: error => {
      console.error('Erreur lors de l\'authentification', error);
      this.loading=false;
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Veuillez verifier vos identifiants'});

   //   this.mess1=[{severity:'error', summary:'Echec de connexion', detail:"Vérifiez vos identifiants ou votre connexion. Si le problème persiste veuillez contacter l'administrateur du site."}]
      //this.errorMessage = 'Identifiants invalides, veuillez réessayer.';
    }
  });
  

 }


 ajouter(){
  this.utilisateur1={};
  this.addUser=true;

 }

 saveUser(){
  this.utilisateur1.role="CITOYEN";
  console.log(this.utilisateur1)
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
    console.log(this.utilisateur1)
    this.userService.saveCitoyens(this.utilisateur1).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"User add");
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addUser=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
 }

 fermerModal(){
  this.addUser=false;
 }
}
