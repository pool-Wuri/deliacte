import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Assigne, OperationAssign, ProcedurAssign, User, UserRole } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Modal } from 'flowbite'
import { Organisation } from 'src/app/core/models/organisation.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { Operation } from 'src/app/core/models/operation.model';



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
  ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
SUPER_ADMIN= 'SUPER_ADMIN'
PROCEDURE_MANAGER='PROCEDURE_MANAGER';
//roleUser=[{value:"ORG_ADMIN",label:"Administrateur d'organisation"},{value:"PROCEDURE_MANAGER",label:"Manager de procedure"},{value:"SUPER_ADMIN",label:"super admin"}]
roleUser:any=["Administrateur d'organisation","Manager de procedure","super admin"]
isModalOpen: boolean = false;
modalVisible: boolean = false;
assignModal:boolean=false;
organisations:any[]=[];
soumettre:boolean=false;
newOrganisationId:number=0;
idOrganisationAssign=new Assigne;
operationsIds=new OperationAssign;

proceduresid=new ProcedurAssign;
procedures=new Array <Procedure>;
user: User | null = null;
procedureAdd:any
loading:boolean=false;
statuses = Object.entries(UserRole); // Récupérer les valeurs de l'énumération
titleAssig:string='';
procedurechoisi=new Procedure;
operations=new Array <Operation>();
submitted: boolean=false;

 constructor(private userService:UtilisateurService,
              private router:Router,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private organisationService:OrganisationService,
              private procedureService:ProcedureService,
              private operationService:OperationService,

 ){
    }

 

 ngOnInit(): void {
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    console.log(this.user)
  }
  this.searchUser();
  this.searchProcedures();

 }

 searchUser():void{
  console.log(this.user?.role)
 /* if(this.user?.role=="SUPER_ADMIN"){
    this.userService.getUserByRole("ORG_ADMIN").subscribe({
      next:(value)=>{
        this.utilisateurs=value;
        console.log(this.utilisateurs)
      },
      complete:()=>{},
      error:(err)=>{}
    })
   
  }

  if(this.user?.role=="ORG_ADMIN"){
    this.userService.getUserByRole("PROCEDURE_MANAGER").subscribe({
      next:(value)=>{
        this.utilisateurs=value;
        this.utilisateurs.reverse();
        console.log(this.utilisateurs)
      },
      complete:()=>{},
      error:(err)=>{}
    })
    this.utilisateurs = this.utilisateurs.filter(u => 
      u.role === "PROCEDURE_MANAGER" || u.role === "Manager de procedure"
    ); 
  }*/

 this.userService.search_users().subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result)
      this.utilisateurs=result.data;
      console.log(this.utilisateurs)
    
    },
    error:(error)=>{
      console.log(error);
    }

  })
 }

  parseStatus(status: string): string {
    return UserRole[status as keyof typeof UserRole] || 'Statut inconnu';
  }

 ajouter(){
  this.modalVisible = true; // Ouvre le modal
  this.addUser=true;
  this.editbutt=false;
  this.title="Ajouter";
  this.utilisateur1={};
  this.submitted=false;
 /* if(this.user?.role=="ORG_ADMIN"){
    this.utilisateur1.role="Manager de procedure"
  }

  if(this.user?.role=="SUPER_ADMIN"){
    this.utilisateur1.role="Administrateur d'organisation"

  }*/
  this.searchOrganisation();
  console.log(this.utilisateur1.role)
 }

 fermerModal() {
  this.modalVisible = false; // Ferme le modal
}


onSortChange(event: { value: any; }) {
  let proced = event.value;
  console.log(proced)
  this.operationService.search_Procedure("").subscribe({
    next:(value)=>{
      this.operations=value.data;
      console.log(this.operations)
     this.operations=this.operations.filter(u=>u.procedureId===proced.id);
      this.operations.reverse();
      for(let i=0;i<this.operations.length;i++){
        this.procedureService.get_Procedure( this.operations[i].procedureId).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.operations[i].procedure=result.data;
         console.log(result)    },
          error:(er)=>{console.log("get_error_User")}
        });
      

     
      }
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
  }

