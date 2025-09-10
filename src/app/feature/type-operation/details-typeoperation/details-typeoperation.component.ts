import { Component } from '@angular/core';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { Route, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-details-typeoperation',
  templateUrl: './details-typeoperation.component.html',
  styleUrls: ['./details-typeoperation.component.scss']
})
export class DetailsTypeoperationComponent {

  id:number | undefined;
  TypeOperation=new TypeOperation;
  constructor(private route:ActivatedRoute, 
    private location: Location,
    private TypeOperationService:TypeOperationService){

}

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    this.getTypeoperation(this.id)
   }
  );
}

getTypeoperation(id?:number){
  this.TypeOperationService.get_Typeoperation(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      this.TypeOperation=result.data
      ;
    },
    error:(error)=>{
    }
  })
}

  retourPage(){
    this.location.back();
  }
}
