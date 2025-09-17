import { Component, OnInit } from '@angular/core';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { Router } from '@angular/router';
import { Modal } from 'flowbite';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';


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
  submitted: boolean=false;
  loading:boolean=false;
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
    this.loading=true;
    this.TypeOperationService.search_Typeoperation().subscribe({
      complete:()=>{},
      next:(result)=>{
        this.typeoperations=result.data;
        this.loading=false;
      },
      error:(error)=>{
        setTimeout(() => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.error, life: 3000});
          this.loading=false;
        }, 2000);
      }
  
    })

   }

   ajouter(){
    this.modalVisible = true;
    this.addTypeOperation = true;
    this.editbutt = false;
    this.title = 'Formulaire d\'ajout d\'un type d\'opération ';
    this.submitted = false;

   }

   fermerModal() {
    this.modalVisible = false;
  }

  saveTypeoperation(){
    this.submitted = true;
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
      this.loading=true;
      this.TypeOperationService.saveTypeoperation(this.typeoperation1).subscribe({
        complete:()=>{},
        next:(result)=>{
          setTimeout(()=>{
            this.searchtypeoperation();
            this.loading=false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Type opération enregistré', life: 3000});

            },2000)
        },
        error:(error)=>{
        }
    
      })
        
    },
    reject:()=>{
      this.modalVisible = true; // Ouvre le modal 
      this.addTypeOperation=true; // a chnager
      this.editbutt=false; 
      this.messageService.add({severity:'error', summary: 'Annumer', detail: 'Opération annulée', life: 3000});
    }
  });
    }

  }

  detailsTypeoperation(typeoperation:TypeOperation){
    this.router.navigate(['/deliacte/type-operation/details', typeoperation.id]);
  }

  editTypeoperation(typeoperation:TypeOperation){
    this.typeoperation1 = typeoperation;
    this.modalVisible = true;
    this.addTypeOperation = false;
    this.editbutt = true;
    this.title = 'Formulaire de modification d\'un type d\'opération';

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
        this.loading=true;
        this.TypeOperationService.delete_Typeoperation(typeoperation.id).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.messageService.add({severity:'success', summary: 'Supprimé', detail: 'Suppression reussie', life: 3000});      
            setTimeout(()=>{
              this.searchtypeoperation();
              this.loading=false;
              },2000)
             
          },
          error:(error)=>{
            this.loading=false;
            this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Opération non supprimée', life: 3000});
          }
      
        })
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Annulation de l\'opération reussie', life: 3000});
      }
  });

  }

  validerModif(){

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
      this.loading=true;
     // this.typeoperation1.isActive=true;
      this.TypeOperationService.updateTypeoperation(this.typeoperation1,this.typeoperation1.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          setTimeout(()=>{
            this.searchtypeoperation();
            this.loading=false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Type opération enregistré', life: 3000});

            },2000)
        },
        error:(error)=>{
        }
    
      })
    
        
    },
    reject:()=>{
      this.addTypeOperation=false;
      this.editbutt=true; // a changer
      this.modalVisible = true; // a changer
      this.searchtypeoperation();
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });

  }

  generatePDF() {
    // Create a new PDF document.
    const doc = new jsPDF();
  
    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Liste des Operations', 10, 10);
    doc.setFontSize(12);
    /*doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );*/
  
    // Create a table using `jspdf-autotable`.
    const headers = [['Nom', 'Desciption']];
    const data = this.typeoperations.map(type => [
      type.name ?? '',
      type.description ?? ''
    ]);
    
    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30, // Adjust the `startY` position as needed.
    });
  
    
    // Save the PDF.
    doc.save('Liste_operation.pdf');
  }
  
}
