import { Competence } from "./competence.model";
import { MemberCompetence } from "./member-competence.model";
import { Quartier } from "./quartier.model";
import { ServiceDemande } from "./service-demande.model";
import { Service } from "./service.model";

export class Member {

    id?: number;
    name?: string;
    surname?:string;
    email?: string;
    phone?:string;
    rue?: string;
    numero?:string;
    image?: string;
    QuartierId?:any;
    Quartier?:Quartier;
    Competences?:Competence[];
    Services?:Service[];
    MemberCompetences?:MemberCompetence[];
    ServiceDemande?:ServiceDemande
}
