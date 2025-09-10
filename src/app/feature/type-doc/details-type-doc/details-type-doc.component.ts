import { Component } from '@angular/core';
import { TypeDoc } from 'src/app/core/models/typeDoc-model';
import { TypeDocService } from 'src/app/core/services/type-doc.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { Procedure, DemandeProcedur } from 'src/app/core/models/procedure.model';
import { environment } from 'src/environnements/environment';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { ConfirmationService, MessageService, PrimeIcons } from 'primeng/api';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Location } from '@angular/common';

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
 // CHECKBOX="CHECKBOX"
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
  loading=false;
  dossier:any;
  dossierTraiter:any[]=[];
  events1!: any[];
  operationPrecedent=new Operation;
  operationnow=new Operation;
    events2!: any[];
    data1:any;
    indexchamp!:number;
    numDossier!:number;
    indexSave:number[]=[];
    traitement:any;
    isDisabled = true; // Mettre à false pour réactiver
    radioValues: { [key: number]: string } = {};  // Stocke les valeurs des boutons radio par index
    document:any[]=[];
    traitementPass:any={};
    docUrl:string="";
    data: FormData = new FormData();
    file:any;
    champOperationId!:any;
    indexRequis:number[]=[];
    idfile!:number;

  constructor(private route:ActivatedRoute,
      private typeDocService:TypeDocService,
      private procedureService:ProcedureService,
      private operationService:OperationService,
      private userService:UtilisateurService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService,
      private router: Router,
      private location: Location,

  ){}

  ngOnInit():void{
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.getDossier(this.id)
     }
    );

    this.events2 = [
      "2020", "2021", "2022", "2023"
  ];
    this.champs.forEach(champ => {
      if (champ.inputType === 'RADIO') {
          champ.name = null; // Valeur unique pour chaque champ radio
      }
      if (champ.inputType === 'CHECKBOX') {
          champ.name = ""; // Liste pour les cases à cocher
      }
  });

  }


  getDossier(id?:number){
    let limit: number | null = null;
    if(this.user?.role==="CITOYEN"){
      this.typeDocService.getDossierPour(id).subscribe({
        complete:()=>{},
        next:(result)=>{
         this.dossier=result.data.dossiers;
         //console.log(this.dossier)
         this.numDossier=result.data.traitement.numeroDossier;
         let i = 0;
         while (i < this.dossier.length - 1) { 
             if (this.dossier[i + 1].champOperation.operationId !== this.dossier[0].champOperation.operationId) {
                 this.dossierTraiter.push(this.dossier[i + 1]);
                 this.dossier.splice(i + 1, 1);  // Supprime un élément à l'index i+1

             } else {
                 i++;  // Incrémente seulement si aucun élément n'est supprimé
             }
         }
         
         for(let i=0;i<this.dossier.length;i++){
          if (this.dossier[i].champOperation.inputType === "PDF" ||
            this.dossier[i].champOperation.inputType === "FILE" ||
            this.dossier[i].champOperation.inputType === "IMAGE") {
                    this.document.push(this.dossier[i]);
          }
         }
         this.traitement=result.data.traitement;
         if(this.traitement.status!=this.traitement.statusDossier){
          this.isDisabled=false;
         }

      this.operationService.get_Procedure(this.dossier[0].champOperation.operationId).subscribe({
        complete:()=>{},
        next:(result)=>{
        this.procedureService.get_Procedure(result.data.procedureId).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.operationService.get_Operation(result.data.id).subscribe({
              complete:()=>{},
              next:(result)=>{
                this.operations=result.data;
                this.events2= this.operations.map(operation => ({
                  status: operation.verbeOperation,
                  icon: 'pi pi-check-circle',        // Icône de PrimeNG (en texte)
                  color: "#c8c8c8", // Gris par défaut
                }));
               // console.log(this.events2);
                //console.log(this.traitement)
                 for (let i = 0; i < this.events2.length; i++) {
                  if(this.events2[i].status==this.traitement.status){
                    this.events2[i].color = '#4caf50';
                    limit = i;
                  }
                };
                if (limit !== null) {
                  for (let i = 0; i <= limit; i++) {
                    // Appliquer la même couleur aux événements avant le statut trouvé
                    if (this.events2[i].color == '#c8c8c8') {  // Si la couleur a été modifiée
                      this.events2[i].color = this.events2[limit].color;
                    }
                  }
                }

              },
              error:(error)=>{
              }
            });
          },
            error:(error)=>{
            }
  
        })
         
        },
        error:(error)=>{
        }
      });
        },
        error:(error)=>{
        }
    
      });
    }
    else if(this.user?.role!=="CITOYEN"){
      this.traitement={};
      this.operationPrecedent={};
      this.operationnow={};
      this.typeDocService.getDossierPour(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.traitementPass=result.data.traitement;
        this.dossier=result.data.dossiers;
        for(let i=0;i<this.dossier.length;i++){
          if (this.dossier[i].champOperation.inputType === "PDF" ||
            this.dossier[i].champOperation.inputType === "FILE" ||
            this.dossier[i].champOperation.inputType === "IMAGE") {
                    this.document.push(this.dossier[i]);
          }
        }
        let i = 0;
        while (i < this.dossier.length - 1) { 
            if (this.dossier[i + 1].champOperation.operationId !== this.dossier[0].champOperation.operationId) {
                this.dossierTraiter.push(this.dossier[i + 1]);
                this.dossier.splice(i + 1, 1);  // Supprime un élément à l'index i+1
             
            } else {
                i++;  // Incrémente seulement si aucun élément n'est supprimé
            }
        }
        if(this.traitementPass.status!=this.traitementPass.statusDossier){
          this.isDisabled=false;
        }
        this.idOperationNow=result.data.traitement.operationId;;
        if(this.traitementPass.status!=this.traitementPass.statusDossier){
          this.operationService.get_OperationNext(this.idOperationNow).subscribe({
            next:(result)=>{
              this.traitement.operationId=result.data[0].id;
            
            },
            complete:()=>{},
            error:(error)=>{
            }
          });
        }
        else{
          this.userService.operationInfo(this.user?.id).subscribe({
            complete:()=>{},
            next:(result)=>{
            this.operationService.get_OperationNext(this.idOperationNow).subscribe({
                next:(result)=>{
                  if(result.data.length>1)
                  {
                    if(result.data[0].operationPreviousId==this.idOperationNow){
                      this.operationPrecedent=result.data[1];
                      this.operationnow=result.data[0];
                      this.traitement.operationId=this.operationnow.id;
                    }
                    else{
                      this.operationPrecedent=result.data[0];
                      this.operationnow=result.data[1];
                      this.traitement.operationId=this.operationnow.id;
    
                    }
            
                    this.operationService.get_ChampByOperation(this.operationnow.id).subscribe({
                      next:(result)=>{
                      
                        this.champs=result.data;
                        if (this.champs){
                          this.demandeFor = this.champs.map(champ => ({
                            name: '',
                            champOperationId: champ.id // ou une autre logique
                          }));
                        }
                      
                    
                      },
                      complete:()=>{},
                      error:(error)=>{
                      }
                    });
                  }
                  else{
                    if(result.data[0].operationPreviousId==this.idOperationNow){
                      this.operationnow=result.data[0];
                      this.operationService.get_Procedure(result.data[0].operationPreviousId).subscribe({
                        next:(result)=>{
                          this.operationPrecedent=result.data;
                        
                        },
                        complete:()=>{},
                        error:(err)=>{}
                      });
                      this.traitement.operationId=result.data[0].id;
    
                      this.operationService.get_ChampByOperation(result.data[0].id).subscribe({
                        next:(result)=>{
                        // this.numDossier=result.message;
                        if(result){
                          this.champs=result.data;
                        // this.traitement.operationId=this.champs[0].operationId;
                        }
                        
                          this.demandeFor = this.champs.map(champ => ({
                            name: '',
                            champOperationId: champ.id // ou une autre logique
                          }));
                         
                        },
                        complete:()=>{},
                        error:(error)=>{
                        }
                      });
                    }
                    else{
                      this.operationPrecedent=result.data[0];
                    }
                  
                  }
                },
                complete:()=>{},
                error:(error)=>{
                }
              });
     
            },
            error:(error)=>{
            }
          });
        }
        },
        error:(error)=>{
        }
    
      });
    }
  }


  getOperation(id?:number){
    let limit: number | null = null;
    this.operationService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
      this.procedureService.get_Procedure(result.data.procedureId).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.operationService.get_Operation(result.data.id).subscribe({
            complete:()=>{},
            next:(result)=>{
              this.operations=result.data;
              this.events2= this.operations.map(operation => ({
                status: operation.verbeOperation,
                icon: 'pi pi-check-circle',        // Icône de PrimeNG (en texte)
                color: "#c8c8c8", // Gris par défaut
              }));
               for (let i = 0; i < this.events2.length; i++) {
                limit = i;
              };
              if (limit !== null) {
                for (let i = 0; i <= limit; i++) {
                  // Appliquer la même couleur aux événements avant le statut trouvé
                  if (this.events2[i].color !== '#c8c8c8') {  // Si la couleur a été modifiée
                    this.events2[i].color = this.events2[limit].color;
                  }
                }
              }
              return this.events2,limit;
            },
            error:(error)=>{
            }
          });
        },
          error:(error)=>{
          }

      })
       
      },
      error:(error)=>{
      }
    });
    return limit;
  }

 
  validerDossier(numDossier:number){
    this.traitement.isActive=true;
    this.indexSave.sort((a, b) => b - a);
    for(let i=0;i<this.indexSave.length;i++){
      this.demandeFor.splice(this.indexSave[i],1);
    }
    this.data1 = {
        traitement: this.traitement,
        dossiers: this.demandeFor
    }
    this.confirmationService.confirm({
      message: 'Voulez-vous valider cette opération?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.procedureService.saveDemande(this.data1,numDossier).subscribe({
        next:(result)=>{
          this.router.navigate(['/deliacte/dossier/list']);
          if(result){
            this.loading=false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Dossier traité avec succès', life: 3000});
          }

        },
        complete:()=>{
    
        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur de traietement du dossier', life: 3000});
          setTimeout(() => {
            this.loading=false;
          }, 2000);
        }
      });
        
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Erreur lors du traitement', life: 3000});
    }
    });
  }


  rejetterDossier(numDossier:number){
      if(this.traitementPass.status!==this.traitementPass.statusDossier){
        this.traitement.operationId=this.traitementPass.operationId;
      }
      this.traitement.isActive=false;
      this.data1 = {
        traitement: this.traitement,
        dossiers: []
      }
    this.confirmationService.confirm({
      message: 'Voulez-vous rejeter ce dossier?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.procedureService.saveDemande(this.data1,numDossier).subscribe({
        next:(result)=>{
          this.router.navigate(['/deliacte/dossier/list']);
          if(result){
            this.loading=false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Dossier rejetté ', life: 3000});
          }
        },
        complete:()=>{
    
        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Erreur de traietement du dossier,dossier non rejetté', life: 3000});
          setTimeout(() => {
            this.loading=false;
          }, 2000);
        }
      });        
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Erreur de traietement du dossier,dossier non rejetté', life: 3000});

    }
    });
  }

