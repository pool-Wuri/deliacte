import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { OperationAssign, User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

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
adddoctype:boolean=false;
champ=new ChampOperation;
loading:boolean=false;
types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));
disable:boolean=false;;
selectedOperation=new Array <Operation>();
utilisateurs=new Array <User>()
usergroup=new Array <User>()
usergroup1=new Array <User>()
proced:any;

listeUser:boolean=false;
list1: any[] | undefined;

list2: any[] | undefined;
  sortOrder!: number;
  operationsIds=new OperationAssign;

  sortField!: string;
  procedurechoisi=new Procedure;
  submitted: boolean=false;

constructor(
  private TypeOperationService: TypeOperationService,
  private operationService:OperationService,
  private procedureService:ProcedureService,
  private confirmationService:ConfirmationService,
  private messageService:MessageService,
  private router:Router,
  private userService:UtilisateurService,
  


){

}

ngOnInit(): void {   
 const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
  }
  this.searchtypeoperation();
  this.search_Procedure();
}

searchUser(){
  this.userService.allUser().subscribe({
    complete:()=>{},
    next:(result)=>{
      this.utilisateurs=result.data;
    },
    error:(error)=>{
    }

  })
}


searchtypeoperation():void{
  this.TypeOperationService.search_Typeoperation().subscribe({
    complete:()=>{},
    next:(result)=>{
      this.typeoperations=result.data;
    },
    error:(error)=>{
    }

  })

 }
 
 search_Procedure():void{
  this.procedureService.search_Procedure().subscribe({
    complete:()=>{},
    next:(result)=>{
      this.procedures=result.data;
    },
    error:(error)=>{
    }

  })
 }

 getProcedure(id?:number){
  this.procedureService.get_Procedure(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      },
    error:(er)=>{
    }
  })
}

 searchOperation(procedureId:number):void{
    this.operationService.get_Operation(procedureId).subscribe({
      next:(value)=>{
        this.operations=value;
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
          this.operationService.get_Procedure(this.operations[i].id).subscribe({
            complete:()=>{},
            next:(result)=>{
            }
          }
        );
        }
     
      },
      complete:()=>{},
      error:(err)=>{}
    })
   
  }

  getOperation(operationId:any):string{
    this.operationService.get_Procedure(operationId).subscribe({
      complete:()=>{},
      next:(result)=>{
      }
    }
  );
    return "";
  }

  ajouter(){
    if(this.procedurechoisi.id){
      this.addboutton=true;
      this.addUser=true;
      this.editbutt=false;
      this.title="Formulaire d'ajout d'une opération";
      this.operation={};
      this.operation.procedureId=this.procedurechoisi.id;
      this.search_Procedure();
      this.submitted=false;
    }
    else{
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Veuillez choisir la procedure d\'abord', life: 3000});

    }
  
  }

