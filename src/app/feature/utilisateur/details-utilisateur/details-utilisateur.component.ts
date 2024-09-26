import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent {
  id:number | undefined;
  utilisateur=new User;
  constructor(private route:ActivatedRoute,
      private userService:UtilisateurService
  ){

  }
  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
      this.getUser(this.id)
     }
    );
  }

  getUser(id?:number){
    this.userService.get_User(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.utilisateur=result;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

}
