import { v4 as uuid } from "uuid"
export type UserProps = {
    id?:string;
    first_name: string;
    last_name: string;
}

export class User {
    id?:string;
    first_name: string;
    last_name: string;
    
    constructor({ id = uuid(), first_name, last_name}:UserProps){
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name 
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

    toJSON(){
        return{
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name
        }
    }
}