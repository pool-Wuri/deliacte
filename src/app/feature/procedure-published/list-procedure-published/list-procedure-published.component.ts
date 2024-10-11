import { Component } from '@angular/core';
import { Modal } from 'flowbite';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';

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
  procedure: Procedure[] = [];
  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }

  constructor(
    private ProcedureService: ProcedureService,
    private router: Router,
    private route: ActivatedRoute, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}


  ngOnInit(): void {
    this.search_Procedure();
   }

   search_Procedure():void{
    this.ProcedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"procedure total");
        this.procedures=result;
        this.procedures=this.procedures.filter(u=>u.status === 'PUBLISHED');
        console.log(this.procedures);
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
   }

  

   soumettre(): void {
    
   }

}
