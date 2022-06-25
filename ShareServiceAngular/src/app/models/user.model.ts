import { Role } from "./role.model";
import { Service } from "./service.model";

export class User {
    
    id?: number;
    username?: string;
    email?: string;
    password?: string;

    Roles ?: Role[];
    image?: string;
    Services?:Service[]
}
