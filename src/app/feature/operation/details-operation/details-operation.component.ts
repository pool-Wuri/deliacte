import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { OperationAssign, User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Location } from '@angular/common';
import { UploadEvent } from 'primeng/fileupload';
import { UploadIcon } from 'primeng/icons/upload';

@Component({
  selector: 'app-details-operation',
  templateUrl: './details-operation.component.html',
  styleUrls: ['./details-operation.component.scss']
})
export class DetailsOperationComponent {

  id:number | undefined;
  procedures=new Array<Procedure>();
  operation=new Operation
  champs=new Array <ChampOperation>();
  addchamp:boolean=false;
  champ= new ChampOperation;
  types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));
  title:string="";
  addbutton:boolean=false;
  editbutton:boolean=false;
  optionsChamp:string[]=[];
  newOption: string = '';
  optionAdd:any;
  optionResult:any;
  responsUsers=new Array<User>();
  operationsIds=new OperationAssign;
  listeUser:boolean=false;
  list1: any[] | undefined;
  usergroup=new Array <User>()
  usergroup1=new Array <User>()
  list2: any[] | undefined;
  sortOrder!: number;
  selectedOperation=new Array <Operation>();
  disable:boolean=false;;
  submitted:boolean=false;
  loading:boolean=false;
  errorMessage: string | null = null;

  constructor(
    private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private userService:UtilisateurService,
    private location: Location,


){


  }

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    if(this.id){
      this.getProcedure(this.id)
      this.searchRespon(this.id);
    }
   }
  );
 // this.searchChamp();
}

getProcedure(id?:number){
    this.operationService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
       this.operation=result.data;
       this.operationService.searchChamp("").subscribe({
        next:(value)=>{
          this.champs=value.data;
          if(this.champs){
            this.champs=this.champs.filter(u=>u.operationId==id);
            this.champs.reverse()
          }
        },
        complete:()=>{},
        error:(err)=>{}
      });
      if(this.operation.procedureId!==0){
        this.procedureService.get_Procedure(this.operation.procedureId).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.operation.procedure=result.data;
              },
            error:(er)=>{
            }
        })
      }
     
    
      },
      error:(er)=>{

      }
    })
}

searchChamp(){
  this.operationService.searchChamp("").subscribe({
    next:(value)=>{
      this.champs=value.data;
      this.champs=this.champs.filter(u=>u.operationId==this.id)
      this.champs.reverse()
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
 
}

supprimerChamp(champ:ChampOperation){
  this.confirmationService.confirm({
    message: 'Voulez-vous vraiment supprimer ce champ?',
    header: 'Suppression',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.operationService.delete_Champ(champ.id).subscribe({
      complete:()=>{},
      next:(result)=>{
       this.searchChamp();
      },
      error:(error)=>{
      }
  
    })
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ supprimé', life: 3000});      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'Echec', detail: 'Champ non supprimé', life: 3000});
  }
});

}

editChamp(champ:ChampOperation){
  this.title="Modifier champ";
  this.editbutton=true;
  this.addbutton=false;
  this.addchamp=true;
  this.champ=champ
}

fermerModal(){
  this.addchamp=false;
  this.listeUser=false;
}

saveChampEdit(){
  this.confirmationService.confirm({
    message: 'Voulez-vous modifier ce champ?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.optionResult=this.champ.options;
    this.operationService.updateChamp(this.champ,this.champ.id).subscribe({
      next:(value)=>{
        if(value.data){
          value.data.options=this.optionResult;
          for(let i=0;i<value.data.options.length;i++){
            value.data.options[i].champOperationId=value.data.id;
            this.operationService.addOption(value.data.options[i]).subscribe({
              next:(result)=>{
                this.searchChamp();
              },
              complete:()=>{},
              error:(err)=>{
              }
            })
          }
       
        }
        this.addchamp=false;
        this.editbutton=false;
        this.addbutton=false;
      },
      complete:()=>{},
      error:(err)=>{
        this.editbutton=false;
        this.addbutton=false;
      }
    })
    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ modifié', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addchamp=false;
    this.messageService.add({severity:'error', summary: 'Echec', detail: ' Champ non modifié', life: 3000});
  }
  });
}

ajouterChamp(operation:any){
  this.addchamp=true
  this.title="Ajouter champ";
  this.champ={};
  this.champ.options=[];
  this.editbutton=false;
  this.addbutton=true;
  this.champ.operationId=operation.id;
}

saveChamps(){
  this.submitted=true;
  if(this.champ.description && this.champ.name && this.champ.inputType){
    this.confirmationService.confirm({
      message: 'Voulez-vous sauvegarder ce champ?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.optionResult=this.champ.options;
      this.operationService.ajouterChamp(this.champ).subscribe({
        next:(value)=>{
          if(value.data){
            value.data.options=this.optionResult;
            for(let i=0;i<value.data.options.length;i++){
              value.data.options[i].champOperationId=value.data.id;
              this.operationService.addOption(value.data.options[i]).subscribe({
                next:(result)=>{
                  this.searchChamp();
                },
                complete:()=>{},
                error:(err)=>{
                }
              })
            }
         
          }
          this.searchChamp();
          this.addchamp=false;
          this.editbutton=false;
          this.addbutton=false;
        },
        complete:()=>{},
        error:(err)=>{
          this.editbutton=false;
          this.addchamp=false;
          this.addbutton=false;
        }
      })
      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ enregistré', life: 3000});
        
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Echec', detail: ' Champ non enregistré', life: 3000});
    }
    });
   
  }
 
}

