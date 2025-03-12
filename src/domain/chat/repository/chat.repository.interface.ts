import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../@sahred/repository/repository.interface.js";
import { Chat } from "../entity/chat/chat.entity.js";

export interface IChatRepository extends IRepository<Chat,Uuid>{
    findAllWithLastMessage:(user_id: Uuid)=> Promise<any[]>
}