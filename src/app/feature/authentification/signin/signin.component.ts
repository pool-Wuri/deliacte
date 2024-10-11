import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Message,MessageService, PrimeNGConfig} from 'primeng/api';
import { User } from 'src/app/core/models/user.model';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
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
  formLogin:FormGroup<any> | undefined;
  utilisateur= new User();
constructor(
  private authentificationService: AuthentificationService,
  private formBuilder:FormBuilder,
  private router:Router,
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
  this.utilisateur=this.connexionForm.value as User;
  console.log(this.utilisateur)
  this.authentificationService.authenticate(this.utilisateur).subscribe({
    next: response => {
      this.authentificationService.saveToken(response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.router.navigate(['/deliacte/dashboard/']);
    },
    error: error => {
      console.error('Erreur lors de l\'authentification', error);
      //this.errorMessage = 'Identifiants invalides, veuillez réessayer.';
    }
  });
  

 }

}
