import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Procedure } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { ProcedureService } from 'src/app/core/services/procedure.service';

@Component({
  selector: 'app-details-procedure',
  templateUrl: './details-procedure.component.html',
  styleUrls: ['./details-procedure.component.scss']
})
export class DetailsProcedureComponent {

  id:number | undefined;
  procedure=new Procedure;
  utilisateurs=new Array <User> ();
  constructor(private route:ActivatedRoute,
      private procedureService:ProcedureService
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
    this.procedureService.getUserById(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        this.utilisateurs=result.date;
        console.log(this.utilisateurs)
      },
      error:(er)=>{console.log("get_error_User")}
    })

    this.procedureService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.procedure=result.data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

 

}
