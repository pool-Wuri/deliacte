import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';

@Component({
  selector: 'app-demande-page',
  templateUrl: './demande-page.component.html',
  styleUrls: ['./demande-page.component.scss']
})
export class DemandePageComponent {
  id:number | undefined;
  procedure=new Procedure;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;
  TEXT="TEXT";
  CHECKBOX="CHECKBOX"
  constructor(private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService,

){

}
ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
    this.getProcedure(this.id)
   }
  );
 // this.searchChamp()
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
          console.log(this.operations);
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
          console.log(this.champs)
       
        
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

searchOperation():void{
  this.operationService.search_Procedure("").subscribe({
    next:(value)=>{
      this.operations=value;
      this.operations=this.operations.filter(u=>u.procedureId==this.id);
      console.log(this.operations);
    /*  this.operationService.searchChamp("").subscribe({
        next:(value)=>{
          this.champs=value;
          //this.champs=this.champs.filter(u=>u.operationId===1)
          console.log(this.champs);
       
        },
        complete:()=>{},
        error:(err)=>{}
      })*/
    },
    complete:()=>{},
    error:(err)=>{}
  });
 
 
}

searchChamp(){
  this.operationService.searchChamp("").subscribe({
    next:(value)=>{
      this.champs=value;
      console.log(this.champs);
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
 
}

}
