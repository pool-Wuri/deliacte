export class Procedure{
    constructor(
        public id?:number,
        public description?:string,
        public name?:string,
        public organisation?:any,
        public status?:any,
        public organisationId?:number,
        public isActive?:boolean,

    ){}
}
export enum ProcedureStatus {
    ARCHIVED = "Archivée",
    DRAFT = "Brouillon",
    PUBLISHED = "Publiée"
}