import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IChatRepository } from "../../../domain/chat/repository/chat.repository.interface.js";

export class DeleteChatUseCase implements IUseCase<DeleteChatUseCaseInput, DeleteChatUseCaseOutput>{
    constructor(private readonly chatRepo: IChatRepository){}

    async execute(input: DeleteChatUseCaseInput): Promise<DeleteChatUseCaseOutput> {
        const uuid = new Uuid(input.id)
              await this.chatRepo.delete(uuid)
              return { success: true };
    }

}

interface DeleteChatUseCaseInput {
    id: string
}

type DeleteChatUseCaseOutput = { success: boolean }