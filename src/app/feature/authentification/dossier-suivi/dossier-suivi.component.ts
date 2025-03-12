import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { TypeDocService } from 'src/app/core/services/type-doc.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';

@Component({
  selector: 'app-dossier-suivi',
  templateUrl: './dossier-suivi.component.html',
  styleUrls: ['./dossier-suivi.component.scss']
})
export class DossierSuiviComponent {
  id:number | undefined;
  dossierTraiter:any[]=[];

  dossier:any;
  events1!: any[];
  operationPrecedent=new Operation;
  operationnow=new Operation;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;
    events2!: any[];
    data1:any;
    indexchamp!:number;
    numDossier!:number;
    indexSave:number[]=[];
    traitement:any;
    isDisabled = true; 
    document:any[]=[];
  constructor(private route:ActivatedRoute,
    private typeDocService:TypeDocService,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private userService:UtilisateurService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,

){}

ngOnInit():void{
 
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
  /// this.getProcedure(this.id)
this.getDossier(this.id)
   }
  );
  this.events2 = [
    "2020", "2021", "2022", "2023"
];
}

getDossier(id?:number){
  let limit: number | null = null;
  this.typeDocService.getDossierPour(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result.data.traitement+" total");
     this.dossier=result.data.dossiers;
     console.log(this.dossier.length)
     let i = 0;
     console.log(i);
     while (i < this.dossier.length - 1) { 
      console.log(this.dossier[i + 1].champOperation.operationId) 
      console.log(this.dossier[i].champOperation.operationId)// Vérifie que i+1 reste dans les limites
         if (this.dossier[i + 1].champOperation.operationId !== this.dossier[0].champOperation.operationId) {
             this.dossierTraiter.push(this.dossier[i + 1]);
             this.dossier.splice(i + 1, 1);  // Supprime un élément à l'index i+1
             console.log(this.dossierTraiter);
             console.log(this.dossier);
         } else {
             i++;  // Incrémente seulement si aucun élément n'est supprimé
         }
     }
     
     for(let i=0;i<this.dossier.length;i++){
      if (this.dossier[i].champOperation.inputType === "PDF" ||
        this.dossier[i].champOperation.inputType === "FILE" ||
        this.dossier[i].champOperation.inputType === "IMAGE") {
                this.document.push(this.dossier[i]);
        console.log(this.document)
      }
     }
     console.log(this.dossier);
     this.traitement=result.data.traitement;
     console.log(this.traitement)
  //  console.log(this.getOperation(this.dossier[0].champOperation.operationId)) 
  this.operationService.get_Procedure(this.dossier[0].champOperation.operationId).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result.data)
    this.procedureService.get_Procedure(result.data.procedureId).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result.data);
        this.operationService.get_Operation(result.data.id).subscribe({
          complete:()=>{},
          next:(result)=>{
            console.log(result.data);
            this.operations=result.data;
            this.events2= this.operations.map(operation => ({
              status: operation.verbeOperation,
              icon: 'pi pi-check-circle',        // Icône de PrimeNG (en texte)
              color: "#c8c8c8", // Gris par défaut
            }));

             for (let i = 0; i < this.events2.length; i++) {

              if(this.events2[i].status==this.traitement.status){
                this.events2[i].color = '#4caf50';
                limit = i;
                console.log(limit)
              }
            };
            if (limit !== null) {
              for (let i = 0; i <= limit; i++) {
                // Appliquer la même couleur aux événements avant le statut trouvé
                if (this.events2[i].color == '#c8c8c8') {  // Si la couleur a été modifiée
                  this.events2[i].color = this.events2[limit].color;
                }
              }
            }
            console.log(this.events2)

          },
          error:(error)=>{
            console.log(error)
          }
        });
      },
        error:(error)=>{
          console.log(error)
        }

    })
     
    },
    error:(error)=>{
      console.log(error)
    }
  });
    },
    error:(error)=>{
      console.log(error);
    }

  });
}


}
