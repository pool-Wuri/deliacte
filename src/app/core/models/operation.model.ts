export class Operation{
    constructor(
        public id?:number,
        public name?:string,
        public description?:string,
        public isActive?:boolean,
        public procedureId?:any,
        public procedure?:any

    ){
        
    }

}

export enum ChampType {
    TEXT="Champ de texte",
    TEXTAREA="Zone de texte",
    CHECKBOX="Case à cocher",
    RADIO="Bouton radio",
    SELECT="Liste déroulante",
    FILE="Fichier",
    IMAGE="Image",
    PDF="Document PDF",
    PASSWORD="Champ de mot de passe",
    EMAIL="Adresse e-mail",
    NUMBER="Champ numérique",
    RANGE="Curseur de sélection",
    DATE="Sélecteur de date",
    TIME="Sélecteur d'heure",
    DATETIME_LOCAL="Sélecteur de date et heure",
    MONTH="Sélecteur de mois",
    WEEK="Sélecteur de semaine",
    SEARCH="Champ de recherche",
    HIDDEN="Champ caché"
  }