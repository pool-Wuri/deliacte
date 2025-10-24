import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { DemandeProcedur, Procedure } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Location } from '@angular/common';
import { ChampEntite, Entite } from 'src/app/core/models/entite.modele';
import { EntiteService } from 'src/app/core/services/entite.service';

@Component({
  selector: 'app-demande-page',
  templateUrl: './demande-page.component.html',
  styleUrls: ['./demande-page.component.scss']
})
export class DemandePageComponent {
  id:number | undefined;
  procedure=new Procedure;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;
  demandeFor= new Array<DemandeProcedur>();
  demandeInfos=new DemandeProcedur;
  selectedOption: string | null = null; // Option sélectionnée
  submitted: boolean=false;

  TEXT="TEXT";
  CHECKBOX="CHECKBOX"
  TEXTAREA="TEXTAREA"
  RADIO="RADIO"
  SELECT="SELECT"
  FILE="FILE"
  IMAGE="IMAGE"
  PDF="PDF"
  PASSWORD="PASSWORD"
  EMAIL="EMAIL"
  NUMBER="NUMBER"
  RANGE="RANGE"
  DATE="DATE"
  TIME="TIME"
  DATETIME_LOCAL="DATETIME_LOCAL"
  MONTH="MONTH"
  WEEK="WEEK"
  SEARCH="SEARCH"
  HIDDEN="HIDDEN";
  user: User | null = null;
  infosDonnéAtraiter:any;
  traitement:any;
  data1:any;
  data: FormData = new FormData();
  file:any;
  indexchamp!:number;
  numDossier!:number;
  indexSave:number[]=[];
  champOperationId!:any;
  indexRequis:number[]=[];
  isDisabled=false;
  loading=false;
  radioValues: { [key: number]: string } = {};  // Stocke les valeurs des boutons radio par index
  procedureAff!:Procedure;
  entites=new Array <Entite>();
  champsEntites=new Array <ChampEntite>();
  constructor(private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,  private entiteService:EntiteService,
    private location: Location,
){

}
ngOnInit():void{
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
  }
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    this.getProcedure(this.id)
   }
  );
 //this.searchEntity()
 // this.searchChamp()
}

getProcedure(id?:number){
  this.traitement={};
  this.procedureService.get_Procedure(id).subscribe({
    next:(result)=>{
      this.procedureAff=result.data;
    },
    complete:()=>{},
    error:(err)=>{

    }
  })
  this.procedureService.get_Champ(id).subscribe({
    next: (result) => {
      this.numDossier = result.message;
      this.champs = result.data;
    //  this.champs.reverse()

     // console.log(this.champs)
      // Empêcher erreur si aucun champ
      if (!this.champs || this.champs.length === 0) {
        this.demandeFor = [];
        return;
      }
  
      this.traitement.operationId = this.champs[0].operationId;
  
      this.operationService.get_Procedure(this.champs[0].operationId).subscribe({
        next: (res) => {
          this.traitement.status = res.data.verbeOperation;
        }
      });
  
      this.traitement.commentaire = "";
      this.traitement.isActive = false;
  
      // Initialiser demandeFor avec les bons champs
      this.demandeFor = this.champs.map(champ => ({
        name: '', // Valeur vide par défaut
        champOperationId: champ.id
      }));
  
     
    }
  });
  
}

infosVerifier(){
  this.isDisabled=!this.isDisabled;
}

onFileChange(event: any, index: number) {
  if(this.demandeFor[index]){
   this.champOperationId= this.demandeFor[index]?.champOperationId;
  }
  const file = event.target.files[0];
    this.indexchamp=index;
      if (file) {
        this.file=file;
      } else {
      }


}

saveFile(){
  this.loading=true;
  this.data.append('file', this.file, this.file.name );
  this.data.append('champOperationId', this.champOperationId.toString());
  this.procedureService.saveDoc(this.data,this.numDossier).subscribe({
    complete:()=>{},
    next:(result)=>{
      if(result){
        this.indexSave.push(this.indexchamp);
        this.file={};
        this.data.delete('file');
        this.data.delete('champOperationId');
      }
      alert("succès enrégistrement fichier");
      this.loading=false;

    },
    error:(err)=>{
    }
  
  });
}

searchOperation():void{
  this.operationService.search_Procedure("").subscribe({
    next:(value)=>{
      this.operations=value;
      this.operations=this.operations.filter(u=>u.procedureId==this.id);
    },
    complete:()=>{},
    error:(err)=>{}
  });
 
 
}

searchChamp(){
  this.operationService.searchChamp("").subscribe({
    next:(value)=>{
      this.champs=value;
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
 
}


onOptionChange(option: string, index: number) {
  this.selectedOption = option;
  this.demandeFor[index].name = option;
}

updateCheckbox(index: number) {
  this.demandeFor[index].name = "";
}


finDemande(){
    this.indexRequis=[]; // pour la verification des champs requis
    let tousVrais = false;  // On suppose d'abord que tous les éléments sont vrais 
    for(let i=0;i<this.champs.length;i++){
      if(this.champs[i].isRequired){
        this.indexRequis.push(i);
      }
    }
    if(this.indexRequis.length==0){
      tousVrais=true;
    }
    else{
      for(let i=0;i<this.indexRequis.length;i++){
        if(this.demandeFor[this.indexRequis[i]].name){
          tousVrais = true;  // Si un élément est faux, on met tousVrais à false
          break;  //

        }
      }
    }
    this.traitement.isActive=true;
    this.indexSave.sort((a, b) => b - a);
    this.submitted=true;
    for(let i=0;i<this.indexSave.length;i++){
      this.demandeFor.splice(this.indexSave[i],1);
    }
    this.data1 = {
        traitement: this.traitement,
        dossiers: this.demandeFor
    }
  //  this.saveFile();
    //const data: FormData = new FormData();
    if(tousVrais){
     this.confirmationService.confirm({
      message: 'Voulez-vous vraiment soumettre ce dossier?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.procedureService.get_Procedure(this.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.procedure=result.data;
          this.procedureService.get_Champ(this.id).subscribe({
            next:(result)=>{
              this.procedureService.saveDemande(this.data1,this.numDossier).subscribe({
                next:(result)=>{  
                  this.messageService.add({severity:'success', summary: 'Succès', detail: 'Demande faite avec succès', life: 3000});  
                  this.router.navigate(['/deliacte/dossier/list']);
                if(result){
                    this.loading=false;
                    this.messageService.add({severity:'error', summary: 'Erreur', detail: "Demande créée avec succès", life: 3000});
                  }
                },
                complete:()=>{
                },
                error:(error)=>{
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: error?.message || 'Une erreur est survenue',
                    life: 3000
                  });
                }
              });
            },
            complete:()=>{},
            error:(error)=>{
              this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});

            }
          });
         
        },
        error:(error)=>{
         this.messageService.add({severity:'error', summary: 'Erreur', detail: error.code, life: 3000});

        }
      });        
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'error', detail: 'Interruption demande', life: 3000});
    }
      });
    }

}

retourPage(){
  this.router.navigate(['/deliacte/dossier/list']);

 // this.location.back();
}


/*searchEntity(){
  this.entiteService.search_Entite().subscribe({
    complete:()=>{},
    next:(result)=>{
      this.entiteService.searchChamp().subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result)
          this.champsEntites=result.data;
          console.log(this.champsEntites)
        },
        error:(err)=>{
          console.log(err)
        }
  
  
      })
      if(result.status==201 || result.status==200){
          setTimeout(() => {
            this.loading=false;
            this.entites=result.data;
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
}*/

}
