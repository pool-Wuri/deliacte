import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Operation } from 'src/app/core/models/operation.model';
import { DemandeProcedur, Procedure } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';

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

  constructor(private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,


){

}
ngOnInit():void{
  const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
    console.log(this.user)
  }
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
    this.getProcedure(this.id)
   }
  );
 
 // this.searchChamp()
}

getProcedure(id?:number){
  this.procedureService.get_Procedure(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result)
      this.procedure=result;
      this.operationService.search_Procedure("").subscribe({
        next:(value)=>{
          this.operations=value;
          this.operations=this.operations.filter(u=>u.procedureId==this.id);
          this.operations=this.operations.filter(u=>u.name=="SOUMISSION");
          if(this.operations[0]){
            this.operationService.searchChamp("").subscribe({
              next:(value)=>{
                this.champs=value;
                this.champs=this.champs.filter(u=>u.operationId===this.operations[0].id)
                console.log(this.champs)
               
                console.log(this.champs)

                this.demandeFor = this.champs.map(champ => ({
                  name: '',
                  citoyenId: this.user?.id,
                  champOperationId: champ.id // ou une autre logique
                }));
                console.log('Champs:', this.champs);
                console.log('DemandeFor:', this.demandeFor);
              },
              complete:()=>{},
              error:(err)=>{}
            })
          }
         
        
        },
        complete:()=>{},
        error:(err)=>{}
      });
     
    },
    error:(error)=>{
      console.log(error)
    }
  })
}

onFileChange(event: any, index: number) {
  const file = event.target.files[0];
  console.log(file)
  // Traitement du fichier, par exemple :
}

searchOperation():void{
  this.operationService.search_Procedure("").subscribe({
    next:(value)=>{
      this.operations=value;
      this.operations=this.operations.filter(u=>u.procedureId==this.id);
      console.log(this.operations);
    /*  this.operationService.searchChamp("").subscribe({
        next:(value)=>{
          this.champs=value;
          //this.champs=this.champs.filter(u=>u.operationId===1)
          console.log(this.champs);
       
        },
        complete:()=>{},
        error:(err)=>{}
      })*/
    },
    complete:()=>{},
    error:(err)=>{}
  });
 
 
}

searchChamp(){
  this.operationService.searchChamp("").subscribe({
    next:(value)=>{
      this.champs=value;
      console.log(this.champs);
   
    },
    complete:()=>{},
    error:(err)=>{}
  })
 
}

selectedOption: string | null = null; // Option sélectionnée

onOptionChange(option: string, index: number) {
  console.log(index)
  console.log('Option sélectionnée:', option);
  this.selectedOption = option;
  console.log(option)
  this.demandeFor[index].name = option;
  console.log(this.demandeFor[index])
  // Ajoutez votre logique ici, par exemple, mettre à jour une autre variable ou état
}


updateCheckbox(index: number) {
  console.log(this.demandeFor[index])
  // Toggle l'état de la case à cocher
  this.demandeFor[index].name = "";
}

finDemande(){
  console.log(this.demandeFor)
 /* this.confirmationService.confirm({
    message: 'Voulez-vous vraiment lui retirer ce droit?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.procedureService.saveDemande(this.demandeFor).subscribe({
      next:(result)=>{
        console.log(result);
      },
      complete:()=>{
  
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.router.navigate(['/deliacte/dossier/list'])

    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{

    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});*/

}

}
