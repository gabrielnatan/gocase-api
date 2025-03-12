import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Chat } from "../../../domain/chat/entity/chat/chat.entity.js";
import { IChatRepository } from "../../../domain/chat/repository/chat.repository.interface.js";
import { ChatOutput, ChatOutputMapper } from "../common/chat-output.js";

export class ListChatUseCase implements IUseCase<ListChatInput,ListChatOutput>{
    constructor(private readonly chatRepo: IChatRepository){}
    
    async execute(input: ListChatInput): Promise<ListChatOutput> {
        const id = new Uuid(input.user_id);
        const chats = await this.chatRepo.findAllWithLastMessage(id)
        return chats ? chats : []
    }

}

export interface ListChatInput {
    user_id: string
}

export type ListChatOutput = ChatOutput[]