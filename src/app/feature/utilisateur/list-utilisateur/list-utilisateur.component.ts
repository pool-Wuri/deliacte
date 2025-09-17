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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Table } from 'primeng/table';



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
  }
  this.searchUser();
  this.searchProcedures();

 }

 searchUser():void{
  this.loading=true;
  this.userService.search_users().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.utilisateurs=result.data;
          this.loading=false;
        }
      },
      error:(error)=>{
        setTimeout(() => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.error, life: 3000});
          this.loading=false;
        }, 2000);
       
      }

    });
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
  this.searchOrganisation();
 }

 fermerModal() {
  this.modalVisible = false; // Ferme le modal
}


  onSortChange(event: { value: any; }) {
  let proced = event.value;
  this.operationService.search_Procedure("").subscribe({
    next:(value)=>{
      this.operations=value.data;
     this.operations=this.operations.filter(u=>u.procedureId===proced.id);
      this.operations.reverse();
      for(let i=0;i<this.operations.length;i++){
        this.procedureService.get_Procedure( this.operations[i].procedureId).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.operations[i].procedure=result.data;
        },
          error:(er)=>{
          }
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
        this.procedures=result.data;
      },
      error:(error)=>{
      }
  
    }
  );
}

 saveUser(){ 
  //this.soumettre=true;
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
      this.loading=true;
      this.modalVisible = false; // Ouvre le modal 
      this.addUser=false;
      this.editbutt=false;
      this.utilisateur1.isActive=true;
      this.userService.saveUsers(this.utilisateur1).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result.data){
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Utilisateur créé', life: 3000});
            this.loading=false;
            this.searchUser();
          }
          else{
            this.searchUser();
            this.messageService.add({severity:'error', summary: 'Erreur', detail: result.message, life: 3000});
            this.loading=false;

          } 
        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});
          this.loading=false;

        }
    
      })
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.editbutt=false;
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Annuler l\'ajout', life: 3000});
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
      },
      error:(error)=>{
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
 }

 validerModif(){
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
    this.loading=true;
    this.userService.updateUser(this.utilisateur1,this.utilisateur1.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        this.messageService.add({severity:'success', summary: 'Succes', detail: 'Modification reussie', life: 3000});
        setTimeout(()=>{
          this.loading=false;
          this.searchUser();
        },2000)

      //Actual logic to perform a confirmation
      },
      error:(error)=>{
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Non modifié', life: 3000});

      }
    })
    
      
  },
  reject:()=>{
    this.addUser=false;
  
    this.searchUser();
    this.messageService.add({severity:'error', summary: 'error', detail: 'Echec de la modification', life: 3000});
  }
});
 // Ouvre le modal 

 }

assigne(utilisateur:any){
  this.searchOrganisation();
  this.searchProcedures();
  this.assignModal=true;
  this.userToAssign=utilisateur;
 
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
        }

      },
      error:(error)=>{
        //this.messageService.add({severity:'error', summary: 'error', detail: 'Annuler', life: 3000});

      }
    });
  }
  if(this.user?.role=="SUPER_ADMIN"){
    this.userToAssign.role="Administrateur d'organisation";
    this.titleAssig="Choisir l'organisation"
    this.userService.userOrgaInfo(this.userToAssign.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        for (let i = 0; i < result.data.length; i++) {
          if (!this.idOrganisationAssign.organisationIds) {
            this.idOrganisationAssign.organisationIds = []; // Initialiser si nécessaire
          }
          this.idOrganisationAssign.organisationIds.push(result.data[i].id);
        }
      },
      error:(error)=>{
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Annuler', life: 3000});
        this.loading=false;

      }
    });
   
    
  }
 
 
}

eventModif(){
  if(this.userToAssign.role=="Administrateur d'organisation" || this.userToAssign.role=="ORG_ADMIN" ){
    this.procedureTru=false;
    this.adminTrue=true;
  }
  else if(this.userToAssign.role=="PROCEDURE_MANAGER" || "Manager de procedure"){
    this.procedureTru=true;
    this.adminTrue=false;
  }

}


