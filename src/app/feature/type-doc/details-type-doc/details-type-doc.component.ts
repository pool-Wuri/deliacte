import { Component } from '@angular/core';
import { TypeDoc } from 'src/app/core/models/typeDoc-model';
import { TypeDocService } from 'src/app/core/services/type-doc.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-type-doc',
  templateUrl: './details-type-doc.component.html',
  styleUrls: ['./details-type-doc.component.scss']
})
export class DetailsTypeDocComponent {

  id:number | undefined;
  Typedoc=new TypeDoc;
  constructor(private route:ActivatedRoute,
      private TypeDocService:TypeDocService
  ){}

  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
      this.getTypedoc(this.id)
     }
    );
  }

  getTypedoc(id?:number){
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
  }

}
