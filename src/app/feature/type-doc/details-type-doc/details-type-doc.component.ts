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

  dossier:any;
  constructor(private route:ActivatedRoute,
      private typeDocService:TypeDocService,
      private procedureService:ProcedureService,
      private operationService:OperationService,

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
     this.getProcedure(this.id)

     }
    );
  }

  getDossier(id?:number){
    this.typeDocService.searchDoosier(id,this.user?.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+" total");
       this.dossier=result;
       console.log(result)
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
  }


  getProcedure(id?:number){
    this.procedureService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.procedure=result;
        this.operationService.search_Procedure("").subscribe({
          next:(value)=>{
            this.operations=value;
            this.operations=this.operations.filter(u=>u.procedureId==this.id);
            this.operations=this.operations.filter(u=>u.name=="SOUMISSION");
            if(this.operations[0]){
              this.operationService.searchChamp("").subscribe({
                next:(value)=>{
                  this.champs=value;
                  this.champs=this.champs.filter(u=>u.operationId===this.operations[0].id)
                  console.log(this.champs)
                 
                  console.log(this.champs)
                  this.demandeFor = this.champs.map(champ => ({
                    name: '',
                    citoyenId: this.user?.id,
                    champOperationId: champ.id // ou une autre logique
                  }));
                  this.typeDocService.searchDoosier(id,this.user?.id).subscribe({
                    complete:()=>{},
                    next:(result)=>{
                      console.log(result+" total");
                     this.dossier=result;
                     for(let i=0;i<this.dossier.length;i++){
                      this.demandeFor[i].name=this.dossier[i].name
                     }
                     console.log(result)
                    },
                    error:(error)=>{
                      console.log(error);
                    }
                
                  })
                 
                  console.log('Champs:', this.champs);
                  console.log('DemandeFor:', this.demandeFor);
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
  selectedOption: string | null = null; // Option sélectionnée

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
