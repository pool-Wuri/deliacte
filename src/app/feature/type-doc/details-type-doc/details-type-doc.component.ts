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
          console.log(result.data+" total");
         this.dossier=result.data.dossiers;
         this.numDossier=result.data.traitement.numeroDossier;
         console.log(this.dossier.length)
         let i = 0;
         console.log(i);
         while (i < this.dossier.length - 1) { 
          console.log(this.dossier[i + 1].champOperation.operationId) 
          console.log(this.dossier[i].champOperation.operationId)// Vérifie que i+1 reste dans les limites
             if (this.dossier[i + 1].champOperation.operationId !== this.dossier[0].champOperation.operationId) {
                 this.dossierTraiter.push(this.dossier[i + 1]);
                 this.dossier.splice(i + 1, 1);  // Supprime un élément à l'index i+1
                 console.log(this.dossierTraiter);
                 console.log(this.dossier);

             } else {
                 i++;  // Incrémente seulement si aucun élément n'est supprimé
             }
         }
         
         for(let i=0;i<this.dossier.length;i++){
          if (this.dossier[i].champOperation.inputType === "PDF" ||
            this.dossier[i].champOperation.inputType === "FILE" ||
            this.dossier[i].champOperation.inputType === "IMAGE") {
                    this.document.push(this.dossier[i]);
            console.log(this.document)
          }
         }
         this.traitement=result.data.traitement;
         if(this.traitement.status!=this.traitement.statusDossier){
          this.isDisabled=false;
          console.log(this.isDisabled)
         }
         console.log(this.isDisabled)

      //  console.log(this.getOperation(this.dossier[0].champOperation.operationId)) 
      this.operationService.get_Procedure(this.dossier[0].champOperation.operationId).subscribe({
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
                  status: operation.verbeOperation,
                  icon: 'pi pi-check-circle',        // Icône de PrimeNG (en texte)
                  color: "#c8c8c8", // Gris par défaut
                }));
  
                 for (let i = 0; i < this.events2.length; i++) {

                  if(this.events2[i].status==this.traitement.status){
                    this.events2[i].color = '#4caf50';
                    limit = i;
                    console.log(limit)
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
      });
        },
        error:(error)=>{
          console.log(error);
        }
    
      });
    }
   else if(this.user?.role!=="CITOYEN"){
    this.traitement={};
    this.operationPrecedent={};
    this.operationnow={};
    console.log(this.operationnow)
    this.typeDocService.getDossierPour(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data.traitement+" total");
        this.traitementPass=result.data.traitement;
        console.log(this.traitementPass)
       this.dossier=result.data.dossiers;
      
       for(let i=0;i<this.dossier.length;i++){
        if (this.dossier[i].champOperation.inputType === "PDF" ||
          this.dossier[i].champOperation.inputType === "FILE" ||
          this.dossier[i].champOperation.inputType === "IMAGE") {
                  this.document.push(this.dossier[i]);
          console.log(this.document)
        }
       }
       let i = 0;
       console.log(this.dossier)
       while (i < this.dossier.length - 1) { 
        console.log(this.dossier[i + 1].champOperation.operationId) 
        console.log(this.dossier[0].champOperation.operationId)// Vérifie que i+1 reste dans les limites
           if (this.dossier[i + 1].champOperation.operationId !== this.dossier[0].champOperation.operationId) {
               this.dossierTraiter.push(this.dossier[i + 1]);
               this.dossier.splice(i + 1, 1);  // Supprime un élément à l'index i+1
               console.log(this.dossierTraiter);
               console.log(this.dossier);
           } else {
               i++;  // Incrémente seulement si aucun élément n'est supprimé
           }
       }
       if(this.traitementPass.status!=this.traitementPass.statusDossier){
        this.isDisabled=false;
      
       }
       this.idOperationNow=result.data.traitement.operationId;;
       console.log(this.idOperationNow);
              //en cas de  rejet 
       if(this.traitementPass.status!=this.traitementPass.statusDossier){
          
        this.operationService.get_OperationNext(this.idOperationNow).subscribe({
          next:(result)=>{
            console.log(result.data)
            //this.operationnow=result.data[0];
            this.traitement.operationId=result.data[0].id;
          
          },
          complete:()=>{},
          error:(error)=>{
            console.log(error)
          }
        });

        
       }

       //en cas de non rejet ,operation normal
       else{
        this.userService.operationInfo(this.user?.id).subscribe({
          complete:()=>{},
          next:(result)=>{
          this.operationService.get_OperationNext(this.idOperationNow).subscribe({
              next:(result)=>{
                console.log(result.data)
                if(result.data.length>1)
                {
                  console.log(result.data);
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
                      console.log(this.operationnow)
                      console.log(result)
                     // this.numDossier=result.message;
                      this.champs=result.data;
                      console.log(this.champs)
                      if (this.champs){
                      //  this.traitement.operationId=this.champs[0].operationId;
                        this.demandeFor = this.champs.map(champ => ({
                          name: '',
                          champOperationId: champ.id // ou une autre logique
                        }));
                      }
                    
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
                else{
                  console.log(result.data);
                  if(result.data[0].operationPreviousId==this.idOperationNow){
                    this.operationnow=result.data[0];
                    this.operationService.get_Procedure(result.data[0].operationPreviousId).subscribe({
                      next:(result)=>{
                        this.operationPrecedent=result.data;
                      
                      console.log(this.operationPrecedent);
                      },
                      complete:()=>{},
                      error:(err)=>{}
                    });
                    this.traitement.operationId=result.data[0].id;
                    console.log('DemandeFor:', this.traitement);
  
                    this.operationService.get_ChampByOperation(result.data[0].id).subscribe({
                      next:(result)=>{
                        console.log(result)
                       // this.numDossier=result.message;
                       if(result){
                        this.champs=result.data;
                        console.log(this.champs)
                      // this.traitement.operationId=this.champs[0].operationId;
                       }
                      
                        this.demandeFor = this.champs.map(champ => ({
                          name: '',
                          champOperationId: champ.id // ou une autre logique
                        }));
                        console.log('Champs:', this.champs);
                        console.log('DemandeFor:', this.demandeFor);
                        console.log('Champs:', this.champs);
                        //console.log('DemandeFor:', this.demandeFor);
                      },
                      complete:()=>{},
                      error:(error)=>{
                        console.log(error)
                      }
                    });
                  }
                  else{
                    this.operationPrecedent=result.data[0];
                    console.log("Fin operation traitement")
                  }
                
                }
              },
              complete:()=>{},
              error:(error)=>{
                console.log(error)
              }
            });
            console.log(result.data);
         /*  if(result.data[0].operationPreviousId==this.idOperationNow){
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
            }*/
         
          },
          error:(error)=>{
            console.log(error);
          }
         });
       }

       console.log(this.traitement)
         console.log(this.operationnow)
      

       
      },
      error:(error)=>{
        console.log(error);
      }
  
    });
   }
  }


  getOperation(id?:number){
    let limit: number | null = null;
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
                status: operation.verbeOperation,
                icon: 'pi pi-check-circle',        // Icône de PrimeNG (en texte)
                color: "#c8c8c8", // Gris par défaut
              }));
              console.log(this.events2)

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
              console.log(limit)
              console.log(this.events2)
              return this.events2,limit;
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
    });
    return limit;
  }

 
  validerDossier(numDossier:number){
    console.log(numDossier);
    console.log(this.operationnow);
    console.log(this.operationPrecedent);
    console.log(this.demandeFor)
  
    this.traitement.isActive=true;
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
          console.log(result.data);
          this.router.navigate(['/deliacte/dossier/list']);
          if(result){
            this.loading=false;
          }

        },
        complete:()=>{
    
        },
        error:(error)=>{
          console.log(error);
        }
      });
    
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
        
    },
    reject:()=>{
  
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });
  }


  rejetterDossier(numDossier:number){
      console.log(this.operationnow);
      console.log(this.operationPrecedent);
      console.log(this.traitement)
      console.log(this.traitementPass)
      if(this.traitementPass.status!==this.traitementPass.statusDossier){
        this.traitement.operationId=this.traitementPass.operationId;
      }
      this.traitement.isActive=false;
     // this.traitement.numDossier=numDossier;
      console.log(this.traitement);
      this.data1 = {
        traitement: this.traitement,
        dossiers: []
    }
    console.log(this.data1)  
    console.log(numDossier)
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
          console.log(result.data);
          this.router.navigate(['/deliacte/dossier/list']);
          if(result){
            this.loading=false;
          }

        },
        complete:()=>{
    
        },
        error:(error)=>{
          console.log(error);
        }
      });
    
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
  console.log(index)
  if(this.dossier[index]){
   console.log(this.dossier[index].champOperationId) 
   this.champOperationId= this.dossier[index]?.champOperationId;
   this.idfile=this.dossier[index]?.id;
    console.log(this.champOperationId)
  }
  const file = event.target.files[0];
    this.indexchamp=index;
    console.log(this.indexchamp);
    console.log(this.numDossier)
    console.log(this.idfile)

  // Traitement du fichier, par exemple :
 if (file) {
   this.file=file;
    //data.append('dossier', new Blob([JSON.stringify(this.doc)], {type: 'application/json'}));
} else {
  console.log('Aucun fichier sélectionné');
}


}

