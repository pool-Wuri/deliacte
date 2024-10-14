import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';

@Component({
  selector: 'app-list-operation',
  templateUrl: './list-operation.component.html',
  styleUrls: ['./list-operation.component.scss']
})
export class ListOperationComponent {
  addboutton:boolean=false;
  addUser:boolean=false;
  editbutt:boolean=false;
  title:string="";
  typeoperations=new Array <TypeOperation>();
  operations=new Array <Operation>();
operation=new Operation;
procedures=new Array<Procedure>();
procedure=new Procedure;
user: User | null = null;
addchamp:boolean=false;
types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));

constructor(
  private TypeOperationService: TypeOperationService,
  private operationService:OperationService,
  private procedureService:ProcedureService,
  private confirmationService:ConfirmationService,
  private messageService:MessageService,
  private router:Router,
  


){

}

ngOnInit(): void {  
 // this.searchtypeoperation();
 const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    console.log(this.user)
  }
  this.searchOperation();
  this.searchtypeoperation();
}



searchtypeoperation():void{
  this.TypeOperationService.search_Typeoperation().subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result+"Type opération total");
      this.typeoperations=result;
    },
    error:(error)=>{
      console.log(error);
    }

  })

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

 searchOperation():void{
    this.operationService.search_Procedure("").subscribe({
      next:(value)=>{
        this.operations=value;
        console.log(this.operations);
     
      },
      complete:()=>{},
      error:(err)=>{}
    })
   
  }
ajouter(){
  this.addboutton=true;
    this.addUser=true;
    this.editbutt=false;
    this.title="Ajouter";
    this.operation={};
    this.search_Procedure();
}

fermerModal(){
  this.addboutton=false;
  this.addUser=false;
  this.editbutt=false;
  this.addchamp=false
 }


 saveOperation(){
  this.operation.isActive=true;
  this.operationService.saveProcedure(this.operation).subscribe({
    next:(value)=>{
      console.log(value)
      this.addboutton=false;

    },
    complete:()=>{},
    error:(erreur)=>{
      console.log(erreur)
    }
  })
 }

 edit(operation:Operation){
  this.addboutton = true; // Ouvre le modal
  this.addUser=false;
  this.editbutt=true;
  this.title="Modifier";
  this.operation=operation;
  this.search_Procedure();
  console.log(this.operation)
 }

 deleteOperation(operation:Operation){
  this.confirmationService.confirm({
     message: 'Voulez-vous vraiment supprimer cette opération?',
     header: 'Suppression',
     acceptLabel:'Oui',
     rejectLabel:'Non',
     icon: 'pi pi-exclamation-triangle',
     acceptButtonStyleClass:'acceptButton',
   accept: () => {
     this.operationService.delete_operation(operation.id).subscribe({
       complete:()=>{},
       next:(result)=>{
        this.searchOperation();
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

 detailsOperation(operation:Operation){
  this.router.navigate(['/deliacte/operation/details',operation.id])
  }

champ=new ChampOperation;
  ajouterChamp(operation:any){
    this.addchamp=true
    this.title="ajouter";
    this.champ={};
    this.champ.operationId=operation.id;
  }

  saveChamp(){
    this.operationService.ajouterChamp(this.champ).subscribe({
      next:(value)=>{
        console.log(value)
        this.addchamp=false;
      },
      complete:()=>{},
      error:(err)=>{
        console.log(err)
      }
    })
  }

}
