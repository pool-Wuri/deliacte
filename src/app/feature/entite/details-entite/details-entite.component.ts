import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EntiteService } from 'src/app/core/services/entite.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Location } from '@angular/common';
import { ChampEntite, ChampType, Entite } from 'src/app/core/models/entite.modele';

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
  entiteChamp=new ChampEntite;
  addchamp:boolean=false;
  types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));
  newOption: string = '';
  optionAdd:any;
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
    //  console.log(this.id);
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
      // console.log(result);
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
        //console.log(result);
        this.champsEntites=result.data;
      },
      complete:()=>{},
      error:(error)=>{
        //console.log(error);
      }
    })
  }

  deleteSchamp(id:number){
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce champ?',
      header: 'Suppression',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.delete_Champ(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result.status==200 || result.status==201){
            this.searchChamp();
            setTimeout(() => {
              this.loading=false;
              this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
            }, 2000);
          }
          else{
            this.loading=false;
            this.messageService.add({severity:'error', summary: 'Suppression', detail: result.error, life: 3000});      
          }
        
        },
        error:(error)=>{
          this.loading=false;
        }
    
      })
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Suppression annulée', life: 3000});
    }
  });
  
  }

  editchamp(champ:ChampEntite){
    this.entiteChamp=champ;
    this.addchamp=true;
  }

  addOption(){
    this.optionAdd={
      name:this.newOption,
    }
    this.entiteChamp.entityObjectOptionFields.push(this.optionAdd);
     this.newOption='';
  }

  saveEdit(){
    this.confirmationService.confirm({
      message: 'Voulez-vous modifier ce champ?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.addchamp=false;
        this.entiteService.updateChamp(this.entiteChamp,this.entiteChamp.id).subscribe({
          next:(value)=>{
            if(value.status==201 || value.status==200){
              setTimeout(() => {
                this.searchChamp();
                this.loading=false;
                this.messageService.add({severity:'success', summary: 'Succès', detail: value.message, life: 3000});
              }, 2000);
            }
            else{
              this.messageService.add({severity:'error', summary: value.error, detail: value.message, life: 3000});
              this.loading=false;
            }
          },
          complete:()=>{},
          error:(erreur)=>{
            this.loading=false;
            this.messageService.add({severity:'error', summary: 'Modification', detail: erreur, life: 3000});        
          }
        })        
      },
      reject:()=>{
        //this.addboutton=false;
        this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Annuler la modification', life: 3000});
      }
    });
   
  }

  fermerModal(){
    this.addchamp=false;
    this.loading=false;
  }


}