saveFile(){
  console.log(this.file);
  console.log(this.numDossier)
  console.log(this.champOperationId)
  this.loading=true;
  this.data.append('file', this.file, this.file.name );
  this.data.append('champOperationId', this.champOperationId.toString());
  this.data.append('id', this.idfile.toString());

  console.log(this.data)
  this.procedureService.saveDoc(this.data,this.numDossier).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result)
      if(result){
        this.indexSave.push(this.indexchamp);
       // this.demandeFor.splice(this.indexchamp,1);
        this.file={};
     //  this.indexchamp=0;
        console.log(this.demandeFor);
        console.log(this.indexSave)
        this.data.delete('file');
        this.data.delete('champOperationId');
      }
      alert("succès enrégistrement fichier");
      this.loading=false;

    },
    error:(err)=>{
      console.log(err)
    }
  
  })
}

voirDoc(name:any){
  console.log(name.champOperation.inputType)
  console.log(name)
  this.displayPosition = true;
  if(name.champOperation.inputType==="IMAGE"){
    this.imageUrl=environment.apiUrl+"/uploads/"+name.name;
    this.docUrl="";
  }
  else{
    this.docUrl=environment.apiUrl+"/uploads/pdf/"+name.name;
    this.imageUrl="";
  }
  console.log(this.imageUrl)
  console.log(this.docUrl)

  
}


