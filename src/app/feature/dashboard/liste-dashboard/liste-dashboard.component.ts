import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-liste-dashboard',
  templateUrl: './liste-dashboard.component.html',
  styleUrls: ['./liste-dashboard.component.scss']
})
export class ListeDashboardComponent {

  basicData: any;
  basicOptions: any;

  basicData1: any;
  basicOptions1: any;

  data: any;
  options: any;

  constructor(private DashboardService: DashboardService) {}

  ngOnInit(): void {
    this.DashboardService.getOrganizationEvolution().subscribe((data) => {
      // Extraire les mois et les nombres des données API
      // Extraire le mois et l'année (si disponible) pour les labels
      const labels = data.map((item: any) => {
        return item.year ? `${item.month} ${item.year}` : item.month; // Concatène mois et année si disponible
      });
      const evolutionData = data.map((item: any) => item.nombre); // Récupère les valeurs

      // Configuration du graphique
      this.basicData = {
        labels: labels,
        datasets: [
          {
            label: 'Évolution des organisations',
            backgroundColor: '#060',
            data: evolutionData,
          },
        ],
      };

      this.basicOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Mois - Année',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre d\'organisations',
            },
          },
        },
      };
    });





    this.DashboardService.getUserEvolution().subscribe((data) => {
      // Extraire les mois et les nombres des données API
      // Extraire le mois et l'année (si disponible) pour les labels
      const labels = data.map((item: any) => {
        return item.year ? `${item.month} ${item.year}` : item.month; // Concatène mois et année si disponible
      });
      const evolutionData = data.map((item: any) => item.nombre); // Récupère les valeurs

      // Configuration du graphique
      this.basicData1 = {
        labels: labels,
        datasets: [
          {
            label: 'Évolution des utilisateurs',
            backgroundColor: '#060',
            data: evolutionData,
          },
        ],
      };

      this.basicOptions1 = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Mois - Année',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Nombre d\'utilisateurs',
            },
          },
        },
      };
    });




    this.DashboardService.getProBYOrgEvolution().subscribe((data) => {
      // Extraire les mois et les nombres des données API
      const labels = data.map((item: any) => {
        return item.year ? `${item.month} ${item.year}` : item.month; // Mois + Année (si disponible)
      });
      const values = data.map((item: any) => item.nombre); // Récupérer les valeurs
  
      // Configuration des données du graphique en secteurs
      this.data = {
        labels: labels,  // Mois et année pour chaque segment
        datasets: [
          {
            data: values,  // Valeurs associées à chaque mois
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          },
        ],
      };
  
      // Options de personnalisation du graphique
      this.options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem: any) {
                return tooltipItem.label + ': ' + tooltipItem.raw;
              },
            },
          },
        },
      };
    });
  }




}
