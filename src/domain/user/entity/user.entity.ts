import { Entity } from "../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../@sahred/domain/value-object/value-object.js";

type Role = 'admin' | 'user';

export type UserProps = {
    id?:Uuid;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: Role;
}

export class User extends Entity{
    id:Uuid;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: Role;
    
    constructor({ id, first_name, last_name, email, password, role}:UserProps){
        super()
        this.id = id ?? new Uuid();
        this.first_name = first_name;
        this.last_name = last_name 
        this.email = email;
        this.password = password 
        this.role = role 
    }

    changeFirstName(first_name:string){
        this.first_name = first_name
    }

    changeLastName(last_name:string){
        this.last_name = last_name
    }


    static create(user: UserProps){
        return new User(user)
    }

    get entity_id(): ValueObject {
        return this.id
    }

    toJSON(){
        return{
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            role: this.role,
        }
    }
}