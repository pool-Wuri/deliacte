import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Procedure } from 'src/app/core/models/procedure.model';
import { ProcedureService } from 'src/app/core/services/procedure.service';

@Component({
  selector: 'app-details-procedure',
  templateUrl: './details-procedure.component.html',
  styleUrls: ['./details-procedure.component.scss']
})
export class DetailsProcedureComponent {

  id:number | undefined;
  procedure=new Procedure;
  constructor(private route:ActivatedRoute,
      private provedureService:ProcedureService
  ){

  }
  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
      this.getProcedure(this.id)
     }
    );
  }

  getProcedure(id?:number){
    this.provedureService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.procedure=result;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

 

}
