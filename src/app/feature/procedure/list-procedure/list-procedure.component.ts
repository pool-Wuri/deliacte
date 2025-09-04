import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-list-procedure',
  templateUrl: './list-procedure.component.html',
  styleUrls: ['./list-procedure.component.scss']
})
export class ListProcedureComponent {
addboutton:boolean=false;
addUser:boolean=false;
editbutt:boolean=false;
title:string="";
procedures=new Array <Procedure>();
proceduresBrouillon=new Array <Procedure>();
proceduresArchiv=new Array <Procedure>();
proceduresPublie=new Array <Procedure>();

organisations=new Array <Organisation>();
statuts:any[]=[{value:"ARCHIVED",label:"Archivée"},{value:"DRAFT",label:"Brouillon"},{value:"PUBLISHED",label:"Publiée"}]
statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération
procedure=new Procedure;
  ProcedureStatus: any;
  user: User | null = null;
  ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
  SUPER_ADMIN= 'SUPER_ADMIN';
  PROCEDURE_MANAGER='PROCEDURE_MANAGER';
  submitted: boolean=false;
  loading:boolean=false;
  constructor(
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private procedureService:ProcedureService,
    private organisationService:OrganisationService,
    private userService:UtilisateurService,
    private operationService:OperationService,

  ){}

  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }

  ngOnInit(): void {
    this.search_Procedure();
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user)
    }
   }

   search_Procedure():void{
    //this.loading=true;
    this.procedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          console.log(result+"procedure total");
          this.procedures=result.data;
          console.log(this.procedures)
          this.proceduresBrouillon=this.procedures.filter(u=>u.status=="DRAFT");
          this.proceduresArchiv=this.procedures.filter(u=>u.status=="ARCHIVED");
          this.proceduresPublie=this.procedures.filter(u=>u.status=="PUBLISHED");
          this.procedures=this.procedures.filter(u=>u.status!=="ARCHIVED");
          this.loading=false;
        }
      },
      error:(error)=>{
        console.log(error);
        this.loading=false;
        this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});

      }
  
    })
   }

   ajouter(){
    this.procedure={};
    this.addboutton=true;
    this.addUser=true;
    this.editbutt=false;
    this.title="Formulaire d'ajout d'une procedure";
    this.procedure.status="DRAFT";
    this.searchOrganisation();
   }

   fermerModal(){
    this.addboutton=false;
    this.addUser=false;
    this.editbutt=false;
    this.loading=false;
   }

   saveProcedure(){ 
   // this.soumettre=true;
   this.submitted=true;
   console.log(this.procedure)
   if(this.procedure.name && this.procedure.description && this.procedure.organisationId){
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cette procedure?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.addboutton = false; // Ouvre le modal 
        this.addUser=false;
        this.editbutt=false;
        this.procedure.isActive=true;
        this.procedureService.saveProcedure(this.procedure).subscribe({
          complete:()=>{},
          next:(result)=>{
            if(result){
              this.loading=false;
              console.log(result+"User add");
              this.search_Procedure();
              this.messageService.add({severity:'success', summary: 'Succès', detail: 'Procedure enregistrée avec succès', life: 3000});
            }
          
          },
          error:(error)=>{
            console.log(error);
            this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Procedure non enregistrée', life: 3000});
            this.loading=false;
          }
      
        })        
      },
      reject:()=>{
        this.addboutton = true; // Ouvre le modal 
        this.addUser=true;
        this.editbutt=false;
        this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Annuler l\'enregistrement', life: 3000});
        this.loading=false;
      }
    });
   }
  
   }
  
  searchOrganisation(){
    this.userService.userOrgaInfo(this.user?.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        this.organisations=result.data;
        console.log(this.organisations)
      },
      error:(error)=>{
        console.log(error)
      }
    });
  /*  this.organisationService.search_Organisations("").subscribe(
      {
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Organisation total");
          this.organisations=result.data;
        },
        error:(error)=>{
          console.log(error);
        }
    
      }
    )*/
  }
  
   editProcedure(procedure:Procedure){
    this.searchOrganisation();
    this.addboutton = true; // Ouvre le modal
    this.procedure=procedure;
    this.addUser=false;
    this.editbutt=true;
    this.title="Modifier la procedure";
    console.log(this.procedure)
   }
  
   validerModif(){
    console.log(this.procedure)
    this.confirmationService.confirm({
      message: 'Voulez-vous la modifier?',
      header: 'Modification',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.addboutton = false; // Ouvre le modal 
      this.addUser=false;
      this.editbutt=false;
      this.loading=true;
      this.procedureService.updateprocedure(this.procedure,this.procedure.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result){
            this.messageService.add({severity:'success', summary: 'Succes', detail: 'Modification reussie', life: 3000});
            setTimeout(()=>{
              this.loading=false;
              this.search_Procedure();
            },2000)
          }
          console.log(result+"procedure add");
        },
        error:(error)=>{
          console.log(error);
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Modification non reussie', life: 3000});
          this.loading=false;
        }
    
      })
    },
    reject:()=>{
      this.addUser=false;
     // this.editbutt=false;
     // this.addboutton = false;
      this.loading=false;
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Annuler l\'enregistrement', life: 3000});
    }
  });
   // Ouvre le modal 
  
   }
  
  detailsProcedure(procedure:Procedure){
  this.router.navigate(['/deliacte/procedure/details',procedure.id])
  }
  
  deleteProcedure(procedure:Procedure){
   this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette procedure?',
      header: 'Suppression',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.procedureService.delete_procedure(procedure.id).subscribe({
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

  afficherChamp(procedure:Procedure){
    this.router.navigate(['/deliacte/procedure/details',procedure.id])

  }

  depublier(procedure:Procedure){
    console.log(procedure)
  
      this.confirmationService.confirm({
        message: 'Voulez-vous dépublier cette procedure?',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        header: 'Publication',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        console.log(procedure.id)
        procedure.status = "ARCHIVED" // Assigner la clé comme chaîne
  
        this.procedureService.updateprocedure(procedure,procedure.id).subscribe({
          complete:()=>{},
          next:(result)=>{
            console.log(result+"procedure dépublié");
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

  publier(procedure:Procedure){
    console.log(procedure)
    this.operationService.get_Operation(procedure.id).subscribe({
      next:(value)=>{
        console.log(value)
        if(value.data.length<=0){
          this.messageService.add({severity:'error', summary: 'Publication pas possible', detail: 'Aucune opération disponible pour cette procedure', life: 3000});
        }
        else{
          if(procedure.status!="PUBLISHED")
            {
              this.confirmationService.confirm({
                message: 'Voulez-vous publier cette procedure',
                acceptLabel:'Oui',
                rejectLabel:'Non',
                header: 'Publication',
                icon: 'pi pi-exclamation-triangle',
                acceptButtonStyleClass:'acceptButton',
              accept: () => {
                this.loading=true;
                console.log(procedure)
                console.log(procedure.id)
                procedure.status = "PUBLISHED" // Assigner la clé comme chaîne
                this.procedureService.updateprocedure(procedure,procedure.id).subscribe({
                  complete:()=>{},
                  next:(result)=>{
                    if(result){
                      this.messageService.add({severity:'success', summary: 'Succes', detail: 'Procedure publiée', life: 3000});
                      setTimeout(()=>{
                        this.loading=false;
                        this.search_Procedure();
                      },2000)
                    }
                  },
                  error:(error)=>{
                    console.log(error);
                    this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Procedure non publiée', life: 3000});
                    this.loading=false;
                  }
              
                })
               // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});      
              },
              reject:()=>{
                this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Annuler la publication', life: 3000});
              }
            });
            }
            else{
              this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Procedure déja publiée', life: 3000});
        
            }
        }
     
      },
      complete:()=>{},
      error:(err)=>{}
    })
   
   
  }

   getStatusKey(status: ProcedureStatus): string {
    return Object.keys(ProcedureStatus).find(key => ProcedureStatus[key as keyof typeof ProcedureStatus] === status) || 'Statut inconnu';
  }


  generatePDF() {
    // Create a new PDF document.
    const doc = new jsPDF();

    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Liste des procedures', 10, 10);
    doc.setFontSize(12);
    /*doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );*/
  
    // Create a table using `jspdf-autotable`.
    const headers = [['Nom', 'Organisation','Statut']];
    const data = this.procedures.map(procedure => [
      procedure.name ?? '',
      procedure.organisation.name ?? '',
      procedure.status ?? ''
    ]);
    
    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30, // Adjust the `startY` position as needed.
    });
  
    
    // Save the PDF.
    doc.save('Liste_procedure.pdf');
  }
}
