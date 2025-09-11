import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  selector: 'app-tracking',
  standalone: true, // Utilisation d'un composant Standalone (moderne et plus simple)
  imports: [CommonModule], // Importation de CommonModule pour les directives comme *ngFor et *ngIf
  templateUrl: './dossier-suivi.component.html',
  styleUrls: ['./dossier-suivi.component.css']
})
export class TrackingComponent implements OnInit {

  // Données de la demande (simulées, viendraient d'un service/API)
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

  ngOnInit(): void {
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
}
