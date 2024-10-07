import { Component } from '@angular/core';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';

@Component({
  selector: 'app-list-operation',
  templateUrl: './list-operation.component.html',
  styleUrls: ['./list-operation.component.scss']
})
export class ListOperationComponent {
  addboutton:boolean=false;
  addUser:boolean=false;
  editbutt:boolean=false;
  title:string="";
  typeoperations=new Array <TypeOperation>()

constructor(
  private TypeOperationService: TypeOperationService,
){

}

ngOnInit(): void {  
  this.searchtypeoperation();
}

searchtypeoperation():void{
  this.TypeOperationService.search_Typeoperation().subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result+"Type opération total");
      this.typeoperations=result;
    },
    error:(error)=>{
      console.log(error);
    }

  })

 }
 
ajouter(){
  this.addboutton=true;
    this.addUser=true;
    this.editbutt=false;
    this.title="Ajouter";
}

fermerModal(){
  this.addboutton=false;
  this.addUser=false;
  this.editbutt=false;
 }

}