addOption() {
  this.optionAdd={
    name:this.newOption,
    champOperationId:this.champ.id
  }
  this.optionAdd;
  this.champ.options.push(this.optionAdd)
 
 this.newOption='';
}

searchRespon(idOperation:number){
  this.operationService.searchResponsable(idOperation).subscribe({
    next:(result)=>{
      this.responsUsers=result.data;

    },
    complete:()=>{},
    error:(error)=>{
    }
  })
}


retirerUser(user:User){
  this.operationsIds.operationsIds = []; // Initialiser si nécessaire
  this.confirmationService.confirm({
    message: 'Voulez-vous vraiment lui retirer de cette opération?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => { 

    this.messageService.add({severity:'success', summary: 'Succès', detail: 'Opération retirée', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'Echec', detail: 'Opération non retirée', life: 3000});
  }
  });

}


groupeUser(operation:any){
 this.operation=operation;
     this.userService.userOrganisation().subscribe({
       complete:()=>{},
       next:(result)=>{
         this.usergroup1=result.data;
         if(this.usergroup1){
           this.operationService.searchResponsable(this.operation.id || 0).subscribe({
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


 userSelet(){
  this.confirmationService.confirm({
    message: 'Voulez-vous ajouter des agents ?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.listeUser=false;
      this.operationsIds.operationsIds = []; // Initialiser si nécessaire    
      this.loading=true;
      for(let i=0;i<this.usergroup.length;i++){
        if(this.usergroup[i].id){
        this.userService.operationInfo(this.usergroup[i].id).subscribe({
          complete:()=>{},
          next:(result)=>{
            if(result){
              for(let i=0;i<result.data.length;i++){
                this.operationsIds.operationsIds ?.push(result.data[i].id); // Initialiser si nécessaire
              }
              this.operationsIds.operationsIds?.push(this.operation.id || 0);
              this.userService.assigneroperation(this.operationsIds,this.usergroup[i].id).subscribe({
                complete:()=>{},
                next:(result)=>{
                 // console.log(result)
                  if(result.status==200 || result.status==201){
                    setTimeout(() => {
                      this.loading=false;
                      this.messageService.add({severity:'success', summary: 'Succès', detail: 'Utilisateur affecté', life: 3000});
                      this.searchRespon(this.id ?? 0);
                    }, 2000);
                  }
                  else{
                    this.messageService.add({severity:'error', summary: 'Echec', detail:result.error, life: 3000});
                    this.loading=false;

                  }
                // this.searchUser();
                },
                error:(error)=>{
                  console.log(error);
                  this.loading=false;
                }
            
              });
            }
          
    
          },
          error:(error)=>{
          }
        });
        
        }
    
      }
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Echec', detail: ' Utilisateur non affecté', life: 3000});
    }
    });
}

retourPage(){
  this.location.back();
}


onUpload(event: any) {
  console.log("Réponse brute :", event);

  const body = event?.originalEvent?.body;

  if (body) {
    if (body.status === 200) {
      // ✅ Succès
      this.messageService.add({
        severity: 'success',
        summary: 'Succès',
        detail: body.message || 'Fichier téléversé avec succès'
      });
    } else {
      // ⚠️ Erreur logique (même si HTTP est 200)
      this.messageService.add({
        severity: 'warn',
        summary: 'Avertissement',
        detail: body.message || 'Un problème est survenu'
      });
    }
  } else {
    // ❌ Erreur serveur (500, etc.)
    this.messageService.add({
      severity: 'error',
      summary: 'Erreur',
      detail: 'Impossible de téléverser le fichier'
    });
  }
}

onError(event: any) {
  console.error("Erreur Upload :", event);

  this.messageService.add({
    severity: 'error',
    summary: 'Erreur serveur',
    detail: 'Une erreur est survenue lors du téléversement'
  });
}
}


