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
  selector: 'app-entite-list',
  templateUrl: './entite-list.component.html',
  styleUrls: ['./entite-list.component.scss']
})
export class EntiteListComponent {

  addboutton:boolean=false;
  addUser:boolean=false;
  editbutt:boolean=false;
  title:string="";
  typeoperations=new Array <TypeOperation>();
  operations=new Array <Operation>();
operation=new Operation;
procedures=new Array<Procedure>();
procedure=new Procedure; 
user: User | null = null;
addchamp:boolean=false;
editchamp:boolean=false;
adddoctype:boolean=false;
champ=new ChampOperation;
loading:boolean=false;
types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));
disable:boolean=false;;
selectedOperation=new Array <Operation>();
utilisateurs=new Array <User>()
usergroup=new Array <User>()
usergroup1=new Array <User>()
proced:any;

listeUser:boolean=false;
list1: any[] | undefined;
list2: any[] | undefined;
  sortOrder!: number;
  operationsIds=new OperationAssign;
  sortField!: string;
  procedurechoisi=new Procedure;
  submitted: boolean=false;


  //-------------------Entite-----------------------
  entite= new Entite;
  entites=new Array <Entite>();
  entiteChamp=new ChampEntite;
  newOption: string = '';
  optionAdd:any;
  champsEntites=new Array <ChampEntite>();
  expandedRowsEntite: { [key: string]: boolean } = {};
  expandedRowKeys: { [key: string]: boolean } = {};
  expandedFieldKeys: { [key: string]: boolean } = {};

constructor(
  private TypeOperationService: TypeOperationService,
  private operationService:OperationService,
  private entiteService:EntiteService,
  private procedureService:ProcedureService,
  private confirmationService:ConfirmationService,
  private messageService:MessageService,
  private router:Router,
  private userService:UtilisateurService,
  


){

}

ngOnInit(): void {   
 const userData = localStorage.getItem('user');
  if (userData) {
    this.user = JSON.parse(userData);
  }
  this.searchEntite();
  this.searchChamp();

}

ajouter(){
  this.addboutton=true;
  this.addUser=true;
  this.editbutt=false;
  this.title="Formulaire d'ajout d'une entité";
  this.entite={};

}

