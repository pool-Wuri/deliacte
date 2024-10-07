import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Assigne, ProcedurAssign, User } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Modal } from 'flowbite'
import { Organisation } from 'src/app/core/models/organisation.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Procedure } from 'src/app/core/models/procedure.model';



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
procedureTru:boolean=false;
adminTrue:boolean=false;
//roleUser=[{value:"ORG_ADMIN",label:"Administrateur d'organisation"},{value:"PROCEDURE_MANAGER",label:"Manager de procedure"},{value:"SUPER_ADMIN",label:"super admin"}]
roleUser:any=["Administrateur d'organisation","Manager de procedure","super admin"]
isModalOpen: boolean = false;
modalVisible: boolean = false;
assignModal:boolean=false;
organisations:any[]=[];
soumettre:boolean=false;
newOrganisationId:number=0;
idOrganisationAssign=new Assigne;
proceduresid=new ProcedurAssign;
procedures=new Array <Procedure>;
 constructor(private userService:UtilisateurService,
              private router:Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private organisationService:OrganisationService,
              private procedureService:ProcedureService
 ){
    }

 

 ngOnInit(): void {
  this.searchUser();
 }

 searchUser():void{
  this.userService.search_users().subscribe({
    complete:()=>{},
    next:(result)=>{
     // console.log(result+"User total");
      this.utilisateurs=result;
      for(let i=0;i<this.utilisateurs.length;i++){
        if(this.utilisateurs[i].role=="ORG_ADMIN"){
          this.utilisateurs[i].role="Administrateur d'organisation"
        }
        else if(this.utilisateurs[i].role=="PROCEDURE_MANAGER")
        {
          this.utilisateurs[i].role="Manager de procedure"
      
        }
        else if(this.utilisateurs[i].role=="SUPER_ADMIN")
        {
          this.utilisateurs[i].role="super admin"
        }
      }
    
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
  this.utilisateur1.role="Administrateur d'organisation"
  this.searchOrganisation();
  console.log(this.utilisateur1.role)
 }

 fermerModal() {
  this.modalVisible = false; // Ferme le modal
}

searchProcedures(){
  this.procedureService.search_Procedure("").subscribe(
    {
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Organisation total");
        this.procedures=result;
      },
      error:(error)=>{
        console.log(error);
      }
  
    }
  )
}

 saveUser(){ 
  this.soumettre=true;
  console.log(this.utilisateur1);
  if(this.utilisateur1.role=="Administrateur d'organisation"){
    this.utilisateur1.role="ORG_ADMIN"
  }
  else if(this.utilisateur1.role=="Manager de procedure")
  {
    this.utilisateur1.role="PROCEDURE_MANAGER"

  }
  else if(this.utilisateur1.role=="super admin")
  {
    this.utilisateur1.role="SUPER_ADMIN"
  }
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
  console.log(this.utilisateur1)
 }

 validerModif(){
  console.log(this.utilisateur1)
  if(this.utilisateur1.role=="Administrateur d'organisation"){
    this.utilisateur1.role="ORG_ADMIN"
  }
  else if(this.utilisateur1.role=="Manager de procedure")
  {
    this.utilisateur1.role="PROCEDURE_MANAGER"

  }
  else if(this.utilisateur1.role=="super admin")
  {
    this.utilisateur1.role="SUPER_ADMIN"
  }
  this.utilisateur1.userOrganisationsIds?.push(this.newOrganisationId)
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
  this.searchProcedures();
  this.assignModal=true;
  this.userToAssign=utilisateur
  this.idOrganisationAssign={};
  this.proceduresid={}
}

eventModif(){
  console.log(this.userToAssign.role)
  if(this.userToAssign.role=="Administrateur d'organisation" || this.userToAssign.role=="ORG_ADMIN" ){
    this.procedureTru=false;
    this.adminTrue=true;
  }
  else if(this.userToAssign.role=="PROCEDURE_MANAGER" || "Manager de procedure"){
    this.procedureTru=true;
    this.adminTrue=false;
  }

  console.log(this.procedureTru)
}

SaveAssigner(){
  console.log(this.userToAssign)
  console.log(this.newOrganisationId)
  if(this.userToAssign.role=="Administrateur d'organisation"){
    this.userToAssign.role="ORG_ADMIN"
  }
  else if(this.userToAssign.role=="Manager de procedure")
  {
    this.userToAssign.role="PROCEDURE_MANAGER"

  }
  else if(this.userToAssign.role=="super admin")
  {
    this.userToAssign.role="SUPER_ADMIN"
  }
console.log(this.userToAssign.role)
  if(this.userToAssign.role=="ORG_ADMIN" || "Administrateur d'organisation"){
    this.procedureTru=false;
    this.adminTrue=true;
    this.confirmationService.confirm({
      message: 'confirmation ajout?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.assignModal=false;
      this.userService.assigner(this.idOrganisationAssign,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Utilisateur modifié avec succès");
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.userService.updateUser(this.userToAssign,this.userToAssign.id).subscribe({
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
      this.assignModal=false;
  
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
   });
  }
  else if (this.userToAssign.role=="PROCEDURE_MANAGER" || "Manager de procedure"){
    this.procedureTru=true;
    this.adminTrue=false;
    this.confirmationService.confirm({
      message: 'confirmation ajout?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.assignModal=false;
      this.userService.assignerProcedure(this.proceduresid,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Utilisateur modifié avec succès");
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.userService.updateUser(this.userToAssign,this.userToAssign.id).subscribe({
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
      this.assignModal=false;
  
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });
  }

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
