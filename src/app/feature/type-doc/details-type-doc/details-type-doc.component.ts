import { Component } from '@angular/core';
import { TypeDoc } from 'src/app/core/models/typeDoc-model';
import { TypeDocService } from 'src/app/core/services/type-doc.service';
import { Route, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { Procedure, DemandeProcedur } from 'src/app/core/models/procedure.model';
import { environment } from 'src/environnements/environment';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-details-type-doc',
  templateUrl: './details-type-doc.component.html',
  styleUrls: ['./details-type-doc.component.scss']
})
export class DetailsTypeDocComponent {

  id:number | undefined;
  Typedoc=new TypeDoc;
  user: User | null = null;
  procedure=new Procedure;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;
  demandeFor= new Array<DemandeProcedur>();
  demandeInfos=new DemandeProcedur;
  selectedOption: string | null = null; // Option sélectionnée
  displayPosition!: boolean;

  imageUrl!: string 
  TEXT="TEXT";
  CHECKBOX="CHECKBOX"
  TEXTAREA="TEXTAREA"
  RADIO="RADIO"
  SELECT="SELECT"
  FILE="FILE"
  IMAGE="IMAGE"
  PDF="PDF"
  PASSWORD="PASSWORD"
  EMAIL="EMAIL"
  NUMBER="NUMBER"
  RANGE="RANGE"
  DATE="DATE"
  TIME="TIME"
  DATETIME_LOCAL="DATETIME_LOCAL"
  MONTH="MONTH"
  WEEK="WEEK"
  SEARCH="SEARCH"
  HIDDEN="HIDDEN";
  idOperationNow!:number;

  dossier:any;

  events1!: any[];
    
    events2!: any[];
    data1:any;
    indexchamp!:number;
    numDossier!:number;
    indexSave:number[]=[];
    traitement:any;

  constructor(private route:ActivatedRoute,
      private typeDocService:TypeDocService,
      private procedureService:ProcedureService,
      private operationService:OperationService,
      private userService:UtilisateurService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,

  ){}

  ngOnInit():void{
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user)
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
     this.getDossier(this.id)
    /// this.getProcedure(this.id)

     }
    );

    this.events2 = [
      "2020", "2021", "2022", "2023"
  ];

  }

  getDossier(id?:number){
    if(this.user?.role==="CITOYEN"){
      this.typeDocService.getDossierPour(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result.data.traitement+" total");
         this.dossier=result.data.dossiers;
         console.log(this.dossier);
         this.getOperation(this.dossier[0].champOperation.operationId)
        },
        error:(error)=>{
          console.log(error);
        }
    
      });
    }
   else if(this.user?.role!=="CITOYEN"){
    this.traitement={}
    this.typeDocService.getDossierPour(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data+" total");
       this.dossier=result.data.dossiers;
       console.log(this.dossier)
       this.idOperationNow=this.dossier[0].champOperation.operationId;
       console.log(this.idOperationNow)
       this.userService.operationInfo(this.user?.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(this.idOperationNow);
       /*   this.operationService.get_OperationNext(this.idOperationNow).subscribe({
            next:(result)=>{
              console.log(result.data)
           
            },
            complete:()=>{},
            error:(error)=>{
              console.log(error)
            }
          });*/
          console.log(result.data);
         if(result.data[0].operationPreviousId==this.idOperationNow){
            this.operationService.get_ChampByOperation(result.data[0].id).subscribe({
              next:(result)=>{
                console.log(result)
               // this.numDossier=result.message;
                this.champs=result.data;
                console.log(this.champs)
                this.traitement.operationId=this.champs[0].operationId;
                this.demandeFor = this.champs.map(champ => ({
                  name: '',
                  champOperationId: champ.id // ou une autre logique
                }));
                console.log('Champs:', this.champs);
                console.log('DemandeFor:', this.demandeFor);
                console.log('DemandeFor:', this.traitement);
                console.log('Champs:', this.champs);
                //console.log('DemandeFor:', this.demandeFor);
              },
              complete:()=>{},
              error:(error)=>{
                console.log(error)
              }
            });
          }
       
        },
        error:(error)=>{
          console.log(error);
        }
      });
      },
      error:(error)=>{
        console.log(error);
      }
  
    });
   }
  

  }


  getOperation(id?:number){
    this.operationService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data)
      this.procedureService.get_Procedure(result.data.procedureId).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result.data);
          this.operationService.get_Operation(result.data.id).subscribe({
            complete:()=>{},
            next:(result)=>{
              console.log(result.data);
              this.operations=result.data;
              this.events2= this.operations.map(operation => ({
                status: operation.name,
                icon:PrimeIcons.CHECK,
                color: '#607D8B'
              }));
              console.log(this.events2)
            },
            error:(error)=>{
              console.log(error)
            }
          });
        },

          error:(error)=>{
            console.log(error)
          }

      })
       
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
 
  validerDossier(numDossier:number){
    console.log(numDossier);
    this.traitement.commentaire="dossier validé";
    this.traitement.isActive=true;
    this.traitement.numDossier=numDossier;
    this.typeDocService.getDossierPour(numDossier).subscribe({
      complete:()=>{},
      next:(result)=>{
       console.log(result.data)
      },
      error:(error)=>{
        console.log(error);
      }
  
    });
    this.indexSave.sort((a, b) => b - a);
    for(let i=0;i<this.indexSave.length;i++){
      this.demandeFor.splice(this.indexSave[i],1);
    }
    
      this.data1 = {
        traitement: this.traitement,
        dossiers: this.demandeFor
    }
   
    console.log(this.data1)  
    console.log(numDossier)
    //const data: FormData = new FormData();
   this.confirmationService.confirm({
      message: 'Voulez-vous vraiment soumettre ce dossier?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {

      this.procedureService.saveDemande(this.data1,numDossier).subscribe({
        next:(result)=>{
          console.log(result.data);
        },
        complete:()=>{
    
        },
        error:(error)=>{
          console.log(error);
        }
      });
     /* this.procedureService.get_Procedure(this.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result)
          this.procedure=result.data;
          console.log(this.procedure)
          this.procedureService.get_Champ(this.id).subscribe({
            next:(result)=>{
              console.log(result)
            
            },
            complete:()=>{},
            error:(error)=>{
              console.log(error)
            }
          })
  
         
        },
        error:(error)=>{
          console.log(error)
        }
      });*/
     
  
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
        
    },
    reject:()=>{
  
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });
  }

onOptionChange(option: string, index: number) {
  console.log(index)
  console.log('Option sélectionnée:', option);
  this.selectedOption = option;
  console.log(option)
  this.demandeFor[index].name = option;
  console.log(this.demandeFor[index])
  // Ajoutez votre logique ici, par exemple, mettre à jour une autre variable ou état
}

onFileChange(event: any, index: number) {
  const file = event.target.files[0];
  // Traitement du fichier, par exemple :
}

voirDoc(name:string){
  this.displayPosition = true;
this.imageUrl=environment.mockApiUrl+"/uploads/"+name;
console.log(this.imageUrl)
  

  
}

 /* getTypedoc(id?:number){
    this.TypeDocService.get_TpeDoc(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.Typedoc=result;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }*/

}
