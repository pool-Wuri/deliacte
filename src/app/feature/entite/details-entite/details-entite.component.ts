import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EntiteService } from 'src/app/core/services/entite.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Location } from '@angular/common';
import { ChampEntite, Entite } from 'src/app/core/models/entite.modele';

@Component({
  selector: 'app-details-entite',
  templateUrl: './details-entite.component.html',
  styleUrls: ['./details-entite.component.scss']
})
export class DetailsEntiteComponent {
  id:string | undefined;
  loading:boolean=false;
  entite=new Entite;
  champsEntites=new Array <ChampEntite>();

  constructor(
    private route:ActivatedRoute,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private userService:UtilisateurService,
    private location: Location,
    private entiteService:EntiteService,
){
}

ngOnInit():void{
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id);
    if(this.id){
      this.getEntite(this.id);
      this.searchChamp();
    }
   }
  );
 // this.searchChamp();
}

getEntite(id:string){
  this.entiteService.getEntityByEntity(id).subscribe({
    next:(result)=>{
      console.log(result);
      this.entite=result.data;
    },
    complete:()=>{},
    error:(error)=>{
      console.log(error);
    }

  })
}

retourPage(){
  this.location.back();
}

searchChamp(){
  this.entiteService.searchChamp().subscribe({
    next:(result)=>{
      console.log(result);
      this.champsEntites=result.data;
    },
    complete:()=>{},
    error:(error)=>{
      console.log(error);
    }
  })
}

getchampByEntity(id:string){
  this.entiteService.getChampByEntity(id).subscribe({
    next:(result)=>{
      console.log(result);
      this.champsEntites=result.data;
    },
    complete:()=>{},
    error:(error)=>{
      console.log(error);
    }
  })
}

}