telechargerDoc(name: any): void {
  if (!name || !name.champOperation || !name.name) {
    console.warn('Données invalides pour le téléchargement');
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
    console.warn('Type de fichier non supporté pour le téléchargement:', inputType);
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

  console.log('Téléchargement déclenché pour :', fileName);
}


modifierDossier(numDossier:number){
  console.log(numDossier);
  console.log(this.dossier);
  console.log(this.operationnow);
  console.log(this.operationPrecedent);
  console.log(this.demandeFor)
  this.traitement.isActive=true;
  this.traitement.statusDossier=this.traitement.status;
  this.indexRequis=[];
  console.log(this.champs);
  for(let i=0;i<this.champs.length;i++){
    if(this.champs[i].isRequired){
      this.indexRequis.push(i);
    }
    console.log(this.indexRequis)
  }
  let tousVrais = false;  // On suppose d'abord que tous les éléments sont vrais
  for(let i=0;i<this.indexRequis.length;i++){
    if(this.dossier[this.indexRequis[i]].name){
      console.log(this.dossier[this.indexRequis[i]].name)
      tousVrais = true;  // Si un élément est faux, on met tousVrais à false
      break;  //

    }
  }
  this.indexSave.sort((a, b) => b - a);
  for(let i=0;i<this.indexSave.length;i++){
    this.dossier.splice(this.indexSave[i],1);
  }
  console.log(this.dossier)
    this.data1 = {
      traitement: this.traitement,
      dossiers: this.dossier
  }
  console.log(this.data1)  
  console.log(numDossier)
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
        console.log(result.data);
        this.router.navigate(['/deliacte/dossier/list']);
        if(result){
          this.loading=false;
        }
        this.isDisabled=true;

      },
      complete:()=>{
  
      },
      error:(error)=>{
        console.log(error);
      }
    });
  
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      
  },
  reject:()=>{

    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});

}
annulerModif(){
  this.isDisabled=true;
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

    retourPage(){
      this.location.back();
    }
}
