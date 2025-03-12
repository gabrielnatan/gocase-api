import mongoose, { Document, Model, Schema } from "mongoose";
import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";

export interface IChat extends Document {
    id: string;
    title: string
    user_id: string,
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

const ChatSchema: Schema = new Schema<IChat>({
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
    user_id: { 
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
    title: { type: String, required: true },
    created_at: { type: Date, required: true, default: Date.now },
    updated_at: { type: Date },
    deleted_at: { type: Date },
})

export const ChatModel: Model<IChat> = mongoose.model<IChat>(
  'Chat',
  ChatSchema
);
