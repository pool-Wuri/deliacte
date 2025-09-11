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
  templateUrl: './dossier-suivi.component.html',
  styleUrls: ['./dossier-suivi.component.scss']
})
<<<<<<< HEAD



export class DossierSuiviComponent {
  id:number | undefined;
  dossierTraiter:any[]=[];

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



    // Données de la demande (simulées, viendraient d'un service/API)
=======
export class DossierSuiviComponent implements OnInit {

  // Données de la demande (simulées, viendraient d'un service/API)
>>>>>>> 04ee256ccffabb2df938ca626baed4796a3c73a6
  dossierId = 'SP-2024-12345';
  steps: Step[] = [
    {
      label: "Soumission",
      status: "completed",
      icon: "pi-upload",
      details: {
        "Date de soumission": "10/08/2024",
        "Nom du demandeur": "Moussa OUEDRAOGO",
        "Type de document": "Passeport Ordinaire",
        "Centre de dépôt": "Ouagadougou - Centre"
      }
    },
    {
      label: "Vérification",
      status: "completed",
      icon: "pi-search",
      details: {
        "Agent vérificateur": "A. KABORE",
        "Date de vérification": "12/08/2024",
        "Statut des documents": "Conformes",
        "Commentaire": "Dossier complet et valide."
      }
    },
    {
      label: "Traitement",
      status: "active",
      icon: "pi-spin pi-cog",
      details: {
        "Service en charge": "Direction de la Production des Titres",
        "Début du traitement": "13/08/2024",
        "Statut actuel": "En cours de production",
        "Date estimée de fin": "25/08/2024"
      }
    },
    {
      label: "Prêt pour retrait",
      status: "pending",
      icon: "pi-inbox",
      details: {
        "Lieu de retrait": "Centre de Ouagadougou",
        "Pièces à fournir": "Reçu de paiement, CNI",
        "Disponibilité": "En attente"
      }
    }
  ];

  // Index de l'étape sélectionnée pour l'affichage des détails
  selectedIndex: number = 0;
  
  // Pourcentage de la barre de progression
  progressPercentage: number = 0;
<<<<<<< HEAD
  constructor(private route:ActivatedRoute,
    private typeDocService:TypeDocService,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private userService:UtilisateurService,
=======

id!:number;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthentificationService,
>>>>>>> 04ee256ccffabb2df938ca626baed4796a3c73a6
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

<<<<<<< HEAD
){}

ngOnInit():void{
  this.selectedIndex = this.steps.findIndex(step => step.status === 'active');
  if (this.selectedIndex === -1) { // Au cas où tout est terminé
      this.selectedIndex = this.steps.length - 1;
  }
  
  // Calculer la progression de la barre
  this.calculateProgress();
 
  this.route.params.subscribe(params => {
    this.id = params['id']; 
    console.log(this.id)
  /// this.getProcedure(this.id)
=======
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('params récupérés :', params); // Débogage
      const idParam = params['id'];
      this.id = params['id'] // Convertit en number ou 0 par défaut
      console.log('ID récupéré :', this.id);
    });
>>>>>>> 04ee256ccffabb2df938ca626baed4796a3c73a6
this.getDossier(this.id)
    // Initialiser l'index sélectionné sur l'étape active
    this.selectedIndex = this.steps.findIndex(step => step.status === 'active');
    if (this.selectedIndex === -1) { // Au cas où tout est terminé
        this.selectedIndex = this.steps.length - 1;
    }
    
    // Calculer la progression de la barre
    this.calculateProgress();
  }

<<<<<<< HEAD


=======
>>>>>>> 04ee256ccffabb2df938ca626baed4796a3c73a6
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

<<<<<<< HEAD
getDossier(id?:number){
  let limit: number | null = null;
  this.typeDocService.getDossierPour(id).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result.data.traitement+" total");
     this.dossier=result.data.dossiers;
     console.log(this.dossier.length)
     let i = 0;
     console.log(i);
     while (i < this.dossier.length - 1) { 
      console.log(this.dossier[i + 1].champOperation.operationId) 
      console.log(this.dossier[i].champOperation.operationId)// Vérifie que i+1 reste dans les limites
         if (this.dossier[i + 1].champOperation.operationId !== this.dossier[0].champOperation.operationId) {
             this.dossierTraiter.push(this.dossier[i + 1]);
             this.dossier.splice(i + 1, 1);  // Supprime un élément à l'index i+1
             console.log(this.dossierTraiter);
             console.log(this.dossier);
         } else {
             i++;  // Incrémente seulement si aucun élément n'est supprimé
         }
     }
     
     for(let i=0;i<this.dossier.length;i++){
      if (this.dossier[i].champOperation.inputType === "PDF" ||
        this.dossier[i].champOperation.inputType === "FILE" ||
        this.dossier[i].champOperation.inputType === "IMAGE") {
                this.document.push(this.dossier[i]);
        console.log(this.document)
      }
     }
     console.log(this.dossier);
     this.traitement=result.data.traitement;
     console.log(this.traitement)
  //  console.log(this.getOperation(this.dossier[0].champOperation.operationId)) 
  this.operationService.get_Procedure(this.dossier[0].champOperation.operationId).subscribe({
    complete:()=>{},
    next:(result)=>{
      console.log(result.data)
    this.procedureService.get_Procedure(result.data.procedureId).subscribe({
      complete:()=>{},
=======

  getDossier(id:any){
    this.authService.getDossierAfficher(id).subscribe({
>>>>>>> 04ee256ccffabb2df938ca626baed4796a3c73a6
      next:(result)=>{
        console.log(result.data);
        this.steps=result.data;
      },
      complete:()=>{},
      error:(err)=>{}
    })
  }
}
