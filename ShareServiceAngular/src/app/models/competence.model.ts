import { MemberCompetence } from "./member-competence.model";
import { Member } from "./member.model";

export class Competence {
    id?: number;
    competence?: string;
    image?: string;
    Members ?: Member[];
    MemberCompetences?:MemberCompetence[]

}
