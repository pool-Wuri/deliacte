import { Component, OnInit } from '@angular/core'; // Ajout de OnInit pour l'interface
import { Organisation } from 'src/app/core/models/organisation.model';
import { Modal } from 'flowbite';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OrganisationService } from 'src/app/core/services/organisation.service';

@Component({
  selector: 'app-list-organisations',
  templateUrl: './list-organisations.component.html',
  styleUrls: ['./list-organisations.component.scss']
})
export class ListOrganisationsComponent implements OnInit {

  modal: Modal | undefined;
  addOrganisation: boolean = false;
  editbutt: boolean = false;
  addorganisation: any;
  title: string = '';
  organisations: Organisation[] = [];
  organisation1 = new Organisation();
  organisationToAssign = new Organisation();
  organisationselect: any[] | undefined;
  isModalOpen: boolean = false;
  modalVisible: boolean = false;

  constructor(
    private organisationService: OrganisationService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
   // this.organisation1.nom="Ministère de la Transition Digital"
 // this.organisation1.prenom="France";
  this.organisation1.id=1;
 
  this.organisations.push(this.organisation1);
  }

  

  ajouter() {
    this.modalVisible = true;
    this.addOrganisation = true;
    this.editbutt = false;
    this.title = 'Formulaire d\'ajout d\'une organisation ';
    this.organisation1 = new Organisation();
    console.log(this.addOrganisation);
  }

  fermerModal() {
    this.modalVisible = false;
  }

  saveOrganisation() {
    console.log(this.addOrganisation);
    this.addOrganisation = false;
    this.editbutt = false;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      acceptLabel: 'Oui',
      rejectLabel: 'Non',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.modalVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Ok', life: 3000 });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'error', detail: 'non ok', life: 3000 });
      }
    });
  }

  editOrganisation(organisation: Organisation) {
    this.modalVisible = true;
    this.organisation1 = organisation;
    this.addOrganisation = false;
    this.editbutt = true;
    this.title = 'Formulaire de modification d\'une organisation';
    console.log(this.organisation1);
  }

  validerModif() {
    console.log(this.organisation1);
    this.addOrganisation = false;
    this.editbutt = false;
  }

  assigner(organisation: any) {
    this.organisationToAssign = organisation;
    console.log(organisation);
  }

  detailsOrganisation(organisation: Organisation) {
    this.router.navigate(['/deliacte/organisations/details', organisation.id]);
  }
}
