import { Component, OnInit } from '@angular/core';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { Router } from '@angular/router';
import { Modal } from 'flowbite';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';


@Component({
  selector: 'app-list-type-operation',
  templateUrl: './list-type-operation.component.html',
  styleUrls: ['./list-type-operation.component.scss']
})
export class ListTypeOperationComponent implements OnInit {


  modal: Modal | undefined;
  addTypeOperation: boolean = false;
  editbutt: boolean = false;
  addtypeOperation: any;
  title:string = "";
  typeoperations=new Array <TypeOperation>()
  typeoperation1 = new TypeOperation;
  typeoperationToAssign = new TypeOperation();
  typeoperationselect: any[] | undefined;
  isModalOpen: boolean = false;
  assignModal:boolean=false;
  modalVisible: boolean = false;
  soumettre:boolean=false;

  constructor(
    private TypeOperationService: TypeOperationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.searchtypeoperation(); 
   }

   searchtypeoperation():void{
    this.TypeOperationService.search_Typeoperation().subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Type opération total");
        this.typeoperations=result.data;
      },
      error:(error)=>{
        console.log(error);
      }
  
    })

   }

   ajouter(){
    this.modalVisible = true;
    this.addTypeOperation = true;
    this.editbutt = false;
    this.title = 'Formulaire d\'ajout d\'un type d\'opération ';
   }

   fermerModal() {
    this.modalVisible = false;
  }

  saveTypeoperation(){

    this.soumettre=true;
    console.log(this.typeoperation1)
    if(this.typeoperation1.name && this.typeoperation1.description)
    {
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cet type d\'opération?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.modalVisible = false; // Ouvre le modal 
      this.addTypeOperation=false;
      this.editbutt=false;
      console.log(this.typeoperation1)
      this.TypeOperationService.saveTypeoperation(this.typeoperation1).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Type opération add");
          this.searchtypeoperation();
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Type opération enregistré', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.modalVisible = false; // Ouvre le modal 
      this.addTypeOperation=false;
      this.editbutt=false;
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });
    }

  }

  detailsTypeoperation(typeoperation:TypeOperation){
    this.router.navigate(['/deliacte/type-operation/details', typeoperation.id]);
  }

  editTypeoperation(typeoperation:TypeOperation){

    this.modalVisible = true;
    this.typeoperation1 = typeoperation;
    this.addTypeOperation = false;
    this.editbutt = true;
    this.title = 'Formulaire de modification d\'un type d\'opération';
    console.log(this.typeoperation1);

  }

  deleteTypeoperation(typeoperation:TypeOperation){

    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cet type d\'opération?',
      header: 'Suppression',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.assignModal=false;
      this.TypeOperationService.delete_Typeoperation(typeoperation.id).subscribe({
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

  validerModif(){

    console.log(this.typeoperation1)
    this.confirmationService.confirm({
      message: 'Voulez-vous modifier cet type d\'opération?',
      header: 'Modification',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.modalVisible = false; // Ouvre le modal 
      this.addTypeOperation=false;
      this.editbutt=false;
     // this.typeoperation1.isActive=true;
      this.TypeOperationService.updateTypeoperation(this.typeoperation1,this.typeoperation1.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Type opération add");
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.addTypeOperation=false;
    this.editbutt=false;
    this.modalVisible = false;
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });

  }
}
