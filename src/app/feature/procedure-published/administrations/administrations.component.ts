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
   organisations: any[] = [];         // tout le dataset (venant du serveur)
  filteredOrganisations: any[] = []; // résultat après filtrage/recherche
  pagedOrganisations: any[] = [];    // éléments de la page courante

  // pagination
  currentPage = 1;
  pageSize = 4; // change selon ton besoin
  totalPages = 0;
  pages: number[] = [];

  organisationId!: number;
  
   leftColumn: Organisation[] = [];
  rightColumn: Organisation[] = [];

  // --- pagination ---
   
    itemsPerPage = 4;
    totalProcedurespublished: number = 0;
// filteredOrganisations: any[] = [];
  searchTerm: string = '';
   isSearching = false;
  //filteredOrganisations = [...this.organisations];
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
    
    this.organisationService.search_Organisationscitoyen().subscribe({
      complete:()=>{},
      next:(result)=>{
        if(result){
          this.organisations=result.data;
          this.applyFilter();
           
          
        }
       
      },
      error:(error)=>{
        this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});

      }
  
    })
   }

    // Appelée chaque fois que la recherche / filtre change
  applyFilter(searchTerm: string = '') {
    // filtre basique : adapte selon ton cas
    const term = (searchTerm || '').toLowerCase().trim();
    this.filteredOrganisations = this.organisations.filter(o =>
      !term || (o.description && o.description.toLowerCase().includes(term)) || (o.name && o.name.toLowerCase().includes(term))
    );

    // reset page si nécessaire
    this.currentPage = 1;
    this.updatePagination();
    this.updatePagedItems();
  }


   onSearch(): void {
    
    this.applyFilter(this.searchTerm);
  }


       updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.filteredOrganisations.length / this.pageSize));
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagedItems() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedOrganisations = this.filteredOrganisations.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;
    if (this.currentPage === page) return;

    this.currentPage = page;
    this.updatePagedItems();

    // si tu veux scroller en haut de la liste après changement de page
    // document.querySelector('.custom-scrollbar')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // utile pour ngFor trackBy
  trackById(index: number, item: any) {
    return item?.id ?? index;
  }


   onSearch1() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredOrganisations = this.organisations.filter(proc =>
      proc.name?.toLowerCase().includes(term) ||
      proc.description?.toLowerCase().includes(term) 
     
    );

    // Réinitialiser la pagination après recherche
    this.currentPage = 1;
  }

    


searchOrganisation1(): void {
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
