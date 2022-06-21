import { Competence } from "./competence.model";
import { Member } from "./member.model";

export class MemberCompetence {
    MemberId?:number;
    CompetenceId?:number;
    jour?: string;
    heureDebut?:number;
    heureFin?:number;
    niveauCompetence?:string;
    Member?:Member;
    Competence?:Competence;
}
