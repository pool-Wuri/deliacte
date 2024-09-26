import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Modal } from 'flowbite'
import { Organisation } from 'src/app/core/models/organisation.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';



@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent {
  modal: Modal | undefined; // Déclarez le modal ici
  addUser:boolean=false;
  editbutt:boolean=false;
  adduser:any;
  assigner:any;
  title:string="";
  utilisateurs=new Array <User>()
  utilisateur1 =new User;
  userToAssign=new User;
userselect:any[] | undefined  ;
organisation=new Organisation;
roleUser:string[]=["ORG_ADMIN","PROCEDURE_MANAGER","SUPER_ADMIN"]
isModalOpen: boolean = false;
modalVisible: boolean = false;
assignModal:boolean=false;
organisations:any[]=[];
soumettre:boolean=false;
 constructor(private userService:UtilisateurService,
              private router:Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private organisationService:OrganisationService
 ){
    }

 

 ngOnInit(): void {
  this.searchUser();
 }

 searchUser():void{
  this.userService.search_users().subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result+"User total");
      this.utilisateurs=result;
    },
    error:(error)=>{
      console.log(error);
    }

  })
 }

 ajouter(){
  this.modalVisible = true; // Ouvre le modal
  this.addUser=true;
  this.editbutt=false;
  this.title="Ajouter";
  this.utilisateur1={};
  this.utilisateur1.role="ORG_ADMIN"
  this.searchOrganisation();
 }

 fermerModal() {
  this.modalVisible = false; // Ferme le modal
}


 saveUser(){ 
  this.soumettre=true;
  console.log(this.utilisateur1)
  if(this.utilisateur1.firstName && this.utilisateur1.lastName && this.utilisateur1.password && this.utilisateur1.role)
  {
  this.confirmationService.confirm({
    message: 'Voulez-vous enregistrer cet utilisateur?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.modalVisible = false; // Ouvre le modal 
    this.addUser=false;
    this.editbutt=false;
    this.utilisateur1.isActive=true;
    console.log(this.utilisateur1)
    this.userService.saveUsers(this.utilisateur1).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"User add");
        this.searchUser();
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.modalVisible = false; // Ouvre le modal 
    this.addUser=false;
    this.editbutt=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
  }
 }

searchOrganisation(){
  this.organisationService.search_Organisations("").subscribe(
    {
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Organisation total");
        this.organisations=result;
      },
      error:(error)=>{
        console.log(error);
      }
  
    }
  )
}

 editUser(utilisateur:User){
  this.searchOrganisation();
  this.modalVisible = true; // Ouvre le modal
  this.utilisateur1=utilisateur;
  this.addUser=false;
  this.editbutt=true;
  this.title="Modifier";
  if(this.utilisateur1.role="Administrateur d'Organisation")
    this.utilisateur1.role="ORG_ADMIN"
  console.log(this.utilisateur1)
 }

 validerModif(){
  console.log(this.utilisateur1)
  this.confirmationService.confirm({
    message: 'Voulez-vous modifier cet utilisateur?',
    header: 'Modification',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.modalVisible = false; // Ouvre le modal 
    this.addUser=false;
    this.editbutt=false;
    this.utilisateur1.isActive=true;
    this.userService.updateUser(this.utilisateur1,this.utilisateur1.id).subscribe({
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
  this.editbutt=false;
  this.modalVisible = false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
 // Ouvre le modal 

 }

assigne(utilisateur:any){
  this.searchOrganisation();
  this.assignModal=true;
  this.userToAssign=utilisateur
  this.userToAssign.role="ORG_ADMIN"
  console.log(utilisateur)
}

SaveAssigner(){
  console.log(this.userToAssign)
  this.confirmationService.confirm({
    message: 'confirmation ajout?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.assignModal=false;
    this.userService.updateUser(this.userToAssign,this.userToAssign.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Utilisateur modifié avec succès");
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.assignModal=false;

    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
}

fermerAssign(){
  this.assignModal=false;

}

detailsUser(user:User){
this.router.navigate(['/deliacte/utilisateur/details',user.id])
}

deleteUser(user:User){

 this.confirmationService.confirm({
    message: 'Voulez-vous vraiment supprimer cet utilisateur?',
    header: 'Suppression',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.assignModal=false;
    this.userService.delete_usert(user.id).subscribe({
      complete:()=>{},
      next:(result)=>{
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
}

revoquerAdmin(user:User){
  this.confirmationService.confirm({
    message: 'Voulez-vous vraiment lui retirer ce droit?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    user.role="";
    this.userService.updateUser(user,user.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Utilisateur modifié avec succès");
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.assignModal=false;

    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});

}
}
