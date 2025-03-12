import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IChatRepository } from "../../../domain/chat/repository/chat.repository.interface.js";
import { ChatOutput, ChatOutputMapper } from "../common/chat-output.js";

export class UpdateChatUseCase implements IUseCase<UpdateChatInput, UpdateChatOutput> {
    constructor(private readonly chatRepo: IChatRepository) {}

    async execute(input: UpdateChatInput): Promise<ChatOutput> {
        const uuid = new Uuid(input.id);
        const chat = await this.chatRepo.findById(uuid);

        if (!chat) {
            throw new Error("Chat does not exist.");
        }

        if (input.title !== undefined) {
            chat.title = input.title;
        }

        await this.chatRepo.update(chat);

        return ChatOutputMapper.toOutput(chat);
    }
}

export interface UpdateChatInput {
    id: string;
    title?: string;
}

export type UpdateChatOutput = ChatOutput;
