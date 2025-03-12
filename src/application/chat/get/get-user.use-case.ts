import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IChatRepository } from "../../../domain/chat/repository/chat.repository.interface.js";
import { ChatOutput, ChatOutputMapper } from "../common/chat-output.js";

export class GetChatUseCase implements IUseCase<GetChatInput,GetChatOutput>{
    constructor(private readonly chatRepo: IChatRepository){}
    
    async execute(input: GetChatInput): Promise<GetChatOutput> {
        const uuid = new Uuid(input.id)
        const chat = await this.chatRepo.findById(uuid)
        
        if(!chat){
            throw new Error("Chat not exists")
        }

        return ChatOutputMapper.toOutput(chat)
    }

}

interface GetChatInput {
    id: string
}

type GetChatOutput = ChatOutput