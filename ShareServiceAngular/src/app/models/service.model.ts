import { Member } from "./member.model";
import { ServiceDemande } from "./service-demande.model";
import { User } from "./user.model";

export class Service {
    id?:number;
    service?: string;
    description?: string;
    image?: string;
    UserId?:any;
    User?:User;
    Members?:Member[];
    ServiceDemandes?:ServiceDemande[]
}