saveEntite(){
  this.entite.isActive=false;
  this.entite.numeroOrdre=1;
  this.submitted=true;
  if(this.entite.name){
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cette entite?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.saveEntite(this.entite).subscribe({
        next:(value)=>{
            this.addboutton=false;
            if(value.status==201 || value.status==200){
              setTimeout(() => {
                this.loading=false;
                this.searchEntite();
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
      this.addboutton=true;
      this.addUser=true;
      this.editbutt=false;
      this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Opération non enregistrée', life: 3000});
      this.loading=false;
    }

    });
  }
  
 }

 searchEntite(){
  this.loading=true;
  this.entiteService.search_Entite().subscribe({
    complete:()=>{},
    next:(result)=>{
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
}


fermerModal(){
  this.addboutton=false;
  this.addUser=false;
  this.editbutt=false;
  this.addchamp=false;
  this.adddoctype=false;
  this.editchamp=false;
  this.loading=false;
 }

 edit(entite:Entite){
  this.addboutton = true; // Ouvre le modal
  this.addUser=false;
  this.editbutt=true;
  this.title="Modifier entité";
  this.entite=entite;
  
 }


 saveEdit(){
  this.entite.isActive=false;
  this.confirmationService.confirm({
    message: 'Voulez-vous modifier cette entité?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.updateEntite(this.entite,this.entite.id).subscribe({
        next:(value)=>{
          this.addboutton=false;
          this.editbutt=false;   
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
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Modification', detail: erreur, life: 3000});        
        }
      })        
    },
    reject:()=>{
      //this.addboutton=false;
      this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Annuler la modification', life: 3000});
    }
  });
 }

saveEditChamp(){
            console.log(this.entiteChamp);
  this.confirmationService.confirm({
    message: 'Voulez-vous modifier cet champ entité?',
    header: 'Confirmation',
    acceptLabel:'Oui',
    rejectLabel:'Non',
    icon: 'pi pi-exclamation-triangle',
    acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.updateChamp(this.entiteChamp,this.entiteChamp.id).subscribe({
        next:(value)=>{
          console.log(value);
          this.addboutton=false;
          this.editbutt=false;   
          this.addchamp=false;
          if(value.status==201 || value.status==200){
            setTimeout(() => {
              this.loading=false;
              this.searchEntite();
              this.searchChamp();
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
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Modification', detail: erreur, life: 3000});        
        }
      })        
    },
    reject:()=>{
      //this.addboutton=false;
      this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Annuler la modification', life: 3000});
    }
  });
 }


 detailsEntite(entite:Entite){
  this.router.navigate(['/deliacte/entite/details',entite.id])
  }

  ajouterChampEntite(entite:any){
    this.addchamp=true
    this.addUser=true;
    this.editchamp=false;
    this.title="Ajouter champ";
    this.entiteChamp={};
    this.entiteChamp.entityObjectId=entite.id;
    this.entiteChamp.entityObjectOptionFields=[];
    //console.log(this.entiteChamp)
  }


  
   modifierChampEntite(entite:ChampEntite){
    this.addchamp=true;
    this.addUser=false;
    this.editchamp=true;
    this.title="Modifier champ";
    this.entiteChamp=entite;
    
  }


  saveChampEntite(){
   // console.log(this.entiteChamp);
    this.confirmationService.confirm({
      message: 'Voulez-vous sauvegarder ce champ?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.ajouterChamp(this.entiteChamp).subscribe({
        next:(value)=>{
         // console.log(value)
          this.addchamp=false;
         if(value.status==201 || value.status==200){
        /*  if(value.data.entityObjectOptionFields.length>0){
            for(let i=0;i<value.data.entityObjectOptionFields.length;i++){
              value.data.entityObjectOptionFields[i].entityObjectField=value.data;
              this.operationService.addOption(value.data.entityObjectOptionFields[i]).subscribe({
                next:(result)=>{
                  console.log(result)
                },
                complete:()=>{},
                error:(err)=>{
                }
              })
            }
          }*/
            setTimeout(() => {
              this.loading=false;
              this.searchEntite();
              this.messageService.add({severity:'success', summary: 'Succès', detail: value.message, life: 3000});
            }, 2000);
          }
          else{
            this.messageService.add({severity:'error', summary: value.error, detail: value.message, life: 3000});
            this.loading=false;
          }
        },
        complete:()=>{},
        error:(err)=>{
          this.loading=false;
          //console.log(err)
        }
      })
      //this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ enrégistré', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.addboutton=false;
      this.messageService.add({severity:'error', summary: 'Echec', detail: 'Champ non enrégistré', life: 3000});
    }
    });
   
  }

  addOption(){
    this.optionAdd={
      name:this.newOption,
      //entityObjectField:this.entiteChamp
    }
 //   this.optionAdd;
    this.entiteChamp.entityObjectOptionFields.push(this.optionAdd);
   // console.log(this.entiteChamp)
   
   this.newOption='';
  }


  onRowExpand(event: any) {
    // Réinitialiser toutes les expansions
    this.expandedRowKeys = {};
    // Ouvrir seulement la ligne cliquée
    this.expandedRowKeys[event.data.id] = true;
  }
  
  onRowCollapse(event: any) {
    // Quand on referme manuellement
    delete this.expandedRowKeys[event.data.id];
  }
  expandAll(id:string) {
   // console.log(id)
    this.champsEntites=[];
    this.entiteService.getChampByEntity(id).subscribe({
      complete:()=>{},
      next:(result)=>{
      //  console.log(result)
        this.champsEntites=result.data;
       // console.log(this.champsEntites)
      },
      error:(err)=>{
        //console.log(err)
      }
    })
  }


  onFieldExpand(event: any) {
    this.expandedFieldKeys = {};
    this.expandedFieldKeys[event.data.id] = true;
  }
  
  onFieldCollapse(event: any) {
    delete this.expandedFieldKeys[event.data.id];
  }

  searchChamp(){
    this.entiteService.searchChamp().subscribe({
      complete:()=>{},
      next:(result)=>{
       // console.log(result)
      },
      error:(err)=>{
        //console.log(err)
      }


    })
  }

 deleteEntite(entite:Entite){
  this.confirmationService.confirm({
     message: 'Voulez-vous vraiment supprimer cette entité?',
     header: 'Suppression',
     acceptLabel:'Oui',
     rejectLabel:'Non',
     icon: 'pi pi-exclamation-triangle',
     acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.delete_entite(entite.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result.status==200 || result.status==201){
            setTimeout(() => {
              this.loading=false;
              this.searchEntite();
              this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
            }, 2000);
          }
          else{
            this.loading=false;
            this.messageService.add({severity:'error', summary: 'Suppression', detail: result.error, life: 3000});      
          }
        
        },
        error:(error)=>{
          this.loading=false;
        }
    
      })
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Suppression annulée', life: 3000});
    }
  });
 }


 deleteChampEntite(entiteChamp:ChampEntite){
  this.confirmationService.confirm({
     message: 'Voulez-vous vraiment supprimer cet champ entité?',
     header: 'Suppression',
     acceptLabel:'Oui',
     rejectLabel:'Non',
     icon: 'pi pi-exclamation-triangle',
     acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.loading=true;
      this.entiteService.delete_Champ(entiteChamp.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result.status==200 || result.status==201){
            setTimeout(() => {
              this.loading=false;
              this.searchEntite();
              this.searchChamp();
              this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
            }, 2000);
          }
          else{
            this.loading=false;
            this.messageService.add({severity:'error', summary: 'Suppression', detail: result.error, life: 3000});      
          }
        
        },
        error:(error)=>{
          this.loading=false;
        }
    
      })
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Suppression annulée', life: 3000});
    }
  });
 }

  
  private async getBase64ImageFromUrl(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur lors du chargement de l'image : ${response.statusText}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  
  public async generatePDF1(): Promise<void> {
    try {
      // 1. Créer une nouvelle instance de jsPDF.
      const doc = new jsPDF();
      
      // --- DÉBUT DE L'EN-TÊTE ---
  
      // URL des armoiries (depuis Wikimedia Commons)
      const imageUrl = 'assets/img/armoiriePh.jpeg';
      
      // Charger l'image et la convertir en base64
      const imageBase64 = await this.getBase64ImageFromUrl(imageUrl );
  
      // Ajouter le nom du pays
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('BURKINA FASO', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
  
      // Ajouter la devise
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.text('La Patrie ou la Mort, nous Vaincrons', doc.internal.pageSize.getWidth() / 2, 27, { align: 'center' });
  
      // Ajouter l'image des armoiries (largeur de 30mm)
      doc.addImage(imageBase64, 'PNG', doc.internal.pageSize.getWidth() / 2 - 15, 32, 30, 30);
  
      // --- FIN DE L'EN-TÊTE ---
  
      // Ajouter le titre principal du document
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Liste des entités'+" "+ this.procedurechoisi.name, 14, 80); // Position Y ajustée pour être sous l'en-tête
  
      // Préparer les données du tableau
      const headers = [['Nom', 'Description']];
      const data = this.entites.map(entite => [
        entite.name || "---",
        entite.description || "---",
      ]);
  
      // Créer le tableau
      autoTable(doc, {
        head: headers,
        body: data,
        startY: 85, // Position de départ du tableau ajustée
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 10
        }
      });
  
      // Sauvegarder le fichier PDF
      doc.save('Liste_des_entités.pdf');
  
    } catch (error) {
      //console.error("Erreur lors de la génération du PDF :", error);
      // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
    }
  }
}
