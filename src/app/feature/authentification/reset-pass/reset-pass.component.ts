import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent {
  newpass!:string;  
  passConfirm!:string;
  id:number | undefined;
data:any;
submitted:boolean=false;
  constructor(
    private route:ActivatedRoute,
    private authentificationService: AuthentificationService,
    private formBuilder:FormBuilder,
    private userService:UtilisateurService,
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
    /// this.getProcedure(this.id)
     }
    );
  }

  validerPass()
  {
    this.submitted=true;
    if(this.newpass==this.passConfirm){
      this.data={
        "email":"string",
        "password":this.newpass,
        "encodeEmail":this.id
      }
      this.confirmationService.confirm({
        message: 'Confirmez mot de passe?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.authentificationService.validerPass(this.data).subscribe({
          complete:()=>{},
          next:(result)=>{
            console.log(result);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Mot de passe modifié avec succès', life: 3000});
            this.router.navigate(['/deliacte/login']);
  
          },
          error:(error)=>{
            console.log(error);
          }
          
        })
      // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
          //Actual logic to perform a confirmation
          
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
      }
      });
    }
   

  }

  annuler(){
    this.router.navigate(['/deliacte/login']);

  }
}
