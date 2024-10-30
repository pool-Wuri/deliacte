import { Component, OnInit } from '@angular/core'; // Ajout de OnInit pour l'interface
import { Organisation } from 'src/app/core/models/organisation.model';
import { Modal } from 'flowbite';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrganisationService } from 'src/app/core/services/organisation.service';

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
    this.organisationService.search_Organisations().subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"Organisation total");
        this.organisations=result.data;
      },
      error:(error)=>{
        console.log(error);
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
  }

  fermerModal() {
    this.modalVisible = false;
  }

  

  saveOrganisation(){ 
    this.soumettre=true;
    console.log(this.organisation1)
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
      this.editbutt=false;
      this.organisation1.isActive=true;
      console.log(this.organisation1)
      this.organisationService.saveOrganisation(this.organisation1).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Organisation add");
          this.searchOrganisation();
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Organisation enregistré', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.modalVisible = false; // Ouvre le modal 
      this.addOrganisation=false;
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
    console.log(this.organisation1);
  }


  

  validerModif(){
    console.log(this.organisation1)
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
      this.organisationService.updateOrganisation(this.organisation1,this.organisation1.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result+"Organisation add");
        },
        error:(error)=>{
          console.log(error);
        }
    
      })
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});
        //Actual logic to perform a confirmation
        
    },
    reject:()=>{
      this.addOrganisation=false;
    this.editbutt=false;
    this.modalVisible = false;
      this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
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
         },
         error:(error)=>{
           console.log(error);
         }
     
       })
       this.messageService.add({severity:'success', summary: 'Successful', detail: 'Ok', life: 3000});      
     },
     reject:()=>{
       this.messageService.add({severity:'error', summary: 'error', detail: ' non ok', life: 3000});
     }
   });
   }
  
}
