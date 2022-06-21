import { Member } from "./member.model";
import { Service } from "./service.model";

export class ServiceDemande {
    id?:number;
    MemberId?:number;
    ServiceId?:number;
    jourHeurePropose?:Date;
    createdAt?:Date;
    Member?:Member;
    Service?:Service;
}
