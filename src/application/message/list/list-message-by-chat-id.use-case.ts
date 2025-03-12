import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Message } from "../../../domain/message/entity/message/message.entity.js";
import { IMessageRepository } from "../../../domain/message/repository/message.repository.interface.js";
import { MessageOutput, MessageOutputMapper } from "../common/message-output.js";

export class ListMessageByChatId implements IUseCase<ListMessageInput,ListMessageOutput>{
    constructor(private readonly messageRepo: IMessageRepository){}
    
    async execute(input: ListMessageInput): Promise<ListMessageOutput> {
        const messages = await this.messageRepo.findAllByChatId(input.chat_id)
        return messages ? messages.map((message:Message)=>MessageOutputMapper.toOutput(message)) : []
    }

}

export interface ListMessageInput {
    chat_id: string
}

export type ListMessageOutput = MessageOutput[]