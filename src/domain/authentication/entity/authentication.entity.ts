import { Entity } from "../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../@sahred/domain/value-object/value-object.js";

export type AuthenticationProps = {
    id?: Uuid;
    user_id: Uuid;
    access_token: string;
    expires_at: Date;
    created_at?: Date;
    updated_at?: Date;
    revoked_at?: Date;
}


export class Authentication extends Entity{
    id: Uuid;
    user_id:Uuid;
    access_token: string;
    expires_at: Date;
    created_at?: Date;
    updated_at?: Date;
    revoked_at?: Date;

    constructor({ id,access_token,expires_at,user_id,created_at,revoked_at,updated_at}: AuthenticationProps){
        super()
        this.id = id ?? new Uuid();
        this.user_id = user_id;
        this.access_token = access_token;
        this.expires_at = expires_at;
        this.created_at = created_at ?? new Date();
        this.updated_at = updated_at;
        this.revoked_at = revoked_at;
    }

    static create(authentication: AuthenticationProps) {
        return new Authentication(authentication);
    }

    revoke() {
        this.revoked_at = new Date();
    }

    get entity_id(): ValueObject {
        return this.id;
    }
    
    toJSON() {
        return {
            id: this.id,
            user_id: this.user_id,
            access_token: this.access_token,
            expires_at: this.expires_at,
            created_at: this.created_at,
            updated_at: this.updated_at,
            revoked_at: this.revoked_at
        }
    }
    
}