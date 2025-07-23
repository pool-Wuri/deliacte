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
      console.log(this.user)
    }
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      console.log(this.id)
      this.getProcedure(this.id);
      this.getChamp(this.id);

     }
    );

  }

  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }
  getProcedure(id?:number){
    this.procedureService.getUserById(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.utilisateurs=result.data;
        console.log(this.utilisateurs)
      },
      error:(er)=>{console.log("get_error_User")}
    })

    this.procedureService.get_Procedure(id).subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result)
        this.procedure=result.data;
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  getChamp(id?:number){
    this.procedureService.get_Champ(id).subscribe({
      next:(result)=>{
        console.log(result);
        this.champs=result.data;
        console.log(this.champs)
      },
      complete:()=>{},
      error:(erreur)=>{
        console.log(erreur)
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
