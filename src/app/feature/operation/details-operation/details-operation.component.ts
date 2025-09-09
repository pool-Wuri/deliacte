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
  constructor(private route:ActivatedRoute,
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
    console.log(this.id)
    if(this.id){
      this.getProcedure(this.id)
      this.searchRespon(this.id);
    }
   }
  );
 // this.searchChamp();
}

getProcedure(id?:number){
  console.log(id)
    this.operationService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
       this.operation=result.data;
       console.log(this.operation)
       this.operationService.searchChamp("").subscribe({
        next:(value)=>{
          console.log(value)
          this.champs=value.data;
          if(this.champs){
            this.champs=this.champs.filter(u=>u.operationId==id);
            this.champs.reverse()
            console.log(this.champs);
          }
        },
        complete:()=>{},
        error:(err)=>{}
      });
      console.log(this.operation.procedureId)
      if(this.operation.procedureId!==0){
        console.log(this.operation.procedureId)
        this.procedureService.get_Procedure(this.operation.procedureId).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.operation.procedure=result.data;
            console.log(result)    },
            error:(er)=>{console.log("get_error_User")}
        })
      }
     
     /*  this.procedureService.search_Procedure().subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result)
          this.procedures=result;
          console.log(this.operation.procedureId)
          this.procedures = this.procedures.filter(u => u.id === this.operation.procedureId);
          console.log(this.procedures)
        },
        error:(error)=>{
          console.log(error)
        }
      })*/
      },
      error:(er)=>{console.log("get_error_User")}
    })
}

searchChamp(){
  this.operationService.searchChamp("").subscribe({
    next:(value)=>{
      this.champs=value.data;
      this.champs=this.champs.filter(u=>u.operationId==this.id)
      console.log(this.champs);
      this.champs.reverse()
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
 
}

supprimerChamp(champ:ChampOperation){
  console.log(champ)
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
        console.log(value);
        if(value.data){
          value.data.options=this.optionResult;
          console.log(value)
          for(let i=0;i<value.data.options.length;i++){
            value.data.options[i].champOperationId=value.data.id;
            this.operationService.addOption(value.data.options[i]).subscribe({
              next:(result)=>{
                console.log(result);
                this.searchChamp();
              },
              complete:()=>{},
              error:(err)=>{
                console.log(err)
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
        console.log(err)
        this.editbutton=false;
        this.addbutton=false;
      }
    })
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addchamp=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
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
  console.log(this.champ)
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
          console.log(value)
          if(value.data){
            value.data.options=this.optionResult;
            for(let i=0;i<value.data.options.length;i++){
              value.data.options[i].champOperationId=value.data.id;
              this.operationService.addOption(value.data.options[i]).subscribe({
                next:(result)=>{
                  console.log(result);
                  this.searchChamp();
                },
                complete:()=>{},
                error:(err)=>{
                  console.log(err)
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
          console.log(err);
          this.editbutton=false;
          this.addchamp=false;
          this.addbutton=false;
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

addOption() {
  console.log(this.champ)
  this.optionAdd={
    name:this.newOption,
    champOperationId:this.champ.id
  }
  console.log(this.optionAdd)
  this.optionAdd;
  this.champ.options.push(this.optionAdd)
  console.log(this.optionAdd)
  /*this.operationService.addOption(this.optionAdd).subscribe({
    next:(result)=>{
      console.log(result);
      this.searchChamp();
    },
    complete:()=>{},
    error:(err)=>{
      console.log(err)
    }
  })*/

 console.log(this.champ.options)
 this.newOption='';
 console.log(this.champ.options)
}

searchRespon(idOperation:number){
  this.operationService.searchResponsable(idOperation).subscribe({
    next:(result)=>{
      this.responsUsers=result.data;
      console.log(this.responsUsers)

    },
    complete:()=>{},
    error:(error)=>{
      console.log(error);
    }
  })
}



retirerUser(user:User){
  console.log(user);
  console.log(this.id)
  this.operationsIds.operationsIds = []; // Initialiser si nécessaire
  this.confirmationService.confirm({
    message: 'Voulez-vous vraiment lui retirer de cette opération?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => { 
   /* this.operationService.searchResponsable(this.id  || 0).subscribe({
      next:(result)=>{
        this.responsUsers=result.data;
        console.log(this.responsUsers);
        this.responsUsers=this.responsUsers.filter(u=>u.id!==user.id);
        console.log(this.responsUsers);
        for(let i=0;i<this.responsUsers.length;i++){
          console.log(this.responsUsers[i])
          this.operationsIds.operationsIds = []; // Initialiser si nécessaire

          if(this.responsUsers[i].id){
    
            this.operationsIds.operationsIds.push(this.id || 0)
            console.log(this.operationsIds);
            this.userService.assigneroperation(this.operationsIds,this.responsUsers[i].id).subscribe({
              complete:()=>{},
              next:(result)=>{
                console.log(result+"Utilisateur modifié avec succès");
               // this.searchUser();
              },
              error:(error)=>{
                console.log(error);
              }
          
            });
          }    
          console.log( this.operationsIds.operationsIds);   
          
       
        }
      },
      complete:()=>{},
      error:(error)=>{
        console.log(error);
      }
    })*/
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{

    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
  });

}


groupeUser(operation:any){
  // this.disable=false;
  // console.log(this.disable)
 this.operation=operation;
 console.log(this.operation);

     this.userService.userOrganisation().subscribe({
       complete:()=>{},
       next:(result)=>{
        console.log(result)
         this.usergroup1=result.data;
         if(this.usergroup1){
           this.operationService.searchResponsable(this.operation.id || 0).subscribe({
             next:(result)=>{
               this.usergroup=result.data;
               if(this.usergroup){
                 this.usergroup1 = this.usergroup1.filter(u => !this.usergroup.some(group => group.id === u.id));
                 console.log(this.usergroup);
                 console.log(this.usergroup1)
               }
             
             },
             complete:()=>{},
             error:(error)=>{
               console.log(error);
             }
           })
         }
      
       },
       error:(error)=>{
         console.log(error);
       }
     });
     this.operationsIds={};
     this.listeUser=true;
    
  
 }


 userSelet(){
  this.listeUser=false;
  console.log(this.usergroup);
  this.operationsIds.operationsIds = []; // Initialiser si nécessaire    
  for(let i=0;i<this.usergroup.length;i++){
    console.log(this.usergroup[i])
    if(this.usergroup[i].id){
    this.userService.operationInfo(this.usergroup[i].id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data);
        for(let i=0;i<result.data.length;i++){
          this.operationsIds.operationsIds ?.push(result.data[i].id); // Initialiser si nécessaire
          console.log(this.operationsIds)
        }
        this.operationsIds.operationsIds?.push(this.operation.id || 0);
        console.log(this.operationsIds);
        this.userService.assigneroperation(this.operationsIds,this.usergroup[i].id).subscribe({
          complete:()=>{},
          next:(result)=>{
            console.log(result +"Utilisateur modifié avec succès");
           // this.searchUser();
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
  //  console.log(this.selectedOperation);

 //   console.log( this.operationsIds.operationsIds);   
    
 
  }
}

retourPage(){
  this.location.back();
}

}
