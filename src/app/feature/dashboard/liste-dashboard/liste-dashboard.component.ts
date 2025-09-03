import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { OrganisationService } from 'src/app/core/services/organisation.service';
import { Organisation } from 'src/app/core/models/organisation.model';
import { User } from 'src/app/core/models/user.model';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { ProcedureService } from 'src/app/core/services/procedure.service'; 
import { Procedure } from 'src/app/core/models/procedure.model';


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
  organisation=new Array <Organisation>();
  organisations=new Organisation;
  selectedOrganisation=new Organisation;
  procedure=new Array <Procedure>();
  procedures=new Procedure;
  selectedProcedure=new Procedure;
  utilisateur=new User;
  
  isLoading: boolean = false;

  id: number | undefined 

  basicData: any;
  basicOptions: any;

  basicData1: any;
  basicOptions1: any;

  basicData2: any;
  basicOptions2: any;

  basicData3: any;
  basicOptions3: any;

  basicData4: any;
  basicOptions4: any;

  basicData5: any;
  basicOptions5: any;

  basicData6: any;
  basicOptions6: any;

 

  constructor(private DashboardService: DashboardService,
    private organisationService: OrganisationService,
    private userService:UtilisateurService,
    private route:ActivatedRoute,
    private ProcedureService:ProcedureService,
  ) {}

  ngOnInit(): void {

   this.search_Procedure();
    const userData = localStorage.getItem('user');

// Récupérer les données de l'utilisateur depuis le LocalStorage
if (userData) {
  this.user = JSON.parse(userData);
  console.log(this.user);

  // Vérifier que this.user n'est pas null ou undefined et que l'ID existe
  if (this.user && this.user.id !== undefined) {
    this.id = this.user.id; // Assigner l'ID de l'utilisateur
  }
}

// Vérifier que l'ID est défini avant d'appeler getUser
if (this.id !== undefined) {
  this.getUser(this.id); // Appeler getUser uniquement si l'ID est défini
} else {
  console.error('L\'ID utilisateur est introuvable.');
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
            borderColor: '#060',
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
            borderColor: '#060',
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
              
            },
          },
        },
      };
    });



/*    this.DashboardService.getDossierEvolution().subscribe((data) => {
      // Extraire les mois et les nombres des données API
      // Extraire le mois et l'année (si disponible) pour les labels
      const labels = data.map((item: any) => {
        return item.year ? `${item.month} ${item.year}` : item.month; // Concatène mois et année si disponible
      });
      const evolutionData = data.map((item: any) => item.nombre); // Récupère les valeurs

      // Configuration du graphique
      this.basicData3 = {
        labels: labels,
        datasets: [
          {
            label: 'Évolution du nombre de dossiers du système',
            backgroundColor: '#060',
            borderColor: '#060',
            data: evolutionData,
          },
        ],
      };

      this.basicOptions3 = {
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
             
            },
          },
        },
      };
    });*/
    
   
  }


  onOrganisationChange(event: { value: any; }) {
      
    // Récupérer l'organisation sélectionnée
    this.selectedOrganisation = event.value; // event.value contient l'objet de l'organisation sélectionnée

    // Vérifiez que l'organisation sélectionnée n'est pas null
    if (this.selectedOrganisation) {
      const organisationId = this.selectedOrganisation.id; // Récupérer l'ID de l'organisation sélectionnée
      console.log('ID de l\'organisation sélectionnée:', organisationId);

      //nombre de procédure par organisation
      this.DashboardService.getProBYOrgEvolution(organisationId).subscribe((data) => {
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
              label: 'Évolution du nombre de procédures',
              backgroundColor: '#060',
              borderColor: '#060',
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
               
              },
            },
          },
        };
      });



      //nombre de d'utilisateur par organisation
      this.DashboardService.getUserBYOrgEvolution(organisationId).subscribe((data) => {
        // Extraire les mois et les nombres des données API
        const labels = data.map((item: any) => {
          return item.year ? `${item.month} ${item.year}` : item.month; // Mois + Année (si disponible)
        });

        console.log(labels)
        const values = data.map((item: any) => item.nombre); // Récupérer les valeurs
    
         // Configuration du graphique
         this.basicData5 = {
          labels: labels,
          datasets: [
            {
              label: 'Évolution du nombre de procédures',
              backgroundColor: '#060',
              borderColor: '#060',
              data: values,
            },
          ],
        };
  
        this.basicOptions5 = {
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
               
              },
            },
          },
        };
      });


      //nombre de d'utilisateur par organisation
      this.DashboardService.getDossierByOrganisation(organisationId).subscribe((data) => {
        // Extraire les mois et les nombres des données API
        const labels = data.map((item: any) => {
          return item.year ? `${item.month} ` : item.month; // Mois + Année (si disponible)
        });
        console.log(labels)
        const values = data.map((item: any) => item.nombre); // Récupérer les valeurs
        console.log(values)
         // Configuration du graphique
         this.basicData6 = {
          labels: labels,
          datasets: [
            {
              label: 'Évolution du nombre de dossiers par organisation',
              backgroundColor: '#060',
              borderColor: '#060',
              data: values,
            },
          ],
        };
  
        this.basicOptions6 = {
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
               
              },
            },
          },
        };
      });

    }
  }



  onProcedureChange(event: { value: any; }) {
      
    // Récupérer l'organisation sélectionnée
    this.selectedProcedure = event.value; // event.value contient l'objet de l'organisation sélectionnée

    // Vérifiez que l'organisation sélectionnée n'est pas null
    if (this.selectedProcedure) {
      const ProcedureId = this.selectedProcedure.id; // Récupérer l'ID de l'organisation sélectionnée
      console.log('ID de l\'organisation sélectionnée:', ProcedureId);

      this.DashboardService.getDossierByProcedure(ProcedureId).subscribe((data) => {
        // Extraire les mois et les nombres des données API
        const labels = data.map((item: any) => {
          return item.year ? `${item.month} ${item.year}` : item.month; // Mois + Année (si disponible)
        });
        const values = data.map((item: any) => item.nombre); // Récupérer les valeurs
    
         // Configuration du graphique
         this.basicData4 = {
          labels: labels,
          datasets: [
            {
              label: 'Évolution du nombre de demande de procédures',
              backgroundColor: '#060',
              borderColor: '#060',
              data: values,
            },
          ],
        };
  
        this.basicOptions4 = {
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
               
              },
            },
          },
        };
      });

    }
  }


  getUser(id?:number){
    this.userService.userOrgaInfo(id).subscribe({
      complete:()=>{},
  next:(result)=>{
    this.organisation=result.data;
    console.log(this.organisation)
  },
  error:(error)=>{
    console.log(error)
  }
    });
   
  }

  search_Procedure():void{
    this.ProcedureService.search_Procedure().subscribe({
      complete:()=>{},
      next:(result)=>{
        console.log(result+"procedure total");
        this.procedure=result.data;
      },
      error:(error)=>{
        console.log(error);
      }
  
    })
   }
  
}
