import { Component } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-organisations',
  templateUrl: './details-organisations.component.html',
  styleUrls: ['./details-organisations.component.scss']
})
export class DetailsOrganisationsComponent {

  id:number | undefined;
  constructor(private route:ActivatedRoute){

}

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
   }
  );
}
}