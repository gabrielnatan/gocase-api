import mongoose, { Document, Model, Schema } from "mongoose";
import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";

export interface IMessage extends Document {
    id: string;
    chat_id: string;
    sender: "user" | "assistant";
    content: string;
    type?: 'message' | 'briefing' | 'upload' | 'product' | 'postagem' | 'influencers'; 
    props?: object;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

const MessageSchema: Schema = new Schema<IMessage>({
    id: { 
        type: String, 
        required: true, 
        unique: true,
        default: new Uuid().id,
        validate: {
          validator: function(v: string) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
          },
          message: (props) => `${props.value} não é um UUID válido!`
        }
    },
    chat_id: { 
        type: String, 
        required: true, 
        default: new Uuid().id,
        validate: {
          validator: function(v: string) {
            return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v);
          },
          message: (props) => `${props.value} não é um UUID válido!`
        }
    },
    sender: { type: String, required: true, enum: ['assistant', 'user'] },
    content: { type: String, required: true },
    type: { type: String, required: false, enum: ['message' , 'briefing' , 'upload', 'product', 'postagem', 'influencers'] },
    props: { type: Object, required: false },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date },
})

export const MessageModel: Model<IMessage> = mongoose.model<IMessage>(
  'Message',
  MessageSchema
);
