import { Component } from '@angular/core';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-typeoperation',
  templateUrl: './details-typeoperation.component.html',
  styleUrls: ['./details-typeoperation.component.scss']
})
export class DetailsTypeoperationComponent {

  id:number | undefined;
  TypeOperation=new TypeOperation;
  constructor(private route:ActivatedRoute, 
    private TypeOperationService:TypeOperationService){

}

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
    this.getTypeoperation(this.id)
   }
  );
}

getTypeoperation(id?:number){
  this.TypeOperationService.get_Typeoperation(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result)
      this.TypeOperation=result;
    },
    error:(error)=>{
      console.log(error)
    }
  })
}

}
