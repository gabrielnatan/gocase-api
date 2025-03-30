import { Entity } from "../../../../@sahred/domain/entity/entity.js";
import { Uuid } from "../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { ValueObject } from "../../../../@sahred/domain/value-object/value-object.js";

export interface MessageProps{
    id?: Uuid;
    chat_id: string;
    sender: "user" | "assistant";
    content: string;
    type?: 'message' | 'briefing' | 'upload' | 'product' | 'postagem' | 'influencers';
    props?: object;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export class Message  extends Entity{
    id: Uuid;
    chat_id: string;
    sender: "user" | "assistant";
    content: string;
    type?: 'message' | 'briefing' | 'upload'| 'product' | 'postagem' | 'influencers' = 'message'; 
    props?: object;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;

    constructor({ id, chat_id, sender, content, type, props, created_at, updated_at, deleted_at }: MessageProps) {
        super()
        this.id = id ?? new Uuid();
        this.chat_id = chat_id;
        this.sender = sender;
        this.content = content;
        this.type = type ?? 'message';
        this.props = props
        this.created_at = created_at ?? new Date();
        this.updated_at = updated_at ?? undefined;
        this.deleted_at = deleted_at ?? undefined;
    }

    static create(messageProps: MessageProps) {
        return new Message(messageProps);
    }

    get entity_id(): ValueObject {
        return this.id
    }

    toJSON() {
        return {
            id: this.id, 
            chat_id: this.chat_id,
            sender: this.sender,
            content: this.content,
            ...(this.type && {type:this.type,}),
            ...(this.props && {props: this.props}),
            created_at: this.created_at,
            updated_at: this.updated_at, 
            deleted_at: this.deleted_at
        }
    }
}