fermerModal(){
  this.addboutton=false;
  this.addUser=false;
  this.editbutt=false;
  this.addchamp=false;
  this.adddoctype=false;
  this.listeUser=false;
  this.loading=false;
 }

 saveOperation(){
  this.operation.isActive=false;
  this.submitted=true;
  if(this.operation.typeOperationId){
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cette opération?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.operationService.saveProcedure(this.operation).subscribe({
        next:(value)=>{
          if(value){
            this.operationService.search_Procedure("").subscribe({
              next:(value)=>{
                this.operations=value.data;
               this.operations=this.operations.filter(u=>u.procedureId===this.procedurechoisi.id);
                this.operations.reverse();
                for(let i=0;i<this.operations.length;i++){
                  this.procedureService.get_Procedure( this.operations[i].procedureId).subscribe({
                    complete:()=>{},
                    next:(result)=>{
                      this.operations[i].procedure=result.data;
              },
                    error:(er)=>{

                    }
                  })
                }
             
              },
              complete:()=>{},
              error:(err)=>{}
            });
            setTimeout(() => {
              this.loading=false;
              this.onSortChange({ value: this.proced });
              this.messageService.add({severity:'success', summary: 'Reussie', detail: 'Operation créée avec succès', life: 3000});        
            }, 2000);
            this.addboutton=false;
          }    
        },
        complete:()=>{},
        error:(erreur)=>{
        }
      })
    },
    reject:()=>{
      //this.addboutton=false;
      this.addboutton=true;
      this.addUser=true;
      this.editbutt=false;
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Opération non enregistrée', life: 3000});
      this.loading=false;
    }

    });
  }
  
 }

 saveEdit(){
  this.operation.isActive=false;
  this.confirmationService.confirm({
    message: 'Voulez-vous modifier cette opération?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.operationService.updateprocedure(this.operation,this.operation.id).subscribe({
        next:(value)=>{
          this.addboutton=false;
          this.editbutt=false;   
          setTimeout(() => {
            this.loading=false;
            this.onSortChange({ value: this.proced });
            this.messageService.add({severity:'success', summary: 'Modification', detail: 'Operation modifiée avec succès', life: 3000});        
          }, 2000);
        },
        complete:()=>{},
        error:(erreur)=>{
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Modification', detail: 'Operation non modifiée', life: 3000});        
        }
      })        
    },
    reject:()=>{
      //this.addboutton=false;
      this.messageService.add({severity:'error', summary: 'Modification', detail: ' Annuler la modification', life: 3000});
    }
  });
 }

 edit(operation:Operation){
  this.addboutton = true; // Ouvre le modal
  this.addUser=false;
  this.editbutt=true;
  this.title="Modifier opération";
  this.operation=operation;
  this.search_Procedure();
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
    this.loading=true;
     this.operationService.delete_operation(operation.id).subscribe({
       complete:()=>{},
       next:(result)=>{
   
        setTimeout(() => {
          this.loading=false;
          this.messageService.add({severity:'success', summary: 'Suppression', detail: 'Opération supprimée', life: 3000});      
          this.onSortChange({ value: this.proced });

        }, 2000);
       },
       error:(error)=>{
         this.messageService.add({severity:'error', summary: 'Suppression', detail: 'Opération non supprimée', life: 3000});      
        this.loading=false;
       }
   
     })
   },
   reject:()=>{
     this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Suppression annulée', life: 3000});
   }
 });
 }

 detailsOperation(operation:Operation){
  this.router.navigate(['/deliacte/operation/details',operation.id])
  }

  ajouterChamp(operation:any){
    this.addchamp=true
    this.title="Ajouter champ";
    this.champ={};
    this.champ.operationId=operation.id;
  }

  ajouterTypeDoc(operation:any){
    this.adddoctype=true
    this.title="Ajouter type document";
   
  }

  saveChamp(){
    this.confirmationService.confirm({
      message: 'Voulez-vous sauvegarder ce champ?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.operationService.ajouterChamp(this.champ).subscribe({
        next:(value)=>{
          this.addchamp=false;
        },
        complete:()=>{},
        error:(err)=>{
        }
      })
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ enrégistré', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.addboutton=false;
      this.messageService.add({severity:'error', summary: 'Echec', detail: 'Champ non enrégistré', life: 3000});
    }
    });
   
  }


  onSortChange(event: { value: any; }) {
     this.proced = event.value;
    this.operationService.get_Operation(this.proced.id).subscribe({
      next:(value)=>{
        this.operations=value.data;
      
        for(let i=0;i<this.operations.length;i++){
          this.procedureService.get_Procedure( this.operations[i].procedureId).subscribe({
            complete:()=>{},
            next:(result)=>{
              this.operations[i].procedure=result.data;
                },
            error:(er)=>{
            }
          });
        if(this.operations[i].operationNextId){
          this.operationService.get_Procedure(this.operations[i].operationNextId).subscribe({
            complete:()=>{},
            next:(result)=>{
              this.operations[i].operationNextId=result.data;
            }
          }
        );
        }
        else
        {
          this.operations[i].operationNextId="";

        }
        if(this.operations[i].operationPreviousId){
          this.operationService.get_Procedure(this.operations[i].operationPreviousId).subscribe({
            complete:()=>{},
            next:(result)=>{
              this.operations[i].operationPreviousId=result.data;
            }
          }
        );
        }
        else
        {
          this.operations[i].operationPreviousId="";

        }
        }
      },
      complete:()=>{},
      error:(err)=>{}
    });
    }

  groupeUser(){
   

    if (!this.selectedOperation || this.selectedOperation.length === 0) {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: ' Sélectionner d\'abord une opération', life: 3000});
      this.disable=true;
    }
    else{
      this.userService.userOrganisation().subscribe({
        complete:()=>{},
        next:(result)=>{
          this.usergroup1=result.data;
          if(this.usergroup1){
            this.operationService.searchResponsable(this.selectedOperation[0].id || 0).subscribe({
              next:(result)=>{
                this.usergroup=result.data;
                if(this.usergroup){
                  this.usergroup1 = this.usergroup1.filter(u => !this.usergroup.some(group => group.id === u.id));
                 
                }
              
              },
              complete:()=>{},
              error:(error)=>{
              }
            })
          }
       
        },
        error:(error)=>{
        }
      });
      this.operationsIds={};
      this.listeUser=true;
    }   
   
  }

  fermer(){
    this.listeUser=false;

  }


  userSelet(){
    this.listeUser=false;
    this.operationsIds.operationsIds = []; // Initialiser si nécessaire    
    for(let i=0;i<this.usergroup.length;i++){
      if(this.usergroup[i].id){
      this.userService.operationInfo(this.usergroup[i].id).subscribe({
        complete:()=>{},
        next:(result)=>{
          for(let i=0;i<result.data.length;i++){
            this.operationsIds.operationsIds ?.push(result.data[i].id); // Initialiser si nécessaire
          }
          this.operationsIds.operationsIds?.push(this.selectedOperation[0].id || 0);
          this.userService.assigneroperation(this.operationsIds,this.usergroup[i].id).subscribe({
            complete:()=>{},
            next:(result)=>{
             // this.searchUser();
            },
            error:(error)=>{
            }
        
          });

        },
        error:(error)=>{
        }
      });
       
      }
  
      
   
    }
  }

  generatePDF() {
    // Create a new PDF document.
    const doc = new jsPDF();
  
    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Liste des opérations', 10, 10);
    doc.setFontSize(12);
    /*doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );*/
  
    // Create a table using `jspdf-autotable`.
    const headers = [['Nom', 'Description', 'Suivant',"Précédent"]];
    const data = this.operations.map(operation => [
      operation.name,
      operation.description,
      operation.operationNextId,
      operation.operationPreviousId
    ]);
    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30, // Adjust the `startY` position as needed.
    });
  
    
    // Save the PDF.
    doc.save('Liste_user.pdf');
  }
  
}
