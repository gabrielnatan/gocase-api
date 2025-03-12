import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Message } from "../../../domain/message/entity/message/message.entity.js";
import { IMessageRepository } from "../../../domain/message/repository/message.repository.interface.js";
import { MessageOutput, MessageOutputMapper } from "../common/message-output.js";

export class CreateMessageUseCase implements IUseCase<CreateMessageUseCaseInput, CreateMessageUseCaseOutput>{
    constructor(private readonly messageRepo: IMessageRepository){}

    async execute(input: CreateMessageUseCaseInput): Promise<MessageOutput> {
        const { 
            chat_id,
            content,
            sender,
        } = input
        
        const entity = new Message({
            chat_id,
            content,
            sender,
            created_at: new Date(),
        })
        console.log("SENDER ",entity)

        await this.messageRepo.insert(entity);
        return MessageOutputMapper.toOutput(entity)
    }

}

interface CreateMessageUseCaseInput {
    chat_id: string;
    sender: "user" | "assistant";
    content: string;
}

type CreateMessageUseCaseOutput = MessageOutput