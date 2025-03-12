import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IMessageRepository } from "../../../domain/message/repository/message.repository.interface.js";
import { MessageOutput, MessageOutputMapper } from "../common/message-output.js";

export class GetMessageUseCase implements IUseCase<GetMessageInput,GetMessageOutput>{
    constructor(private readonly messageRepo: IMessageRepository){}
    
    async execute(input: GetMessageInput): Promise<GetMessageOutput> {
        const uuid = new Uuid(input.id)
        const message = await this.messageRepo.findById(uuid)
        
        if(!message){
            throw new Error("Message not exists")
        }

        return MessageOutputMapper.toOutput(message)
    }

}

interface GetMessageInput {
    id: string
}

type GetMessageOutput = MessageOutput