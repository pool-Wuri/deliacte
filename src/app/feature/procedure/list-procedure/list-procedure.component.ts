import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Table } from 'primeng/table';
import autoTable from 'jspdf-autotable';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Organisation } from 'src/app/core/models/organisation.model';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { ChampOperation } from 'src/app/core/models/champOperation.model';

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
procedures=new Array <Procedure>();
proceduresBrouillon=new Array <Procedure>();
proceduresArchiv=new Array <Procedure>();
proceduresPublie=new Array <Procedure>();
@ViewChild('dt') dt!: Table; // <- référence au p-table
organisations=new Array <Organisation>();
statuts:any[]=[{value:"ARCHIVED",label:"Archivée"},{value:"DRAFT",label:"Brouillon"},{value:"PUBLISHED",label:"Publiée"}]
statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération
procedure=new Procedure;
  ProcedureStatus: any;
  user: User | null = null;
  ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
  SUPER_ADMIN= 'SUPER_ADMIN';
  PROCEDURE_MANAGER='PROCEDURE_MANAGER';
  submitted: boolean=false;
  loading:boolean=false;
  champs=new Array <ChampOperation>();
  @ViewChild('dtBrouillon') dtBrouillon!: Table;
  @ViewChild('dtPublie') dtPublie!: Table;
  @ViewChild('dtArchiv') dtArchiv!: Table;
  activeTab: 'brouillon' | 'publie' | 'archiv' = 'brouillon';

  constructor(
    private router:Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private procedureService:ProcedureService,
    private organisationService:OrganisationService,
    private userService:UtilisateurService,
    private operationService:OperationService,

  ){}

  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }

  ngOnInit(): void {
    this.search_Procedure();
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
   }


  applyGlobalFilter(value: string) {
    if(this.user?.role=='PROCEDURE_MANAGER'){
      this.dt?.filterGlobal(value, 'contains');
    }
    else{
      switch (this.activeTab) {
        case 'brouillon':
          this.dtBrouillon?.filterGlobal(value, 'contains');
          break;
        case 'publie':
          this.dtPublie?.filterGlobal(value, 'contains');
          break;
        case 'archiv':
          this.dtArchiv?.filterGlobal(value, 'contains');
          break;
        default:
          this.dt?.filterGlobal(value, 'contains');
          break;
      }
    }
   
  }

   search_Procedure():void{
    this.loading=true;
    this.procedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result.status==201 || result.status==200){
          this.loading=false;
          this.procedures=result.data;
          this.proceduresBrouillon=this.procedures.filter(u=>u.status=="DRAFT");
          this.proceduresArchiv=this.procedures.filter(u=>u.status=="ARCHIVED");
          this.proceduresPublie=this.procedures.filter(u=>u.status=="PUBLISHED");
          this.procedures=this.procedures.filter(u=>u.status!=="ARCHIVED");

          this.procedures = this.procedures.map(p => ({
            ...p,
            organisationName: p.organisation?.name || ''
          }));
          
          this.proceduresBrouillon = this.proceduresBrouillon.map(p => ({
            ...p,
            organisationName: p.organisation?.name || ''
          }));
          
          this.proceduresPublie = this.proceduresPublie.map(p => ({
            ...p,
            organisationName: p.organisation?.name || ''
          }));
          
          this.proceduresArchiv = this.proceduresArchiv.map(p => ({
            ...p,
            organisationName: p.organisation?.name || ''
          }));
        }
        else{
          setTimeout(() => {
            this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
            this.loading=false;
          }, 2000);
        }
      },
      error:(error)=>{
        this.messageService.add({severity:'error', summary: "Erreur", detail: error, life: 3000});
      
      }
  
    })
   }

   ajouter(){
    this.procedure={};
    this.addboutton=true;
    this.addUser=true;
    this.editbutt=false;
    this.title="Formulaire d'ajout d'une procedure";
    this.procedure.status="DRAFT";
    this.searchOrganisation();
   }

   fermerModal(){
    this.addboutton=false;
    this.addUser=false;
    this.editbutt=false;
    this.loading=false;
   }

   saveProcedure(){ 
   // this.soumettre=true;
   this.submitted=true;
   if(this.procedure.name && this.procedure.description && this.procedure.organisationId){
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cette procedure?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.addboutton = false; // Ouvre le modal 
        this.addUser=false;
        this.editbutt=false;
        this.procedure.isActive=true;
        this.procedureService.saveProcedure(this.procedure).subscribe({
          complete:()=>{},
          next:(result)=>{
            if(result.status==201 || result.status==200){
              this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
              setTimeout(() => {
                this.loading=false;
                this.search_Procedure();
           
              }, 2000);
               }
               else{
                this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
               }
          
          },
          error:(error)=>{
            this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Procedure non enregistrée', life: 3000});
            this.loading=false;
          }
      
        })        
      },
      reject:()=>{
        this.addboutton = true; // Ouvre le modal 
        this.addUser=true;
        this.editbutt=false;
        this.messageService.add({severity:'error', summary: 'Annulation', detail: 'Annuler l\'enregistrement', life: 3000});
        this.loading=false;
      }
    });
   }
  
   }
  
  searchOrganisation(){
    this.userService.userOrgaInfo(this.user?.id).subscribe({
      complete:()=>{},
      next:(result)=>{
        this.organisations=result.data;
      },
      error:(error)=>{
      }
    });
  
  }
  
   editProcedure(procedure:Procedure){
    this.searchOrganisation();
    this.addboutton = true; // Ouvre le modal
    this.procedure=procedure;
    this.addUser=false;
    this.editbutt=true;
    this.title="Modifier la procedure";
   }
  
   validerModif(){
    this.confirmationService.confirm({
      message: 'Voulez-vous la modifier?',
      header: 'Modification',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.addboutton = false; // Ouvre le modal 
      this.addUser=false;
      this.editbutt=false;
      this.loading=true;
      this.procedureService.updateprocedure(this.procedure,this.procedure.id).subscribe({
        complete:()=>{},
        next:(result)=>{
        //  console.log(result)
          if(result.status==201 || result.status==200){
            this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
            setTimeout(()=>{
              this.loading=false;
              this.search_Procedure();
             },2000)
            }
            else{
              this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
            }
        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Modification non reussie', life: 3000});
          this.loading=false;
        }
    
      })
    },
    reject:()=>{
      this.addUser=false;
     // this.editbutt=false;
     // this.addboutton = false;
      this.loading=false;
      this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Annuler l\'enregistrement', life: 3000});
    }
  });
   // Ouvre le modal 
  
   }
  
  detailsProcedure(procedure:Procedure){
  this.router.navigate(['/deliacte/procedure/details',procedure.id])
  }
  
  deleteProcedure(procedure:Procedure){
   this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer cette procedure?',
      header: 'Suppression',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.procedureService.delete_procedure(procedure.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.loading=true;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'procedure supprimée', life: 3000});      
            setTimeout(() => {
              this.search_Procedure();
              this.loading=false;
            }, 2000);
          
     
        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Procedure non supprimée', life: 3000});      

        }
    
      })
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Procedure non supprimée', life: 3000});
    }
  });
  }

  afficherChamp(procedure:Procedure){
    this.router.navigate(['/deliacte/procedure/details',procedure.id])

  }

  depublier(procedure:Procedure){
      this.confirmationService.confirm({
        message: 'Voulez-vous dépublier cette procedure?',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        header: 'Publication',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        procedure.status = "ARCHIVED" // Assigner la clé comme chaîne
        this.procedureService.updateprocedure(procedure,procedure.id).subscribe({
          complete:()=>{},
          next:(result)=>{
            this.loading=false;
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Procedure dépubliée', life: 3000});      
          },
          error:(error)=>{
            setTimeout(() => {
              this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.error, life: 3000});
              this.loading=false;
            }, 2000);
          }
      
        })
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Procedure non dépubliée', life: 3000});
      }
    });
  
   
  }

  publier(procedure:Procedure){
    this.loading=true;
    this.operationService.get_Operation(procedure.id).subscribe({
      next:(value)=>{
        this.procedureService.get_Champ(procedure.id).subscribe({
          next:(result)=>{
            this.champs=result.data;
            this.loading=false;
          // console.log(this.champs.length)
            if(value.data.length<=0 ||  this.champs.length<=0 ){
              this.messageService.add({severity:'error', summary: 'Publication pas possible', detail: 'Aucune opération et champ disponible pour cette procedure', life: 3000});
            }
            else{
              if(procedure.status!="PUBLISHED")
                {
                  this.confirmationService.confirm({
                    message: 'Voulez-vous publier cette procedure',
                    acceptLabel:'Oui',
                    rejectLabel:'Non',
                    header: 'Publication',
                    icon: 'pi pi-exclamation-triangle',
                    acceptButtonStyleClass:'acceptButton',
                  accept: () => {
                    this.loading=true;
                    procedure.status = "PUBLISHED" // Assigner la clé comme chaîne
                    this.procedureService.updateprocedure(procedure,procedure.id).subscribe({
                      complete:()=>{},
                      next:(result)=>{
                        if(result.status==201 || result.status==200){
                          this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
                          setTimeout(()=>{
                            this.loading=false;
                            this.search_Procedure();
                          },2000)
                        }
                        else{
                          this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
                          this.loading=false;
                        }
                      },
                      error:(error)=>{
                        this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});
                        this.loading=false;
                      }
                  
                    })
                   // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});      
                  },
                  reject:()=>{
                    this.messageService.add({severity:'error', summary: 'Annuler', detail: 'Annuler la publication', life: 3000});
                  }
                });
                }
                else{
                  this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Procedure déja publiée', life: 3000});
            
                }
            }
          },
          complete:()=>{},
          error:(erreur)=>{
          }
        })
       
     
      },
      complete:()=>{},
      error:(err)=>{
        this.loading=false;
      }
    });


   
  }

   getStatusKey(status: ProcedureStatus): string {
    return Object.keys(ProcedureStatus).find(key => ProcedureStatus[key as keyof typeof ProcedureStatus] === status) || 'Statut inconnu';
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

  generatePDF() {
    // Create a new PDF document.
    const doc = new jsPDF();

    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Liste des procedures', 10, 10);
    doc.setFontSize(12);
    /*doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );*/
  
    // Create a table using `jspdf-autotable`.
    const headers = [['Nom', 'Organisation','Statut']];
    const data = this.procedures.map(procedure => [
      procedure.name ?? '',
      procedure.organisation.name ?? '',
      this.parseStatus(procedure.status) ?? ''
    ]);
    
    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30, // Adjust the `startY` position as needed.
    });
  
    
    // Save the PDF.
    doc.save('Liste_procedure.pdf');
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
      doc.text('Liste des procédures', 14, 80); // Position Y ajustée pour être sous l'en-tête
  
      // Préparer les données du tableau
      const headers = [['Nom', 'Organisation','Statut']];
      const data = this.procedures.map(procedure => [
        procedure.name ?? '',
        procedure.organisation.name ?? '--',
        this.parseStatus(procedure.status)?? '---'
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
      doc.save('Liste_des_procedures.pdf');
  
    } catch (error) {
      console.error("Erreur lors de la génération du PDF :", error);
      // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
    }
  }
}
