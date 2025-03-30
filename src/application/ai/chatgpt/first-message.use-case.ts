import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Message } from "../../../domain/message/entity/message/message.entity.js";
import { ChatGPTService } from "../../../infrastructure/ai/chatgpt/chatgpt.js";
import { ChatRepository } from "../../../infrastructure/chat/db/mongo/repository/message.repository.js";

export class FirstMessageUseCase {
    constructor(
        private chatGPTService: ChatGPTService,
        private chatRepository: ChatRepository
    ) {}

    async execute(chat_id: Uuid ): Promise<{ botMessage: Message }> {
        console.log("CHAT ID ", chat_id)
        const chat = await this.chatRepository.findById(chat_id);
        if (!chat) {
            throw new Error("Chat não encontrado.");
        }
        console.log("RETURN CHAT ", chat)
        this.chatGPTService.chatInfo({ chat_id:chat_id.id, title:chat.title, messages:[] })
        const botResponse = await this.chatGPTService.sendMessage({ role: "user", content: 'Mande de forma amigavel uma saldação, pois o chat esta iniciando. mande algo parecido com "Olá,como posso te ajdar a criar uma camapanha?"' });

        console.log("AQUI QUANTAS VEZES ",botResponse)
        return { botMessage: botResponse };
    }
}
