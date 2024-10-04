import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypeDoc } from 'src/app/core/models/typeDoc-model';
import { TypeDocService } from 'src/app/core/services/type-doc.service';

@Component({
  selector: 'app-list-doc-type',
  templateUrl: './list-doc-type.component.html',
  styleUrls: ['./list-doc-type.component.scss']
})
export class ListDocTypeComponent {

typeDcs=new Array <TypeDoc>();
addbutton:boolean=false;
typeDoc=new TypeDoc;
title:string="";
modifBut:boolean=false;
validButtn:boolean=false;

constructor(
  private typeDocService:TypeDocService,
  private router:Router,
  private confirmationService: ConfirmationService,
  private messageService: MessageService,
){
}

ngOnInit(): void {
  this.searchType();
 }

 searchType():void{
  this.typeDocService.search_TypeDoc().subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result+"DOCTYPE total");
      this.typeDcs=result;
    },
    error:(error)=>{
      console.log(error);
    }

  })
 }

 ajouter(){
  this.addbutton=true;
  this.typeDoc={};
  this.modifBut=false;
  this.validButtn=true;
  this.title="Ajouter"
 }

 saveType(){
  this.confirmationService.confirm({
    message: 'Voulez-vous enregistrer cet type de document?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.typeDocService.saveTypeDoc(this.typeDoc).subscribe(
      {
        next:(result)=>{console.log(result)},
        complete:()=>{},
        error:(error)=>{console.log(error)}
      }
    );
    this.searchType();
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
  });
 }

 edit(type:TypeDoc){
  this.title="Modifier"
  this.typeDoc=type;
  this.addbutton=true;
  this.modifBut=true;
  this.validButtn=false;

 }


 modifier(){
 this.confirmationService.confirm({
    message: 'Voulez-vous modifier cet type de document?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.typeDocService.updateTypeDoc(this.typeDoc).subscribe(
      {
        next:(result)=>{console.log(result)},
        complete:()=>{},
        error:(error)=>{console.log(error)}
      }
    )
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
      //Actual logic to perform a confirmation
      
  },
  reject:()=>{
    this.addbutton=false;
    this.modifBut=false;
    this.validButtn=false;
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});

 }

 fermerModal(){
  this.addbutton=false;
 }

 supprimerType(type:TypeDoc){
  this.confirmationService.confirm({
    message: 'Voulez-vous vraiment supprimer cet type?',
    header: 'Suppression',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
  accept: () => {
    this.typeDocService.delete_typeDoc(type.id).subscribe({
      complete:()=>{},
      next:(result)=>{
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.searchType();
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});      
  },
  reject:()=>{
    this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
  }
});
 }


 detailsType(Typedoc: TypeDoc) {
  this.router.navigate(['/deliacte/typeDoc/details', Typedoc.id]);
}

}
