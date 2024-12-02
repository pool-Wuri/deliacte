import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';

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

  constructor(private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private confirmationService:ConfirmationService,
  private messageService:MessageService,
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
      console.log(this.operation)
      if(this.operation.procedure){
        this.procedureService.get_Procedure(this.operation.procedure.id).subscribe({
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
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
  });
 
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
      console.log(result)
      this.responsUsers=result.data
    },
    complete:()=>{},
    error:(error)=>{
      console.log(error);
    }
  })
}


}
