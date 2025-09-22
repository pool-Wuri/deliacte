import { Component, OnInit } from '@angular/core'; // Ajout de OnInit pour l'interface
import { Organisation } from 'src/app/core/models/organisation.model';
import { Modal } from 'flowbite';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-list-organisations',
  templateUrl: './list-organisations.component.html',
  styleUrls: ['./list-organisations.component.scss']
})
export class ListOrganisationsComponent implements OnInit {

  organisationId!: number;
  admins: any[] = [];

  modal: Modal | undefined;
  addOrganisation: boolean = false;
  editbutt: boolean = false;
  addorganisation: any;
  title: string = '';
  organisations=new Array <Organisation>()
  organisation1 = new Organisation;
  organisationToAssign = new Organisation();
  organisationselect: any[] | undefined;
  isModalOpen: boolean = false;
  assignModal:boolean=false;
  modalVisible: boolean = false;
  soumettre:boolean=false;
  submitted: boolean=false;
  loading:boolean=false;
  constructor(
    private organisationService: OrganisationService,
    private router: Router,
    private route: ActivatedRoute, 
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
   this.searchOrganisation();
  }

  

  searchOrganisation():void{
    this.loading=true;
    this.organisationService.search_Organisations().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.organisations=result.data;
          this.loading=false;
        }
      },
      error:(error)=>{
        setTimeout(() => {
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error.error.error, life: 3000});
        this.loading=false;
        }, 2000);
        
      }
  
    })
   }

  ajouter() {
    this.modalVisible = true;
    this.addOrganisation = true;
    this.editbutt = false;
    this.title = 'Formulaire d\'ajout d\'une organisation ';
    this.organisation1 ={};
    this.searchOrganisation();
    this.submitted=false;
  }

  fermerModal() {
    this.modalVisible = false;
  }

  

  saveOrganisation(){ 
    //this.soumettre=true;
    this.submitted=true;
    if(this.organisation1.name && this.organisation1.description)
    {
    this.confirmationService.confirm({
      message: 'Voulez-vous enregistrer cette organisation?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.modalVisible = false; // Ouvre le modal 
      this.addOrganisation=false;
      this.loading=true;
      this.editbutt=false;
      this.organisation1.isActive=true;
      this.organisationService.saveOrganisation(this.organisation1).subscribe({
        complete:()=>{},
        next:(result)=>{
          if(result){
            this.loading=false;
            this.searchOrganisation();
            this.messageService.add({severity:'success', summary: 'Succès', detail: 'Organisation enregistrée', life: 3000});
          }
          
        },
        error:(error)=>{
          this.messageService.add({severity:'error', summary: 'Erreur', detail: 'Organisation non enregistrée', life: 3000});

        }
    
      })
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.modalVisible = true; // Ouvre le modal 
      this.addOrganisation=true;
      this.editbutt=false;
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
    }
  });
    }
   }


  editOrganisation(organisation: Organisation) {
    this.modalVisible = true;
    this.organisation1 = organisation;
    this.addOrganisation = false;
    this.editbutt = true;
    this.title = 'Formulaire de modification d\'une organisation';
  }


  

  validerModif(){
    this.confirmationService.confirm({
      message: 'Voulez-vous modifier cette organisation?',
      header: 'Modification',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.modalVisible = false; // Ouvre le modal 
      this.addOrganisation=false;
      this.editbutt=false;
      this.organisation1.isActive=true;
      this.loading=true;
      this.organisationService.updateOrganisation(this.organisation1,this.organisation1.id).subscribe({
        complete:()=>{},
        next:(result)=>{
           
        this.messageService.add({severity:'success', summary: 'Succes', detail: 'Modification reussie', life: 3000});
        setTimeout(()=>{
          this.loading=false;
          this.searchOrganisation();
        },2000)
        },
        error:(error)=>{
        }
    
      })
     
    },
    reject:()=>{
      this.addOrganisation=false;
      this.searchOrganisation();
      this.messageService.add({severity:'error', summary: 'Erreur', detail: ' non modifié', life: 3000});
    }
  });
  }

  

  detailsOrganisation(organisation: Organisation) {
    this.router.navigate(['/deliacte/organisations/details', organisation.id]);
  }


  deleteOrganisation(organisation:Organisation){

    this.confirmationService.confirm({
       message: 'Voulez-vous vraiment supprimer cette organisation?',
       header: 'Suppression',
       acceptLabel:'Oui',
       rejectLabel:'Non',
       icon: 'pi pi-exclamation-triangle',
       acceptButtonStyleClass:'acceptButton',
     accept: () => {
       this.assignModal=false;
       this.organisationService.delete_organisation(organisation.id).subscribe({
         complete:()=>{},
         next:(result)=>{
          this.searchOrganisation();
         },
         error:(error)=>{
           
         }
     
       })
       this.messageService.add({severity:'success', summary: 'Succès', detail: 'Ok', life: 3000});      
     },
     reject:()=>{
       this.messageService.add({severity:'error', summary: 'Erreur', detail: ' non ok', life: 3000});
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
    doc.text('Liste des organisations', 14, 80); // Position Y ajustée pour être sous l'en-tête

    // Préparer les données du tableau
    const headers = [['Organisation', 'Parent', 'Description']];
    const data = this.organisations.map(organisation => [
      organisation.name,
      organisation.parentOrganisation?.name || "---",
      organisation.description || "---",
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
    doc.save('Liste_Organisation.pdf');

  } catch (error) {
    console.error("Erreur lors de la génération du PDF :", error);
    // Gérer l'erreur, par exemple en affichant un message à l'utilisateur
  }
}

   generatePDF() {
    // Create a new PDF document.
    const doc = new jsPDF();
  
    // Add content to the PDF.
    doc.setFontSize(16);
    doc.text('Liste des organisations', 10, 10);
    doc.setFontSize(12);
    /*doc.text(
      'This is a comprehensive guide on generating PDFs with Angular.',
      10,
      20,
    );*/
  
    // Create a table using `jspdf-autotable`.
    const headers = [['Organisation', 'Parent', 'Description']];
    const data = this.organisations.map(organisation => [
      organisation.name,
      organisation.parentOrganisation?.name,
      organisation.description,
    ]);
    
    autoTable(doc, {
      head: headers,
      body: data,
      startY: 30, // Adjust the `startY` position as needed.
    });
  
    
    // Save the PDF.
    doc.save('Liste_Organisation.pdf');
  }
}
