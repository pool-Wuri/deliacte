import { Component } from '@angular/core';
import { Modal } from 'flowbite';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { Procedure, ProcedureStatus } from 'src/app/core/models/procedure.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Product } from '../product';
import { ProductService } from '../ProductService';
import { OrganisationService } from 'src/app/core/services/organisation.service';

@Component({
  selector: 'app-list-procedure-published',
  templateUrl: './list-procedure-published.component.html',
  styleUrls: ['./list-procedure-published.component.scss']
})
export class ListProcedurePublishedComponent {

  procedures=new Array <Procedure>();

  statuts:any[]=[{value:"ARCHIVED",label:"Archivée"},{value:"DRAFT",label:"Brouillon"},{value:"PUBLISHED",label:"Publiée"}]
  statuses = Object.entries(ProcedureStatus); // Récupérer les valeurs de l'énumération

 
  ProcedureStatus: any;
  demandeFor:boolean=false;
  procedure: Procedure[] = [];
  selectProcedure=new Procedure;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;

  modalPopupObject: any;
  display: boolean = false;
  vegetables = [
    { name: 'Label', type: 'label', inputType: 'label' },
    { name: 'text', type: 'input-text', inputType: 'text', placeholder: '' },
    { name: 'checkbox', type: 'input-check', inputType: 'checkbox', placeholder: null, displayText: 'Check box' }];
    droppedVegetables = [];
    droppedItems = [];
    dragEnabled = true;
    htmlText: any;
    test: string = '';
    currentDraggedItem: any;
    types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));
    champOperation=new Array <ChampOperation>()

    visible: boolean = false;

    position: string = 'center';
    searchTerm: string = '';
    filteredProcedures = [...this.procedures]; // liste affichée

      // --- pagination ---
    currentPage = 1;
    itemsPerPage = 6;
    totalProcedurespublished: number = 0;


  parseStatus(status: string): string {
    return ProcedureStatus[status as keyof typeof ProcedureStatus] || 'Statut inconnu';
  }

  constructor(
    private ProcedureService: ProcedureService,
    private router: Router,
    private route: ActivatedRoute, 
    private organisationService: OrganisationService,
    private messageService: MessageService,
    private operationService:OperationService,
    private productService: ProductService

  ) {
    this.modalPopupObject = {};

  }


  ngOnInit(): void {
    this.search_Procedure();
    
    this.selectedProducts = [];
    this.productService.getProductsSmall().subscribe(data => { 
      this.availableProducts=data
    });
        this.champOperation=[
          {name:"Text",inputType:"TEXT",description:"",operation:"",isRequired:false},
          {name:"TEXTAREA",inputType:"TEXTAREA",description:"",operation:"",isRequired:false},
          {name:"",inputType:"PASSWORD",description:"",operation:"",isRequired:false},
          {name:"",inputType:"EMAIL",description:"",operation:"",isRequired:false},
          {name:"",inputType:"NUMBER",description:"",operation:"",isRequired:false},
          {name:"",inputType:"RANGE",description:"",operation:"",isRequired:false},
          {name:"",inputType:"DATE",description:"",operation:"",isRequired:false},
          {name:"",inputType:"TIME",description:"",operation:"",isRequired:false},
          {name:"",inputType:"",description:"",operation:"",isRequired:false},
          {name:"",inputType:"",description:"",operation:"",isRequired:false},
          {name:"",inputType:"",description:"",operation:"",isRequired:false},
          {name:"",inputType:"",description:"",operation:"",isRequired:false},
        ];
        this.availableChamp=this.champOperation;
  }


  
  onSearch1() {
  
    this.filteredProcedures=this.procedures;
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredProcedures = this.procedures.filter(proc =>
      proc.name?.toLowerCase().includes(term) ||
      proc.description?.toLowerCase().includes(term) ||
      proc.organisation.name.toLowerCase().includes(term)
    );
    
  }

  onDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  }

   search_Procedure():void{
    this.ProcedureService.search_ProcedurePublier("PUBLISHED").subscribe({
      complete:()=>{},
      next: (result) => {
        this.procedures = result.data;
      
        this.procedures.forEach((procedure) => {
          if (procedure.organisationId) {
            this.organisationService.get_Organisation(procedure.organisationId).subscribe({
              next: (orgResult) => {
                procedure.organisation = orgResult.data;
              },
              error: (err) => {
                console.error("Erreur récupération organisation :", err);
              },
            });
          }
        });
     //   console.log(this.procedures)
        this.filteredProcedures=this.procedures;
        this.totalProcedurespublished = this.procedures.length;
       // this.procedures=this.procedures.filter(u=>u.status === 'PUBLISHED');
      },
      error:(error)=>{
      }
  
    })

   
   }


   // Découpe les données selon la page courante
  get paginatedProcedures() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProcedures.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredProcedures.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

   onSearch() {
    const term = this.searchTerm.toLowerCase().trim();

    this.filteredProcedures = this.procedures.filter(proc =>
      proc.name?.toLowerCase().includes(term) ||
      proc.description?.toLowerCase().includes(term) ||
      proc.organisation.name.toLowerCase().includes(term)
    );

    // Réinitialiser la pagination après recherche
    this.currentPage = 1;
  }


   fermerModel(){
    this.demandeFor=false;
  }

   soumettre(): void {
    
   }

   faireDemande(procedure:any){
    this.demandeFor=true;
    this.router.navigate(['/deliacte/procedure-published/demandePage',procedure.id])

   }

   searchOperation():void{
    this.operationService.search_Procedure("").subscribe({
      next:(value)=>{
        this.operations=value;

        this.operations=this.operations.filter(u=>u.name === "SOUMISSION");
        this.operation=this.operations[0]
        this.operationService.searchChamp("").subscribe({
          next:(value)=>{
            this.champs=value;
            
         
          },
          complete:()=>{},
          error:(err)=>{}
        })
      },
      complete:()=>{},
      error:(err)=>{}
    });
   
   
  }

  availableProducts!: Product[];
  availableChamp!: ChampOperation[];

  selectedProducts!: Product[];
  selectedChamps=new Array <ChampOperation>()

  draggedProduct: Product | null = null;
  draggedProductchamp:ChampOperation | null = null;

  dragStart(champ: ChampOperation) {
    this.draggedProductchamp = champ;
}

drop() {
    if (this.draggedProductchamp) {
        let draggedProductIndex = this.findIndex(this.draggedProductchamp);
        this.selectedChamps = [...this.selectedChamps, this.draggedProductchamp];
        this.availableChamp = this.availableChamp.filter((val,i) => i!=draggedProductIndex);
        this.draggedProductchamp = null;
    }
}

dragEnd() {
    this.draggedProductchamp = null;
}

findIndex(champ: ChampOperation) {
    let index = -1;
    for(let i = 0; i < this.availableChamp.length; i++) {
        if (champ.id === this.availableChamp[i].id) {
            index = i;
            break;
        }
    }
    return index;
}



showDialog(position: string) {
  this.position = position;
  this.visible = true;
}

}
