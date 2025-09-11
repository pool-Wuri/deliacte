import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthentificationService } from 'src/app/core/services/authentification.service';

// Définition des types pour une meilleure autocomplétion et sécurité
interface StepDetail {
  [key: string]: string;
}

interface Step {
  label: string;
  status: 'completed' | 'active' | 'pending';
  icon: string;
  details: StepDetail;
}

@Component({
  selector: 'app-dossier-suivi',
  //standalone: true, // Utilisation d'un composant Standalone (moderne et plus simple)
  //imports: [CommonModule], // Importation de CommonModule pour les directives comme *ngFor et *ngIf
  templateUrl: './dossier-suivi.component.html',
  styleUrls: ['./dossier-suivi.component.scss']
})
export class DossierSuiviComponent implements OnInit {

  dossier:any;
  events1!: any[];
  operationPrecedent=new Operation;
  operationnow=new Operation;
  operations=new Array<Operation>();
  champs=new Array <ChampOperation>();
  operation=new Operation;
    events2!: any[];
    data1:any;
    indexchamp!:number;
    numDossier!:number;
    indexSave:number[]=[];
    traitement:any;
    isDisabled = true; 
    document:any[]=[];
  constructor(private route:ActivatedRoute,
    private typeDocService:TypeDocService,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private userService:UtilisateurService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private location: Location,

){}

id!:number;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthentificationService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params récupérés :', params); // Débogage
      const idParam = params['id'];
      this.id = params['id'] // Convertit en number ou 0 par défaut
      console.log('ID récupéré :', this.id);
    });
this.getDossier(this.id)
    // Initialiser l'index sélectionné sur l'étape active
    this.selectedIndex = this.steps.findIndex(step => step.status === 'active');
    if (this.selectedIndex === -1) { // Au cas où tout est terminé
        this.selectedIndex = this.steps.length - 1;
    }
    
    // Calculer la progression de la barre
    this.calculateProgress();
  }

  // Méthode pour sélectionner une étape au clic
  selectStep(index: number): void {
    this.selectedIndex = index;
  }

  // Méthode pour calculer la largeur de la barre de progression
  private calculateProgress(): void {
    const completedSteps = this.steps.filter(s => s.status === 'completed').length;
    // La progression est basée sur les intervalles entre les étapes
    this.progressPercentage = (completedSteps / (this.steps.length - 1)) * 100;
  }

  // Méthode pour convertir les clés d'un objet en tableau pour l'itération dans le template
  getObjectKeys(obj: object): string[] {
    return Object.keys(obj);
  }


  getDossier(id:any){
    this.authService.getDossierAfficher(id).subscribe({
      next:(result)=>{
        console.log(result.data);
        this.steps=result.data;
      },
      complete:()=>{},
      error:(err)=>{}
    })
  }
}
