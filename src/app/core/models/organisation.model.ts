export class Organisation{
    constructor(
        public id?:number,
        public name?:string,
        public parentOrganisationId?:number,
        public description?:string,
        public parentOrganisation?:any,
        public isActive?:boolean

    ){}
}