import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
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
  champs=new Array <ChampType>();
  constructor(private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService
){

}
ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
    this.getProcedure(this.id)
   }
  );
  this.searchChamp();
}

getProcedure(id?:number){
  this.operationService.get_Procedure(id).subscribe({
    complete:()=>{},
    next:(result)=>{
     this.operation=result;
     this.procedureService.search_Procedure().subscribe({
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
    })
    },
    error:(er)=>{console.log("get_error_User")}
  })

  
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