onOptionChange(option: string, index: number) {
  this.selectedOption = option;
  this.demandeFor[index].name = option;
  // Ajoutez votre logique ici, par exemple, mettre à jour une autre variable ou état
}

onFileChange(event: any, index: number) {
  if(this.dossier[index]){
   this.champOperationId= this.dossier[index]?.champOperationId;
   this.idfile=this.dossier[index]?.id;
  }
  const file = event.target.files[0];
  this.indexchamp=index;
  if (file) {
    this.file=file;
  } 
  else {
  }
}

saveFile(){

  this.loading=true;
  this.data.append('file', this.file, this.file.name );
  this.data.append('champOperationId', this.champOperationId.toString());
  this.data.append('id', this.idfile.toString());

  this.procedureService.saveDoc(this.data,this.numDossier).subscribe({
    complete:()=>{},
    next:(result)=>{
      if(result){
        this.indexSave.push(this.indexchamp);
       // this.demandeFor.splice(this.indexchamp,1);
        this.file={};
     //  this.indexchamp=0;
       
        this.data.delete('file');
        this.data.delete('champOperationId');
      }
      alert("succès enrégistrement fichier");
      this.loading=false;

    },
    error:(err)=>{
    }
  
  })
}

voirDoc(name:any){
  this.displayPosition = true;
  if(name.champOperation.inputType==="IMAGE"){
    this.imageUrl=environment.apiUrl+"/uploads/"+name.name;
    this.docUrl="";
  }
  else{
    this.docUrl=environment.apiUrl+"/uploads/pdf/"+name.name;
    this.imageUrl="";
  }


  
}


