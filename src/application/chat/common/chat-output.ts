import { Chat } from "../../../domain/chat/entity/chat/chat.entity.js";

export type ChatOutput = {
  id: string;
  title: string;
  user_id: string;
  created_at: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
};

export class ChatOutputMapper {
  static toOutput(entity: Chat): ChatOutput {
    const { 
      id,
      title,
      user_id,
      created_at,
      updated_at,
      deleted_at,
     } = entity.toJSON();
    return {
      id: id.id,
      title: title,
      user_id: user_id,
      deleted_at,
      updated_at,
      created_at,
    };
  }
}