SaveAssigner(){
  if(this.userToAssign.role=="ORG_ADMIN" || this.userToAssign.role=="Administrateur d'organisation"){
    this.userToAssign.role="ORG_ADMIN";
    this.procedureTru=false;
    this.adminTrue=true;
    this.confirmationService.confirm({
      message: 'Voulez-vous valider l\'action?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.assignModal=false;

      this.userService.assigner(this.idOrganisationAssign,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.searchUser();
          this.loading=false;
          this.messageService.add({severity:'success', summary: 'Succès', detail: 'Utilisateur assigné avec succès', life: 3000});

        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Utilisateur non assigné', life: 3000});
        }
      })
      this.userService.updateUser(this.userToAssign,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
        },
        error:(error)=>{
        }
    
      })
    
    },
    reject:()=>{
    //  this.assignModal=false;
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Assignation echouée', life: 3000});
    }
   });
  }
  if (this.userToAssign.role=="PROCEDURE_MANAGER" || this.userToAssign.role=="Manager de procedure"){
    this.procedureTru=true;
    this.adminTrue=false;
    this.userToAssign.role="PROCEDURE_MANAGER";
  
  this.confirmationService.confirm({
      message: 'Voulez-vous valider l\'action?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.assignModal=false;
      this.loading=true;
   
      if( this.proceduresid.userProcedureIds?.length==0){
        this.userToAssign.role="AGENT";
      }
      this.userService.updateUser(this.userToAssign,this.userToAssign.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.loading=true;
          if(result){
            this.userService.assignerProcedure(this.proceduresid,this.userToAssign.id).subscribe({
              complete:()=>{},
              next:(result)=>{
                this.searchUser();
                this.messageService.add({severity:'success', summary: 'Succès', detail: 'Utilisateur assigné avec succès', life: 3000});
                this.loading=false;
              },
              error:(error)=>{
                this.loading=false;
                this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Utilisateur non assigné ', life: 3000});

              }
          
            });

          }
        },
        error:(error)=>{
          this.assignModal=false;

        }
    
      });
    },
    reject:()=>{
      //this.assignModal=false;
      this.messageService.add({severity:'error', summary: 'error', detail: 'Utilisateur non assigné', life: 3000});
    }
  });
  }

}

fermerAssign(){
  this.searchUser();
  this.assignModal=false;
  this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Annuler', life: 3000});
  this.searchUser();
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
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Utilisateur supprimé', life: 3000});      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Utilisateur non supprimé', life: 3000});
  }
  });
}

revoquerAdmin(utilisateur:User){
  this.searchOrganisation();
  this.searchProcedures();
  this.userToAssign=utilisateur;
 
  this.assignModal=true;
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
        }

      },
      error:(error)=>{
      }
    });
  }
  if(this.user?.role=="SUPER_ADMIN"){
    this.userToAssign.role="Administrateur d'organisation";
    this.titleAssig="Choisir l'organisation"
    this.userService.userOrgaInfo(this.userToAssign.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result.data.length>0){
          for (let i = 0; i < result.data.length; i++) {
            if (!this.idOrganisationAssign.organisationIds) {
              this.idOrganisationAssign.organisationIds = []; // Initialiser si nécessaire
            }
            this.idOrganisationAssign.organisationIds.push(result.data[i].id);
          }
        }
        else{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Aucune organisation assignée', life: 3000});

        }
       
      },
      error:(error)=>{
      }
    });
   
    
  }
}

private async getBase64ImageFromUrl(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur lors du chargement de l'image : ${response.statusText}`);
  }
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

public async generatePDF1(): Promise<void> {
  try {
    // 1. Créer une nouvelle instance de jsPDF.
    const doc = new jsPDF();
    
    // --- DÉBUT DE L'EN-TÊTE ---

    // URL des armoiries (depuis Wikimedia Commons)
    const imageUrl = 'assets/img/armoiriePh.jpeg';
    
    // Charger l'image et la convertir en base64
    const imageBase64 = await this.getBase64ImageFromUrl(imageUrl );

    // Ajouter le nom du pays
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('BURKINA FASO', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Ajouter la devise
    doc.setFontSize(10);
    doc.setFont('helvetica', 'italic');
    doc.text('La Patrie ou la Mort, nous Vaincrons', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });

    // Ajouter l'image des armoiries (largeur de 30mm)
    doc.addImage(imageBase64, 'PNG', doc.internal.pageSize.getWidth() / 2 - 15, 32, 30, 30);

    // --- FIN DE L'EN-TÊTE ---

    // Ajouter le titre principal du document
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Liste des utilisateurs', 14, 80); // Position Y ajustée pour être sous l'en-tête

    // Préparer les données du tableau
    const headers = [['Nom', 'Prénom', 'Mail', 'Rôle']];
    const data = this.utilisateurs.map(user => [
      user.firstName,
      user.lastName,
      user.email,
      user.role
    ]);

    // Créer le tableau
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 85, // Position de départ du tableau ajustée
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 10
      }
    });

    // Sauvegarder le fichier PDF
    doc.save('Liste_user_avec_entete.pdf');

  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
  }
}


generatePDF() {
  // Create a new PDF document.
  const doc = new jsPDF();

  // Add content to the PDF.
  doc.setFontSize(16);
  doc.text('Liste des utilisateurs', 10, 10);
  doc.setFontSize(12);
  /*doc.text(
    'This is a comprehensive guide on generating PDFs with Angular.',
    10,
    20,
  );*/

  // Create a table using `jspdf-autotable`.
  const headers = [['Nom', 'Prenom', 'Mail',"Rôle"]];
  const data = this.utilisateurs.map(user => [
    user.firstName,
    user.lastName,
    user.email,
    user.role
  ]);
  
	autoTable(doc, {
    head: headers,
    body: data,
    startY: 30, // Adjust the `startY` position as needed.
  });

  
  // Save the PDF.
  doc.save('Liste_user.pdf');
}

onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

exporterExel(){

}


}

