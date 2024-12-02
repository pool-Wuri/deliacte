import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { TypeDoc } from 'src/app/core/models/typeDoc-model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { TypeDocService } from 'src/app/core/services/type-doc.service';

@Component({
  selector: 'app-list-doc-type',
  templateUrl: './list-doc-type.component.html',
  styleUrls: ['./list-doc-type.component.scss']
})
export class ListDocTypeComponent {

typeDcs=new Array <TypeDoc>();
addbutton:boolean=false;
typeDoc=new TypeDoc;
title:string="";
modifBut:boolean=false;
validButtn:boolean=false;
procedurechoisi=new Procedure;
procedures=new Array<Procedure>();
operations=new Array <Operation>();
user: User | null = null;
doosierUser:any;
dossierAff:any;

procedure=new Procedure;
  champs=new Array <ChampOperation>();
operationTrou=new Array <Operation>();
proceduresTrou=new Array<Procedure>();
PROCEDURE_MANAGER='PROCEDURE_MANAGER';

constructor(
  private typeDocService:TypeDocService,
  private router:Router,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
  private procedureService:ProcedureService,
  private operationService:OperationService,


){
}

ngOnInit(): void {
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    console.log(this.user)
  }
  //this.searchType();
  this.getDossier();
  this.search_Procedure();
 }

 searchType():void{
  this.typeDocService.search_TypeDoc().subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result+"DOCTYPE total");
      this.typeDcs=result;
    },
    error:(error)=>{
      console.log(error);
    }

  })
 }

 ajouter(){
  this.addbutton=true;
  this.typeDoc={};
  this.modifBut=false;
  this.validButtn=true;
  this.title="Ajouter"
 }

 saveType(){
  this.confirmationService.confirm({
    message: 'Voulez-vous enregistrer cet type de document?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.typeDocService.saveTypeDoc(this.typeDoc).subscribe(
      {
        next:(result)=>{console.log(result)},
        complete:()=>{},
        error:(error)=>{console.log(error)}
      }
    );
    this.searchType();
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
  });
 }

 edit(type:TypeDoc){
  this.title="Modifier"
  this.typeDoc=type;
  this.addbutton=true;
  this.modifBut=true;
  this.validButtn=false;

 }


 modifier(){
 this.confirmationService.confirm({
    message: 'Voulez-vous modifier cet type de document?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.typeDocService.updateTypeDoc(this.typeDoc).subscribe(
      {
        next:(result)=>{console.log(result)},
        complete:()=>{},
        error:(error)=>{console.log(error)}
      }
    )
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});

 }

 fermerModal(){
  this.addbutton=false;
 }

 supprimerType(type:TypeDoc){
  this.confirmationService.confirm({
    message: 'Voulez-vous vraiment supprimer cet type?',
    header: 'Suppression',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.typeDocService.delete_typeDoc(type.id).subscribe({
      complete:()=>{},
      next:(result)=>{
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.searchType();
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
 }


 detailsType(dossier: any) {
  console.log(dossier)
  this.router.navigate(['/deliacte/dossier/details', dossier.numeroDossier]);
}


getDossier(){
  if(this.user?.role=="CITOYEN"){
    this.typeDocService.searchDoosier().subscribe({
      complete:()=>{},
      next:(result)=>{
        this.doosierUser=result.data;
       // this.dossierAff=result;
     //   this.doosierUser=this.doosierUser.filter((u: { id: any; })=>u.id==this.doosierUser[0].id)
        console.log(this.doosierUser);
    /*    for(let i=0;i<this.doosierUser.length;i++){
          this.operationService.get_Procedure(this.doosierUser[i].champOperation.operationId).subscribe({
            complete:()=>{},
            next:(result)=>{
             // console.log(result.data+" total");
              this.operationTrou.push(result.data);
              if(this.operationTrou){
                this.procedureService.get_Procedure(this.operationTrou[i].procedureId).subscribe({
                  complete:()=>{},
                  next:(result)=>{
                    console.log(result.data+" total");
                    this.proceduresTrou.push(result.data);
                   // console.log(this.proceduresTrou)
                  },
                    error:(error)=>{
                      console.log(error);
                    }
  
                })
              }
              console.log(this.operationTrou)
            },
              error:(error)=>{
                console.log(error);
              }
          })
        }*/
       
      },
      error:(error)=>{
        console.log(error);
      }
  
    });
  }
}

searchOperation():void{
  this.operationService.search_Procedure("").subscribe({
    next:(value)=>{
      this.operations=value;
      this.operations.reverse();
      for(let i=0;i<this.operations.length;i++){
        this.procedureService.get_Procedure( this.operations[i].procedureId).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.operations[i].procedure=result;
      //console.log(result)    
    },
          error:(er)=>{console.log("get_error_User")}
        })
      }
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
 
}

search_Procedure():void{
  if(this.user?.role=="PROCEDURE_MANAGER"){
    this.procedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.procedures=result.data;
          console.log(this.procedures[0]+"procedure total");  
        }
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
  }
 
 }

 onSortChange(event: { value: any; }) {
  let proced = event.value;
  console.log(this.procedurechoisi);
  this.getProcedure();
  this.typeDocService.searchDoosierByProcedure(this.procedurechoisi.id || 0).subscribe({
    complete:()=>{},
    next:(result)=>{
   //   console.log(result.data+" total");
      this.doosierUser=result.data;
      console.log(this.doosierUser);
    
    },
    error:(error)=>{
      console.log(error);
    }

  });

  }

  
  getProcedure(id?:number){
    this.procedureService.get_Procedure(this.procedurechoisi.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.procedure=result;
        this.operationService.search_Procedure("").subscribe({
          next:(value)=>{
            this.operations=value;
            this.operations=this.operations.filter(u=>u.procedureId==this.procedurechoisi.id);
            this.operations=this.operations.filter(u=>u.name=="SOUMISSION");
            if(this.operations[0]){
              this.operationService.searchChamp("").subscribe({
                next:(value)=>{
                  this.champs=value;
                  this.champs=this.champs.filter(u=>u.operationId===this.operations[0].id)
                  console.log(this.champs)
                   
              
                },
                complete:()=>{},
                error:(err)=>{}
              })
            }
           
          
          },
          complete:()=>{},
          error:(err)=>{}
        });
       
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
