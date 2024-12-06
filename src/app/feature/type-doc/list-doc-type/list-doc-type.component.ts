import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { DemandeProcedur, Procedure } from 'src/app/core/models/procedure.model';
import { TypeDoc } from 'src/app/core/models/typeDoc-model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { TypeDocService } from 'src/app/core/services/type-doc.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { environment } from 'src/environnements/environment';

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
dossier:any;
displayBasic: boolean=false;


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


constructor(
  private typeDocService:TypeDocService,
  private router:Router,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
  private procedureService:ProcedureService,
  private operationService:OperationService,
  private userService:UtilisateurService


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

 fermerModal(){
  this.addbutton=false;
 }


 detailsType(dossier: any) {
  console.log(dossier)
  this.router.navigate(['/deliacte/dossier/details', dossier.numeroDossier]);
}


modifierDossier(dossier: any) {
  console.log(dossier)
  this.displayBasic=true;
  this.typeDocService.getDossier(dossier.numeroDossier).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result+" total");
     this.dossier=result.data;
     console.log(result)
    },
    error:(error)=>{
      console.log(error);
    }

  })
 // this.router.navigate(['/deliacte/dossier/details', dossier.numeroDossier]);
}

editDossier(){

}

getDossier(){
  if(this.user?.role=="CITOYEN"){
    this.typeDocService.searchDoosier().subscribe({
      complete:()=>{},
      next:(result)=>{
        this.doosierUser=result.data;
        console.log(this.doosierUser);
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
  else{
    this.userService.operationInfo(this.user?.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data);
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.typeDocService.getDossierAtraiter().subscribe({
      complete:()=>{},
      next:(result)=>{
        this.doosierUser=result.data;
        console.log(this.doosierUser);
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


}