telechargerDoc(name: any): void {
  if (!name || !name.champOperation || !name.name) {
    return;
  }

  const inputType = name.champOperation.inputType;
  const fileName = name.name;

  let fileUrl = '';

  if (inputType === 'IMAGE') {
    fileUrl = `${environment.apiUrl}/uploads/${fileName}`;
  } else if (inputType === 'PDF') {
    fileUrl = `${environment.apiUrl}/uploads/pdf/${fileName}`;
  } else {
    return;
  }

  // Création du lien de téléchargement et déclenchement
  const link = document.createElement('a');
  link.href = fileUrl;
  link.download = fileName;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

}


modifierDossier(numDossier:number){
 
  this.traitement.isActive=true;
  this.traitement.statusDossier=this.traitement.status;
  this.indexRequis=[];
  for(let i=0;i<this.champs.length;i++){
    if(this.champs[i].isRequired){
      this.indexRequis.push(i);
    }
  }
  let tousVrais = false;  // On suppose d'abord que tous les éléments sont vrais
  for(let i=0;i<this.indexRequis.length;i++){
    if(this.dossier[this.indexRequis[i]].name){
      tousVrais = true;  // Si un élément est faux, on met tousVrais à false
      break;  //

    }
  }
  this.indexSave.sort((a, b) => b - a);
  for(let i=0;i<this.indexSave.length;i++){
    this.dossier.splice(this.indexSave[i],1);
  }
    this.data1 = {
      traitement: this.traitement,
      dossiers: this.dossier
  }
 
 this.confirmationService.confirm({
    message: 'Voulez-vous modifier ce dossier?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.loading=true;
    this.procedureService.saveDemande(this.data1,numDossier).subscribe({
      next:(result)=>{
        this.router.navigate(['/deliacte/dossier/list']);
        if(result){
          this.loading=false;
        }
        this.isDisabled=true;

      },
      complete:()=>{
  
      },
      error:(error)=>{
      }
    });
  
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Dossier modifié', life: 3000});
      
  },
  reject:()=>{

    this.messageService.add({severity:'error', summary: 'Erreur', detail: ' Dossier non modifié', life: 3000});
  }
});

}

annulerModif(){
  this.isDisabled=true;
}

documentRecuper(operation:any){
  //console.log(operation)
  console.log(this.traitement.operationId)
}

    retourPage(){
      this.location.back();
    }
}
