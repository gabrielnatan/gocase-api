import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Chat } from "../../../domain/chat/entity/chat/chat.entity.js";
import { IChatRepository } from "../../../domain/chat/repository/chat.repository.interface.js";
import { ChatOutput, ChatOutputMapper } from "../common/chat-output.js";

export class CreateChatUseCase implements IUseCase<CreateChatUseCaseInput, CreateChatUseCaseOutput>{
    constructor(private readonly chatRepo: IChatRepository){}

    async execute(input: CreateChatUseCaseInput): Promise<ChatOutput> {
        const { title, user_id } = input
        
        const entity = new Chat({
            title,
            user_id,
            created_at: new Date(),
        })

        console.log("ENTITY ",entity)
        await this.chatRepo.insert(entity);
        return ChatOutputMapper.toOutput(entity)
    }

}

interface CreateChatUseCaseInput {
    title: string
    user_id: string,
}

type CreateChatUseCaseOutput = ChatOutput