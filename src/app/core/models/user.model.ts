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
        public userOperationsIds?:any[],
        accountNonExpired?:boolean,
        accountNonLocked?:boolean,
        authorities?:any[], 
        credentialsNonExpired?:boolean,
        enabled?:boolean,
        name?:string,
        username?:string,
        procedures?:any,
        organisations?:any


    ){
        

    }
   }

   export class Assigne{
    public organisationIds?:number[];
   }


   export class ProcedurAssign{
    public userProcedureIds?:number[];


   }

   export class OperationAssign{
    public operationsIds?:number[];


   }


  export enum UserRole {
    ORG_ADMIN = 'Administrateur d\'organisation',
    PROCEDURE_MANAGER = 'Manager de procedure',
    SUPER_ADMIN = 'super admin',
    AGENT = 'AGENT',

  }