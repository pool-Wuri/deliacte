import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChampOperation } from 'src/app/core/models/champOperation.model';
import { ChampType, Operation } from 'src/app/core/models/operation.model';
import { Procedure } from 'src/app/core/models/procedure.model';
import { OperationAssign, User } from 'src/app/core/models/user.model';
import { OperationService } from 'src/app/core/services/operation.service';
import { ProcedureService } from 'src/app/core/services/procedure.service';
import { UtilisateurService } from 'src/app/core/services/utilisateur.service';
import { Location } from '@angular/common';
import { UploadEvent } from 'primeng/fileupload';
import { UploadIcon } from 'primeng/icons/upload';
import { EntiteService } from 'src/app/core/services/entite.service';
import { ChampEntite, Entite } from 'src/app/core/models/entite.modele';

@Component({
  selector: 'app-details-operation',
  templateUrl: './details-operation.component.html',
  styleUrls: ['./details-operation.component.scss']
})
export class DetailsOperationComponent {

  id:number =0;
  procedures=new Array<Procedure>();
  operation=new Operation
  champs=new Array <ChampOperation>();
  addchamp:boolean=false;
  champ= new ChampOperation;
  types = Object.entries(ChampType).map(([key, value]) => ({ id: key, name: value }));
  title:string="";
  addbutton:boolean=false;
  editbutton:boolean=false;
  optionsChamp:string[]=[];
  newOption: string = '';
  optionAdd:any;
  optionResult:any;
  responsUsers=new Array<User>();
  operationsIds=new OperationAssign;
  listeUser:boolean=false;
  list1: any[] | undefined;
  usergroup=new Array <User>()
  usergroup1=new Array <User>()
  list2: any[] | undefined;
  sortOrder!: number;
  selectedOperation=new Array <Operation>();
  disable:boolean=false;;
  submitted:boolean=false;
  loading:boolean=false;
  errorMessage: string | null = null;
  addentite:boolean=false;
  entites=new Array <Entite>();
  entitesOperations=new Array <Entite>();
  entitesSelect: any[] = []; // plusieurs lignes sélectionnées
  entiteId:any[]=[];
  operationId!:number;
  addchampEntite:boolean=false;
  entityOperation!:Entite;
  champsEntites=new Array <ChampEntite>();
  champsEntitesSelect: any[] = []; // plusieurs lignes sélectionnées

