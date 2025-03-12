import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IMessageRepository } from "../../../domain/message/repository/message.repository.interface.js";

export class DeleteMessageUseCase implements IUseCase<DeleteMessageUseCaseInput, DeleteMessageUseCaseOutput>{
    constructor(private readonly messageRepo: IMessageRepository){}

    async execute(input: DeleteMessageUseCaseInput): Promise<DeleteMessageUseCaseOutput> {
        const uuid = new Uuid(input.id)
              await this.messageRepo.delete(uuid)
              return { success: true };
    }

}

interface DeleteMessageUseCaseInput {
    id: string
}

type DeleteMessageUseCaseOutput = { success: boolean }