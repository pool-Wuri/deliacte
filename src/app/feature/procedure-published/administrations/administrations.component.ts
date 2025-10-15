import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Organisation } from 'src/app/core/models/organisation.model';
import { OrganisationService } from 'src/app/core/services/organisation.service';

@Component({
  selector: 'app-administrations',
  templateUrl: './administrations.component.html',
  styleUrls: ['./administrations.component.scss']
})
export class AdministrationsComponent {
  organisations=new Array <Organisation>()
  organisationId!: number;
  
   leftColumn: Organisation[] = [];
  rightColumn: Organisation[] = [];

// filteredOrganisations: any[] = [];
  searchTerm: string = '';
  filteredOrganisations = [...this.organisations];
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

  

  searchOrganisation1():void{
    
    this.organisationService.search_Organisationscitoyen().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.organisations=result.data;
          console.log("organfvfv",result);
           
          this.splitInTwoColumns(this.organisations);
        }
       
      },
      error:(error)=>{
        this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});

      }
  
    })
   }


    onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredOrganisations = this.organisations.filter(proc =>
      proc.name?.toLowerCase().includes(term) ||
      proc.description?.toLowerCase().includes(term) 
     
    );

    // Réinitialiser la pagination après recherche
    //this.currentPage = 1;
  }


searchOrganisation(): void {
  this.organisationService.research_Organisationscitoyen(this.searchTerm).subscribe({
    next: (result) => {
      if (result) {
        this.organisations = result.data;
        this.splitInTwoColumns(this.organisations);
      }
    },
    error: (error) => {
      this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});
    }
  });
}


   private splitInTwoColumns(data: Organisation[] | null | undefined) {
  if (!data || data.length === 0) {
    // Si l'API renvoie null ou un tableau vide
    this.leftColumn = [];
    this.rightColumn = [];
    return;
  }

  const half = Math.ceil(data.length / 2);
  this.leftColumn = data.slice(0, half);
  this.rightColumn = data.slice(half);
}


}