  constructor(
    private route:ActivatedRoute,
    private procedureService:ProcedureService,
    private operationService:OperationService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService,
    private userService:UtilisateurService,
    private location: Location,
    private entiteService:EntiteService,

){
  }

  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.id = params['id']; 
      if(this.id){
        this.getProcedure(this.id)
        this.searchRespon(this.id);
        this.searchEntiteByOperation(this.id)
      }
    }
    );
  // this.searchChamp();
  }

  getProcedure(id?:number){
       this.loading=true;
      this.operationService.get_Procedure(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          //console.log(result)
          if(result.status==200 ||  result.status==201){
            this.operation=result.data;
            this.operationService.searchChamp("").subscribe({
              next:(value)=>{
                this.champs=value.data;
                if(this.champs){
                  this.champs=this.champs.filter(u=>u.operationId==id);
                 // console.log(this.champs)
                  this.champs.reverse()
                }
              },
              complete:()=>{},
              error:(err)=>{}
            });
            if(this.operation.procedureId!==0){
              this.procedureService.get_Procedure(this.operation.procedureId).subscribe({
                complete:()=>{},
                next:(result)=>{
                  this.operation.procedure=result.data;
                    },
                  error:(er)=>{
                  }
              })
            }
            setTimeout(() => {
              this.loading=false;
            }, 2000);
          
          
          }
          else{
            this.loading=false;
          }
      
        },
        error:(er)=>{
          this.loading=false;

        }
      })
  }

  searchChamp(){
    this.loading=true;
    this.operationService.searchChamp("").subscribe({
      next:(value)=>{
        this.champs=value.data;
        this.loading=false;
        this.champs=this.champs.filter(u=>u.operationId==this.id)
      // this.champs.reverse();
       // console.log(this.champs)
    
      },
      complete:()=>{},
      error:(err)=>{}
    })
  
  }

  supprimerChamp(champ:ChampOperation){
    this.loading=true;
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ce champ?',
      header: 'Suppression',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.operationService.delete_Champ(champ.id).subscribe({
        complete:()=>{},
        next:(result)=>{
          console.log(result)
          if(result.status==201 || result.status==200){
            setTimeout(() => {
              this.loading=false;
              this.searchChamp();
              this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
  
            }, 2000);
          }
          else{
            this.loading=false;
            this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
         
          }
       
        },
        error:(error)=>{
          this.loading=false;
          this.messageService.add({severity:'error', summary: 'Erreur', detail: error, life: 3000});
        }
    
      })
    },
    reject:()=>{
      this.messageService.add({severity:'error', summary: 'Echec', detail: 'Champ non supprimé', life: 3000});
    }
  });

  }

  editChamp(champ:ChampOperation){
    this.title="Modifier champ";
    this.editbutton=true;
    this.addbutton=false;
    this.addchamp=true;
    this.champ=champ
  }

  fermerModal(){
    this.addchamp=false;
    this.listeUser=false;
    this.addentite=false;
    this.addchampEntite=false;
  }

  saveChampEdit(){
    this.confirmationService.confirm({
      message: 'Voulez-vous modifier ce champ?',
      header: 'Confirmation',
      acceptLabel:'Oui',
      rejectLabel:'Non',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:'acceptButton',
    accept: () => {
      this.addchamp=false;
      this.optionResult=this.champ.options;
      this.loading=true
      this.operationService.updateChamp(this.champ,this.champ.id).subscribe({
        next:(value)=>{
          if(value.data){
            value.data.options=this.optionResult;
            for(let i=0;i<value.data.options.length;i++){
              value.data.options[i].champOperationId=value.data.id;
              this.operationService.addOption(value.data.options[i]).subscribe({
                next:(result)=>{
                  this.searchChamp();
                },
                complete:()=>{},
                error:(err)=>{
                }
              })
            }
        
          }
          this.addchamp=false;
          this.editbutton=false;
          this.addbutton=false;
          this.loading=false;
        },
        complete:()=>{},
        error:(err)=>{
          this.editbutton=false;
          this.addbutton=false;
        }
      })
     // this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ modifié', life: 3000});
        
    },
    reject:()=>{
      this.addchamp=false;
      this.messageService.add({severity:'error', summary: 'Annuler', detail: ' Champ non modifié', life: 3000});
    }
    });
  }

  ajouterChamp(operation:any){
    this.addchamp=true
    this.title="Ajouter champ";
    this.champ={};
    this.champ.options=[];
    this.editbutton=false;
    this.addbutton=true;
    this.champ.operationId=operation.id;
  }

  saveChamps(){
    this.submitted=true;
    if(this.champ.description && this.champ.name && this.champ.inputType){
      this.confirmationService.confirm({
        message: 'Voulez-vous sauvegarder ce champ?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.optionResult=this.champ.options;
        this.operationService.ajouterChamp(this.champ).subscribe({
          next:(value)=>{
            if(value.data){
              value.data.options=this.optionResult;
              for(let i=0;i<value.data.options.length;i++){
                value.data.options[i].champOperationId=value.data.id;
                this.operationService.addOption(value.data.options[i]).subscribe({
                  next:(result)=>{
                    this.searchChamp();
                  },
                  complete:()=>{},
                  error:(err)=>{
                  }
                })
              }
          
            }
            this.searchChamp();
            this.addchamp=false;
            this.editbutton=false;
            this.addbutton=false;
          },
          complete:()=>{},
          error:(err)=>{
            this.editbutton=false;
            this.addchamp=false;
            this.addbutton=false;
          }
        })
        this.messageService.add({severity:'success', summary: 'Succès', detail: 'Champ enregistré', life: 3000});
          
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Echec', detail: ' Champ non enregistré', life: 3000});
      }
      });
    }
  
  }

  addOption() {
    this.optionAdd={
      name:this.newOption,
      champOperationId:this.champ.id
    }
    this.optionAdd;
    this.champ.options.push(this.optionAdd)
  
  this.newOption='';
  }

  searchRespon(idOperation:number){
    this.operationService.searchResponsable(idOperation).subscribe({
      next:(result)=>{
        this.responsUsers=result.data;
      },
      complete:()=>{},
      error:(error)=>{
      }
    })
  }


    retirerUser(user:User){
      this.operationsIds.operationsIds = []; // Initialiser si nécessaire
      this.confirmationService.confirm({
        message: 'Voulez-vous vraiment lui retirer de cette opération?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => { 

        this.messageService.add({severity:'success', summary: 'Succès', detail: 'Opération retirée', life: 3000});
          //Actual logic to perform a confirmation
          
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Echec', detail: 'Opération non retirée', life: 3000});
      }
      });

    }


    groupeUser(operation:any){
    this.operation=operation;
        this.userService.userOrganisation().subscribe({
          complete:()=>{},
          next:(result)=>{
            this.usergroup1=result.data;
            if(this.usergroup1){
              this.operationService.searchResponsable(this.operation.id || 0).subscribe({
                next:(result)=>{
                  this.usergroup=result.data;
                  if(this.usergroup){
                    this.usergroup1 = this.usergroup1.filter(u => !this.usergroup.some(group => group.id === u.id));
                  }
                },
                complete:()=>{},
                error:(error)=>{
                }
              })
            }
          },
          error:(error)=>{
          }
        });
        this.operationsIds={};
        this.listeUser=true;
    }


    userSelet(){
      this.confirmationService.confirm({
        message: 'Voulez-vous ajouter des agents ?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
        accept: () => {
          this.listeUser=false;
          this.operationsIds.operationsIds = []; // Initialiser si nécessaire    
          this.loading=true;
          for(let i=0;i<this.usergroup.length;i++){
            if(this.usergroup[i].id){
            this.userService.operationInfo(this.usergroup[i].id).subscribe({
              complete:()=>{},
              next:(result)=>{
                if(result){
                  for(let i=0;i<result.data.length;i++){
                    this.operationsIds.operationsIds ?.push(result.data[i].id); // Initialiser si nécessaire
                  }
                  this.operationsIds.operationsIds?.push(this.operation.id || 0);
                  this.userService.assigneroperation(this.operationsIds,this.usergroup[i].id).subscribe({
                    complete:()=>{},
                    next:(result)=>{
                    // console.log(result)
                      if(result.status==200 || result.status==201){
                        setTimeout(() => {
                          this.loading=false;
                          this.messageService.add({severity:'success', summary: 'Succès', detail: 'Utilisateur affecté', life: 3000});
                          this.searchRespon(this.id ?? 0);
                        }, 2000);
                      }
                      else{
                        this.messageService.add({severity:'error', summary: 'Echec', detail:result.error, life: 3000});
                        this.loading=false;

                      }
                    // this.searchUser();
                    },
                    error:(error)=>{
                      console.log(error);
                      this.loading=false;
                    }
                
                  });
                }
              
        
              },
              error:(error)=>{
              }
            });
            
            }
        
          }
            //Actual logic to perform a confirmation
            
        },
        reject:()=>{
          this.messageService.add({severity:'error', summary: 'Echec', detail: ' Utilisateur non affecté', life: 3000});
        }
        });
    }

    retourPage(){
      this.location.back();
    }


    onUpload(event: any) {
   //   console.log("Réponse brute :", event);

      const body = event?.originalEvent?.body;

      if (body) {
        if (body.status === 200) {
          // ✅ Succès
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: body.message || 'Fichier téléversé avec succès'
          });
        } else {
          // ⚠️ Erreur logique (même si HTTP est 200)
          this.messageService.add({
            severity: 'warn',
            summary: 'Avertissement',
            detail: body.message || 'Un problème est survenu'
          });
        }
      } else {
        // ❌ Erreur serveur (500, etc.)
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Impossible de téléverser le fichier'
        });
      }
    }

    onError(event: any) {
      console.error("Erreur Upload :", event);

      this.messageService.add({
        severity: 'error',
        summary: 'Erreur serveur',
        detail: 'Une erreur est survenue lors du téléversement'
      });
    }

    ajouterEntit(operation:Operation){
      this.addentite=true;
      this.searchEntite();
      this.operationId=operation.id || 0;
    }

    searchEntite(){
     //this.loading=true;
      this.entiteService.search_Entite().subscribe({
        complete:()=>{},
        next:(result)=>{
        //  console.log(result)
          if(result.status==201 || result.status==200){
            this.entites=result.data;
            console.log(this.entites)
             setTimeout(() => {
                this.loading=false;
              //  this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
              }, 2000);
            }
            else{
              this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
              this.loading=false;
        }
      },
        error:(error)=>{
          this.loading=false;
          this.messageService.add({severity:'error', summary: "Erreur", detail: error, life: 3000});

        }

      })
    }

    saveEntite(){
      const data = {
        operationId: this.operationId,
        entityIds: this.entitesSelect.map(e => e.id)  // ou e.id selon ta structure
      };
      this.confirmationService.confirm({
        message: 'Voulez-vous lier cette entité à l\'opération ?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.addentite=false;
        this.entiteService.saveEntiteOperation(data).subscribe({
          next:(result)=>{
         //   console.log(result)
            if(result.status==201 || result.status==200){
          //   this.entitesOperations=result.data;
            // console.log(this.entites)
              setTimeout(() => {
                  this.loading=false;
                  this.searchEntiteByOperation(this.id);
                  this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
                }, 2000);
              }
              else{
                this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
                this.loading=false;
          }
          },
          complete:()=>{},
          error:(error)=>{
          // console.log(error);
            this.loading=false;
          }
        });      
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Echec', detail: ' Annuler', life: 3000});
      }
      });
    
    }

    searchEntiteByOperation(idOperation:number){
      this.entiteService.search_EntiteByOperation(idOperation).subscribe({
        complete:()=>{},
        next:(result)=>{
            if(result.status==201 || result.status==200){
            this.entitesOperations=result.data;
           // console.log(this.entitesOperations)
            /* setTimeout(() => {
                this.loading=false;
                this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
              }, 2000);*/
            }
            else{
              this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
              this.loading=false;
            }
        },
        error:(error)=>{
          this.loading=false;
          this.messageService.add({severity:'error', summary: "Erreur", detail: error, life: 3000});
        }
  
      })
    }

    ajouterChampOperation(entite:any){
      this.addchampEntite=true;
      this.entityOperation=entite;
      this.searchChampEntite(entite.id)
    }

    searchChampEntite(id:string){
      this.entiteService.getChampByEntity(id).subscribe({
        complete:()=>{},
        next:(result)=>{
          this.champsEntites=result.data;
          this.champsEntitesSelect=this.champsEntites.filter(u=>u.isPresent==true);
          console.log(this.champsEntites)
        },
        error:(err)=>{
          //console.log(err)
        }
      });
    }

    modifierChamp(champ:any){
      this.entiteService.updateChamp(champ,champ.id).subscribe({
        complete:()=>{},
        next:(result)=>{
         // console.log(result)
        },
        error:(err)=>{
          //console.log(err);
        }
      })
    }

    saveChampEntiteOperation(){
      const data = { 
        entityFieldIds: this.champsEntitesSelect.map(e => e.id)
      }
       // ou e.id selon ta structure };
      this.champsEntitesSelect = this.champsEntitesSelect.map(e => ({
        ...e,
        isPresent: true
      }));
      this.confirmationService.confirm({
        message: 'Voulez-vous ajouter ces champs de l\'entité ?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.addchampEntite=false;
        this.entiteService.saveEntiteChampOperation(data,this.id).subscribe({
          next:(result)=>{
            if(result.status==201 || result.status==200){
                  setTimeout(() => {
                     this.loading=false;
                     this.searchEntiteByOperation(this.id);
                    this.searchChamp();
                     this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
                   }, 2000);
            }
            else{
                   this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
                   this.loading=false;
            }
          },
          complete:()=>{},
          error:(error)=>{
            this.loading=false;
          }
        });
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Echec', detail: ' Annuler', life: 3000});
      }
      });

    }

    retirerEntite(entite:any){
      this.entitesSelect[0]=entite;
      const data = {
        operationId: this.id,
        entityIds: this.entitesSelect.map((e: { id: any; }) => e.id)  // ou e.id selon ta structure
      };
      this.confirmationService.confirm({
        message: 'Voulez-vous retirer cette entité ?',
        header: 'Confirmation',
        acceptLabel:'Oui',
        rejectLabel:'Non',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass:'acceptButton',
      accept: () => {
        this.loading=true;
        this.addchampEntite=false;
        this.entiteService.retirerEntiteOperation(data).subscribe({
          next:(result)=>{
            if(result.status==201 || result.status==200){
              setTimeout(() => {
                 this.loading=false;
                 this.searchEntiteByOperation(this.id);
                 this.messageService.add({severity:'success', summary: 'Succès', detail: result.message, life: 3000});
               }, 2000);
             }
             else{
               this.messageService.add({severity:'error', summary: result.error, detail: result.message, life: 3000});
               this.loading=false;
         }
          },
          complete:()=>{},
          error:(error)=>{
            //console.log(error)
          }
        });
      },
      reject:()=>{
        this.messageService.add({severity:'error', summary: 'Echec', detail: ' Annuler', life: 3000});
      }
      });
    }
}


