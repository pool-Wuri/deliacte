import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UploadEvent } from 'primeng/fileupload';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-procedure',
  templateUrl: './details-procedure.component.html',
  styleUrls: ['./details-procedure.component.scss']
})
export class DetailsProcedureComponent {

  id:number | undefined;
  procedure=new Procedure;
  utilisateurs=new Array <User> ();
  user: User | null = null;
  procedures=new Array <Procedure>();
  champs=new Array <ChampOperation>();
  loading:boolean=false;

  constructor(private route:ActivatedRoute,
      private procedureService:ProcedureService,
      private messageService: MessageService,
      private location: Location

  ){

  }
  ngOnInit():void{
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.getProcedure(this.id);
      this.getChamp(this.id);

     }
    );

  }

  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }

  getProcedure(id?:number){
    this.loading=true
    this.procedureService.getUserById(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        this.utilisateurs=result.data;
      },
      error:(er)=>{
      }
    })
    this.procedureService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.procedure=result.data;
          setTimeout(() => {
            this.loading=false;

          }, 2000);
          
        }
      },
      error:(error)=>{
        this.loading=false;
      }
    })
  }

  getChamp(id?:number){
    this.procedureService.get_Champ(id).subscribe({
      next:(result)=>{
        this.champs=result.data;
      },
      complete:()=>{},
      error:(erreur)=>{
      }
    })
  }
 
  onUpload(event: UploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
}

  retourPage(){
    this.location.back();
  }
}
