import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IMessageRepository } from "../../../domain/message/repository/message.repository.interface.js";
import { MessageOutput, MessageOutputMapper } from "../common/message-output.js";

export class UpdateMessageUseCase implements IUseCase<UpdateMessageInput, UpdateMessageOutput> {
    constructor(private readonly messageRepo: IMessageRepository) {}

    async execute(input: UpdateMessageInput): Promise<MessageOutput> {
        const uuid = new Uuid(input.id);
        const message = await this.messageRepo.findById(uuid);

        if (!message) {
            throw new Error("Message does not exist.");
        }

        if (input.sender !== undefined) {
            message.sender = input.sender;
        }

        if (input.content !== undefined) {
            message.content = input.content;
        }

        await this.messageRepo.update(message);

        return MessageOutputMapper.toOutput(message);
    }
}

export interface UpdateMessageInput {
    id: string;
    sender: "user" | "assistant";
    content: string;
}

export type UpdateMessageOutput = MessageOutput;
