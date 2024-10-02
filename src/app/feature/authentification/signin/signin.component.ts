import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Message,MessageService, PrimeNGConfig} from 'primeng/api';
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
  mess:Message[] | undefined;
  mess1:Message[] | undefined;
constructor(
  private authentificationService: AuthentificationService,
  private formBuilder:FormBuilder,
  private router:Router,
  private primengConfig:PrimeNGConfig
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

onSubmit(){
  this.loading=true;
  this.mess=[];
  this.mess1=[];
  if(this.connexionForm){
    console.log("connexionForm",this.connexionForm);
    console.log("login",this.connexionForm.value["email"]);
    console.log("password",this.connexionForm.value["password"]);
    const parent = this;
    parent.router.navigate(['/deliacte/dashboard']);

  /*  if (this.connexionForm.status=='VALID'){
      this.primengConfig.ripple=true;
         this.connexionEtat=this.authentificationService.login(this.connexionForm.value["email"], this.connexionForm.value["password"]).subscribe({
           complete: () => {  },
           error: (err) => {
             console.log('Error during authentification process: '+err);
             this.loading=false;
             this.mess1=[{severity:'error', summary:'Echec de connexion', detail:"Vérifiez vos identifiants ou votre connexion. Si le problème persiste veuillez contacter l'administrateur du site."}]
           },
             next: (response) => {
               console.log('auth success: ', response);
                 
                     this.mess=[{severity:'success',summary:'Succès',detail:'Connexion réussie'}];
                 
                   setTimeout(()=>{
                     parent.router.navigate(['/deliacte/dashboard']);
                   },2000)
           
                 
                   
             },
             
             
           });
      //this.router.navigate(['/accueil']);
     }*/
  }
 
   
   

 }

}
