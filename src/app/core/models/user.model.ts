import { Organisation } from "./organisation.model";

export class User{
    constructor(
        public id?:number,
        public firstName?:string,
        public lastName?:string,
        public email?:string,
        public password?:string,
        public role?:any,
        public isActive?:boolean,
        public userOrganisationsIds?:any[],
        public userProceduresIds?:any[],

    ){
        

    }
   }

   export class Assigne{
    public organisationIds?:number[];
   }


   export class ProcedurAssign{
    public userProcedureIds?:number[];


   }