import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';

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
organisations=new Array <Organisation>();
statuts:any[]=[{value:"ARCHIVED",label:"Archivée"},{value:"DRAFT",label:"Brouillon"},{value:"PUBLISHED",label:"Publiée"}]
statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération

procedure=new Procedure;
  constructor(
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private procedureService:ProcedureService,
    private organisationService:OrganisationService
  ){}

  ngOnInit(): void {
    this.search_Procedure();
   }

   search_Procedure():void{
    this.procedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"procedure total");
        this.procedures=result;
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
   }

   ajouter(){
    this.procedure={};
    this.addboutton=true;
    this.addUser=true;
    this.editbutt=false;
    this.title="Ajouter";
    this.searchOrganisation();
   }

   fermerModal(){
    this.addboutton=false;
    this.addUser=false;
    this.editbutt=false;
   }

   saveProcedure(){ 
   // this.soumettre=true;
   console.log(this.procedure)
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cette procedure?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.addboutton = false; // Ouvre le modal 
      this.addUser=false;
      this.editbutt=false;
      this.procedure.isActive=true;
      this.procedureService.saveProcedure(this.procedure).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"User add");
          this.search_Procedure();
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.addboutton = false; // Ouvre le modal 
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
  
   editProcedure(procedure:Procedure){
    this.searchOrganisation();
    this.addboutton = true; // Ouvre le modal
    this.procedure=procedure;
    this.addUser=false;
    this.editbutt=true;
    this.title="Modifier";
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
      this.procedureService.updateprocedure(this.procedure,this.procedure.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"procedure add");
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
    this.addboutton = false;
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
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



  publier(procedure:Procedure){
    console.log(procedure)
    this.confirmationService.confirm({
      message: 'Voulez-vous publier cette procedure',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
     // procedure.status=this.ProcedureStatus.PUBLISHED;
      console.log(this.procedure.id)
      this.procedureService.updateProcedureStatus(this.procedure.status,this.procedure.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"procedure publié");
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
}
