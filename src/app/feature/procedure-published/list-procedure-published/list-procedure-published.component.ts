import { Component } from '@angular/core';
import { Modal } from 'flowbite';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { ChampOperation } from 'src/app/core/models/champOperation.model';

@Component({
  selector: 'app-list-procedure-published',
  templateUrl: './list-procedure-published.component.html',
  styleUrls: ['./list-procedure-published.component.scss']
})
export class ListProcedurePublishedComponent {

  procedures=new Array <Procedure>();

  statuts:any[]=[{value:"ARCHIVED",label:"Archivée"},{value:"DRAFT",label:"Brouillon"},{value:"PUBLISHED",label:"Publiée"}]
  statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération

 
  ProcedureStatus: any;
  demandeFor:boolean=false;
  procedure: Procedure[] = [];
  selectProcedure=new Procedure;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;
  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }

  constructor(
    private ProcedureService: ProcedureService,
    private router: Router,
    private route: ActivatedRoute, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private operationService:OperationService,

  ) {}


  ngOnInit(): void {
    this.search_Procedure();
   }

   search_Procedure():void{
    this.ProcedureService.search_ProcedurePublier("PUBLISHED").subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"procedure total");
        this.procedures=result.data;
       // this.procedures=this.procedures.filter(u=>u.status === 'PUBLISHED');
        console.log(this.procedures);
      },
      error:(error)=>{
        console.log(error);
      }
  
    })

   
   }

   fermerModel(){
    this.demandeFor=false;
  }

   soumettre(): void {
    
   }

   faireDemande(procedure:any){
    this.demandeFor=true;
    console.log(procedure.id);
    this.router.navigate(['/deliacte/procedure-published/demandePage',procedure.id])

    this.searchOperation();
   }

   searchOperation():void{
    this.operationService.search_Procedure("").subscribe({
      next:(value)=>{
        this.operations=value;
        this.operations=this.operations.filter(u=>u.name === "SOUMISSION");
        this.operation=this.operations[0]
        console.log(this.operations);
        this.operationService.searchChamp("").subscribe({
          next:(value)=>{
            this.champs=value;
            //this.champs=this.champs.filter(u=>u.operationId===1)
            console.log(this.champs);
         
          },
          complete:()=>{},
          error:(err)=>{}
        })
      },
      complete:()=>{},
      error:(err)=>{}
    });
   
   
  }


}
