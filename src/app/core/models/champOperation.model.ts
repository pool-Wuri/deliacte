export class ChampOperation{
    constructor(
        public id?:number,
        public name?:string | null,
        public description?:string,
        public inputType?:any,
        public operationId?:number,
        public operation?:any,
        public isRequired?:boolean,
        public options?:any


    ){}
}