searchProcedures(){
  this.procedureService.search_Procedure("").subscribe(
    {
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Organisation total");
        this.procedures=result.data;
        console.log(this.procedures);
      },
      error:(error)=>{
        console.log(error);
      }
  
    }
  );
}

 saveUser(){ 
  //this.soumettre=true;
  this.submitted=true;
  console.log(this.utilisateur1);
  /*if(this.utilisateur1.role=="Administrateur d'organisation"){
    this.utilisateur1.role="ORG_ADMIN"
  }
  else if(this.utilisateur1.role=="Manager de procedure")
  {
    this.utilisateur1.role="PROCEDURE_MANAGER"

  }
  else if(this.utilisateur1.role=="super admin")
  {
    this.utilisateur1.role="SUPER_ADMIN"
  }*/
 if(this.utilisateur1.lastName && this.utilisateur1.firstName && this.utilisateur1.email && this.utilisateur1.password){
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
        this.organisations=result.data;
        console.log(this.organisations+"Organisation total");
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
  /*if(this.utilisateur1.role=="Administrateur d'organisation"){
    this.utilisateur1.role="ORG_ADMIN"
  }
  else if(this.utilisateur1.role=="Manager de procedure")
  {
    this.utilisateur1.role="PROCEDURE_MANAGER"

  }
  else if(this.utilisateur1.role=="super admin")
  {
    this.utilisateur1.role="SUPER_ADMIN"
  }*/
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
    console.log(this.utilisateur1)
    this.userService.updateUser(this.utilisateur1,this.utilisateur1.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"User modifier");
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
  this.userToAssign=utilisateur;
  console.log(this.userToAssign);
  console.log(this.user)
  if(this.user?.role=="ORG_ADMIN"){
    this.userToAssign.role="Manager de procedure";
    this.titleAssig="Choisir la procedure";
    this.procedureAdd={};
    this.userService.procedureInfo(this.userToAssign.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        for (let i = 0; i < result.data.length; i++) {
          if (!this.proceduresid.userProcedureIds) {
            this.proceduresid.userProcedureIds = []; // Initialiser si nécessaire
          }
          
          this.proceduresid.userProcedureIds.push(result.data[i].id);
          console.log( this.proceduresid.userProcedureIds); // Affiche l'ID
        }
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }
  if(this.user?.role=="SUPER_ADMIN"){
    this.userToAssign.role="Administrateur d'organisation";
    this.titleAssig="Choisir l'organisation"

    this.userService.userOrgaInfo(this.userToAssign.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data)
        for (let i = 0; i < result.data.length; i++) {
          if (!this.idOrganisationAssign.organisationIds) {
            this.idOrganisationAssign.organisationIds = []; // Initialiser si nécessaire
          }
          
          this.idOrganisationAssign.organisationIds.push(result.data[i].id);
          console.log( this.idOrganisationAssign.organisationIds); // Affiche l'ID
        }
        //console.log( this.proceduresid.userProcedureIds)
      },
      error:(error)=>{
        console.log(error)
      }
    });
   
    
  }
  /*
  if(this.user?.role=="PROCEDURE_MANAGER"){
    this.userToAssign.role="AGENT";
    this.titleAssig="Choisir l'opération"

    this.userService.operationInfo(this.userToAssign.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data)
        for (let i = 0; i < result.data.length; i++) {
          if (!this.operationsIds.operationsIds) {
            this.operationsIds.operationsIds = []; // Initialiser si nécessaire
          }
          
          this.operationsIds.operationsIds.push(result.data[i].id);
          console.log( this.operationsIds.operationsIds); // Affiche l'ID
        }
        //console.log( this.proceduresid.userProcedureIds)
      },
      error:(error)=>{
        console.log(error)
      }
    });
   
    
  }*/
 

 
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
/*  if(this.userToAssign.role=="Administrateur d'organisation"){
    this.userToAssign.role="ORG_ADMIN"
  }
  if(this.userToAssign.role=="Manager de procedure")
  {
    this.userToAssign.role="PROCEDURE_MANAGER"

  }
  if(this.userToAssign.role=="super admin")
  {
    this.userToAssign.role="SUPER_ADMIN"
  }*/
  if(this.userToAssign.role=="ORG_ADMIN" || this.userToAssign.role=="Administrateur d'organisation"){
    this.userToAssign.role="ORG_ADMIN";
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
          this.searchUser()
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
  if (this.userToAssign.role=="PROCEDURE_MANAGER" || this.userToAssign.role=="Manager de procedure"){
    this.procedureTru=true;
    console.log(this.userToAssign)
    this.adminTrue=false;
    this.userToAssign.role="PROCEDURE_MANAGER";
  ///  this.userToAssign.role="PROCEDURE_MANAGER";
    this.confirmationService.confirm({
      message: 'confirmation ajout?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.assignModal=false;
      console.log(this.proceduresid)
      this.userService.updateUser(this.userToAssign,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"User update");
          if(result){
            this.userService.assignerProcedure(this.proceduresid,this.userToAssign.id).subscribe({
              complete:()=>{},
              next:(result)=>{
                console.log(result+"Utilisateur modifié avec succès");
                this.searchUser();
              },
              error:(error)=>{
                console.log(error);
              }
          
            });
            //this.searchUser();

          }
        },
        error:(error)=>{
          console.log(error);
        }
    
      });
     
     
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.assignModal=false;
  
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });
  }
  /*
  else if (this.user?.role=="PROCEDURE_MANAGER" || this.user?.role=="Manager de procedure"){
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
      console.log(this.operationsIds)
    console.log(this.userToAssign)
      this.userService.assigneroperation(this.operationsIds,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Utilisateur modifié avec succès");
          this.searchUser();
        },
        error:(error)=>{
          console.log(error);
        }
    
      });
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
  }*/

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
        this.searchUser();
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
    if(this.user?.role=="SUPER_ADMIN"){
      this.userService.userOrgaInfo(user.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result.data)
          for (let i = 0; i < result.data.length; i++) {
            if (!this.idOrganisationAssign.organisationIds) {
              this.idOrganisationAssign.organisationIds = []; // Initialiser si nécessaire
            }
            console.log( this.idOrganisationAssign.organisationIds); // Affiche l'ID
            this.userService.revoquer(this.idOrganisationAssign,user.id).subscribe({
              complete:()=>{},
              next:(result)=>{
                console.log(result+"Utilisateur modifié avec succès");
                this.searchUser()
              },
              error:(error)=>{
                console.log(error);
              }
          
            })
          }
          //console.log( this.proceduresid.userProcedureIds)
        },
        error:(error)=>{
          console.log(error)
        }
      });
    }
    if(this.user?.role=="ORG_ADMIN"){
      this.procedureAdd={};
      this.userService.procedureInfo(user.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result.data)
          for (let i = 0; i < result.data.length; i++) {
            if (!this.proceduresid.userProcedureIds) {
              console.log(this.proceduresid.userProcedureIds); // Affiche l'ID
              this.proceduresid.userProcedureIds = []; // Initialiser si nécessaire
            }
            this.proceduresid.userProcedureIds = []; // Initialiser si nécessaire

            console.log(this.proceduresid + "ou "+this.proceduresid.userProcedureIds ); // Affiche l'ID
            this.userService.revoquerProc(this.proceduresid,user.id).subscribe({
              complete:()=>{},
              next:(result)=>{
                console.log(result+"droit retiré avec succès");
                this.searchUser()
              },
              error:(error)=>{
                console.log(error);
              }
          
            })
          }
        },
        error:(error)=>{
          console.log(error)
        }
      });
    }
   
  /*  this.userService.updateUser(user,user.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Utilisateur modifié avec succès");
      },
      error:(error)=>{
        console.log(error);
      }
  
    })*/
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
