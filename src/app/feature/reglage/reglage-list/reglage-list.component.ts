import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { ChampEntite, Entite } from 'src/app/core/models/entite.modele';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { TypeOperation } from 'src/app/core/models/type-operation';
import { OperationAssign, User } from 'src/app/core/models/user.model';
import { EntiteService } from 'src/app/core/services/entite.service';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { TypeOperationService } from 'src/app/core/services/type-operation.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-reglage-list',
  templateUrl: './reglage-list.component.html',
  styleUrls: ['./reglage-list.component.scss']
})
export class ReglageListComponent {

  //-------------------Entite-----------------------
  entite= new Entite;
  entites=new Array <Entite>();
  entitesUser:any;
  entiteChamp=new ChampEntite;
  newOption: string = '';
  optionAdd:any;
  champsEntites=new Array <ChampEntite>();
  expandedRowsEntite: { [key: string]: boolean } = {};
  expandedRowKeys: { [key: string]: boolean } = {};
  expandedFieldKeys: { [key: string]: boolean } = {};
  userInfos=new User;
  currentPage: number = 0;
  itemsPerPage: number = 2; 
  user: User | null = null;
  loading:boolean=false;
  entityEnregistre:any

  constructor(
    private TypeOperationService: TypeOperationService,
    private operationService:OperationService,
    private entiteService:EntiteService,
    private procedureService:ProcedureService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private router:Router,

  ){

  }

  ngOnInit(): void {   
  const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
   ;
   this.searchEntiteUser();
  }


 

  searchEntiteUser(){
    this.loading=true;
    this.entiteService.search_EntiteUser().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result.status==201 || result.status==200){
            setTimeout(() => {
              this.loading=false;
              this.entitesUser=result.data.entityObjects;
              this.userInfos=result.data.user
            console.log(this.entitesUser)
              this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
            }, 2000);
          }
          else{
            this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
            this.loading=false;
      }
    },
      error:(error)=>{
        this.loading=false;
        this.messageService.add({severity:'error', summary: "Erreur", detail: error, life: 3000});

      }

    })
  }

  prevPage() {
    if (this.currentPage > 0) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.entitesUser.length - 1) this.currentPage++;
  }

  sauvegarder(){
    console.log("=== Données entitesUser ===", this.entitesUser);

  this.entityEnregistre = this.entitesUser.flatMap((entity: any) =>
    entity.entityObjectFields.map((champ: any) => ({
      name: champ.value ?? "",              // valeur saisie dans le champ
      entityObjectFieldId: champ.id         // id du champ
    }))
  );

  console.log("=== Données formatées ===", this.entityEnregistre);

  this.confirmationService.confirm({
    message: 'Voulez-vous enregistrer ces informations?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.loading=true;
    this.entiteService.saveEntiteUser(this.entityEnregistre).subscribe({
      next:(value)=>{
        console.log(value)
          if(value.status==201 || value.status==200){
            setTimeout(() => {
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
        this.messageService.add({severity:'error', summary: 'Erreur', detail: erreur, life: 3000});

      }
    })
  },
  reject:()=>{
    //this.addboutton=false;
  
    this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Opération non enregistrée', life: 3000});
    this.loading=false;
  }

  });
  }

  onFileChange(event: any, index: number,pageId:number) {
    console.log(index);
    console.log(event);
    console.log(pageId);
    console.log(this.entitesUser[pageId])
    console.log(this.entitesUser[pageId].entityObjectFields[index]);
    this.champEntiteid=this.entitesUser[pageId].entityObjectFields[index].id
    const file = event.target.files[0];
    if (file) {
      this.file=file;
    } else {
    }
  
  }
  data: FormData = new FormData();
  file:any;
  champEntiteid:string="";
  
  saveFile(){
    this.loading=true;
    console.log( this.champEntiteid.toString())
    this.data.append('file', this.file, this.file.name );
    this.data.append('entityObjectFieldId', this.champEntiteid.toString());
    console.log(this.data);
    this.entiteService.saveDoc(this.data).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        if(result==200 || result==201){
          setTimeout(() => {
            
          }, 2000);
          this.file={};
          this.data.delete('file');
          this.data.delete('entityObjectFieldId');
        }
        alert("succès enrégistrement fichier");
        this.loading=false;
  
      },
      error:(err)=>{
      }
    
    });
  }
 

}
