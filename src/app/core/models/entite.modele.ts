export class Entite{
   
    constructor(
        public id?: string,
        public name?: string,
        public description?: string,
        public  isActive?: boolean,
        public  numeroOrdre?: number
    ){

    }
}

export class ChampEntite{
    constructor(
        public id?:string,
        public name?:string,
        public  description?:string,
        public  entityObjectField?: Entite,
        public  isRequired?:boolean,
        public   inputType?:string,
        public   entityObjectOptionFields?:any,
        public   entityObjectId?:string,
        public     isPresent?:boolean

    ){

    }
}

export class entityObjectOptionFields{
    constructor(
        public  id?: string,
        public name?: string,
        public entityObjectField?: ChampEntite
    ){
   
    }
}

export enum ChampType {
    TEXT="Champ de texte",
    TEXTAREA="Zone de texte",
  //  CHECKBOX="Case à cocher",
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
