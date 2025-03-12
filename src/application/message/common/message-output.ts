import { Message } from "../../../domain/message/entity/message/message.entity.js";

export type MessageOutput = {
  id: string;
  chat_id: string;
  sender: "user" | "assistant";
  content: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export class MessageOutputMapper {
  static toOutput(entity: Message): MessageOutput {
    const { 
      id,
      chat_id,
      content,
      sender,
      props,
      type,
      created_at,
      updated_at,
      deleted_at,
     } = entity.toJSON();
    return {
      id: id.id,
      chat_id,
      content,
      ...(type && {type:type}),
      ...(props && {props:props}),
      sender,
      deleted_at,
      updated_at,
      created_at,
    };
  }
}
