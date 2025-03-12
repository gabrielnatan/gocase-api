import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../@sahred/repository/repository.interface.js";
import { Message } from "../entity/message/message.entity.js";

export interface IMessageRepository extends IRepository<Message,Uuid>{
    findAllByChatId(chat_id:string): Promise<Message[]>
}