import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Procedure } from 'src/app/core/models/procedure.model';
import { ProcedureService } from 'src/app/core/services/procedure.service';

@Component({
  selector: 'app-list-procedure',
  templateUrl: './list-procedure.component.html',
  styleUrls: ['./list-procedure.component.scss']
})
export class ListProcedureComponent {
addboutton:boolean=false;
addUser:boolean=false;
editbutt:boolean=false;
title:string="";
procedures=new Array <Procedure>()
  constructor(
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private procedureService:ProcedureService
  ){}

  ngOnInit(): void {
    this.search_Procedure();
   }
   
   search_Procedure():void{
    this.procedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"procedure total");
        this.procedures=result;
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
   }

   ajouter(){
    this.addboutton=true;
    this.addUser=true;
    this.editbutt=false;
    this.title="Ajouter"
   }

   fermerModal(){
    this.addboutton=false;
    this.addUser=false;
    this.editbutt=false;
   }
}
