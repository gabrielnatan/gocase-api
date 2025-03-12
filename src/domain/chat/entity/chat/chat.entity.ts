import { Entity } from "../../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../../@sahred/domain/value-object/value-object.js";
import { Message } from "../../../message/entity/message/message.entity.js";

export interface ChatProps{
    id?: Uuid
    title: string
    user_id: string,
    messages?: Message[]
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
}

export class Chat extends Entity{
    id: Uuid
    title: string
    user_id: string
    messages: Message[]
    created_at: Date
    updated_at?: Date
    deleted_at?: Date

    constructor({ id, title, user_id, messages,created_at,deleted_at,updated_at }:ChatProps){
        super()
        this.id = id ?? new Uuid()
        this.title = title
        this.user_id = user_id
        this.messages = messages ?? [];
        this.created_at = created_at ?? new Date()
        this.updated_at = updated_at
        this.deleted_at = deleted_at
    }

    static create(chatProps: ChatProps) {
        return new Chat(chatProps);
    }
    
    get entity_id(): ValueObject {
        return this.id
    }

    toJSON() {
        return {
            id: this.id, 
            title: this.title,
            user_id: this.user_id,
            messages: this.messages,
            created_at: this.created_at,
            updated_at: this.updated_at,
            deleted_at: this.deleted_at, 
        }
    }
}