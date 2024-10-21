import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { Organisation } from 'src/app/core/models/organisation.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-liste-dashboard',
  templateUrl: './liste-dashboard.component.html',
  styleUrls: ['./liste-dashboard.component.scss']
})
export class ListeDashboardComponent {

  user: User | null = null;
  ORG_ADMIN = 'ORG_ADMIN'; // Définir la constante
  SUPER_ADMIN= 'SUPER_ADMIN'
  PROCEDURE_MANAGER='PROCEDURE_MANAGER'
  CITOYEN='CITOYEN';

  organisationIds: number[] = []; // Tableau pour stocker les IDs des organisations
  orgId!: number; // Variable pour chaque ID d'organisation
  
  organisations: any[] = [];
  isLoading: boolean = false;

  id:number | undefined;

  basicData: any;
  basicOptions: any;

  basicData1: any;
  basicOptions1: any;

  basicData2: any;
  basicOptions2: any;


  data: any;
  options: any;
  value!: Date;

  constructor(private DashboardService: DashboardService,
    private organisationService: OrganisationService
  ) {}

  ngOnInit(): void {


    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user)
    }

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




    this.DashboardService.getProBYOrgEvolution(2).subscribe((data) => {
      // Extraire les mois et les nombres des données API
      const labels = data.map((item: any) => {
        return item.year ? `${item.month} ${item.year}` : item.month; // Mois + Année (si disponible)
      });
      const values = data.map((item: any) => item.nombre); // Récupérer les valeurs
  
       // Configuration du graphique
       this.basicData2 = {
        labels: labels,
        datasets: [
          {
            label: 'Évolution des procedures par organisation',
            backgroundColor: '#060',
            data: values,
          },
        ],
      };

      this.basicOptions2 = {
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
              text: 'Nombre de procedures',
            },
          },
        },
      };
    });


    


/* D'abord récupérer les IDs des organisations
this.organisationService.search_Organisations().subscribe({
  next: (result) => {
    this.organisations = result;
    this.organisationIds = this.organisations.map(org => org.id); // Récupérer les IDs
    console.log(this.organisationIds);

    // Tableau pour stocker les datasets des différentes organisations
    const datasets: any[] = [];

    // Tableau de couleurs prédéfinies (ajoutez-en plus si nécessaire)
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#B37400', '#80CCFF', '#FFB1C1'];

    // Ensuite, pour chaque organisation, récupérer les données d'évolution
    this.organisationIds.forEach((orgId, index) => {
      this.DashboardService.getProBYOrgEvolution(orgId).subscribe((data) => {
        // Extraire les mois et les nombres des données API
        const labels = data.map((item: any) => {
          return item.year ? `${item.month} ${item.year}` : item.month; // Mois + Année (si disponible)
        });
        const values = data.map((item: any) => item.nombre); // Récupérer les valeurs

        // Ajouter les données de l'organisation au tableau de datasets
        datasets.push({
          label: `Organisation ID: ${orgId}`, // Associer les données à chaque organisation
          data: values,  // Valeurs associées à chaque mois
          backgroundColor: colors[index % colors.length], // Couleur dynamique
          hoverBackgroundColor: colors[index % colors.length], // Couleur au survol
        });

        // Configuration des données du graphique après avoir ajouté toutes les organisations
        this.data = {
          labels: labels,  // Mois et année pour chaque segment
          datasets: datasets,  // Ajouter les datasets pour toutes les organisations
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
    });
  },
  error: (error) => {
    console.error("Erreur lors de la récupération des organisations :", error);
  },
});

*/
    
  }

}
