import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Message } from "../../../domain/message/entity/message/message.entity.js";
import { ChatGPTService } from "../../../infrastructure/ai/chatgpt/chatgpt.js";
import { ChatRepository } from "../../../infrastructure/chat/db/mongo/repository/message.repository.js";
import { MessageRepository } from "../../../infrastructure/message/db/mongo/repository/message.repository.js";


export class SendMessageUseCase {
    constructor(
        private chatGPTService: ChatGPTService,
        private messageRepository: MessageRepository,
        private chatRepository: ChatRepository
    ) {}

    async execute(chat_id: Uuid, userMessage: string): Promise<{ userMessage: Message; botMessage: Message }> {
        const chat = await this.chatRepository.findById(chat_id);
        if (!chat) {
            throw new Error("Chat não encontrado.");
        }

        const userMsg = Message.create({ chat_id: chat_id.id, sender: "user", content: userMessage });
        await this.messageRepository.insert(userMsg);

        let messages = await this.messageRepository.findAllByChatId(chat_id.id);

        let newMessages = messages.map(el=>{
            return {
                chat_id: el.chat_id,
                content: el.content,
                role: el.sender,
                created_at: el.created_at,
            }
        })
        this.chatGPTService.chatInfo({ chat_id:chat_id.id, title:chat.title, messages:newMessages })
        const botResponse = await this.chatGPTService.sendMessage({ role: "user", content: userMessage });

        const botMsg = Message.create({ chat_id: chat_id.id, sender: "assistant", content: botResponse });
        await this.messageRepository.insert(botMsg);

        return { userMessage: userMsg, botMessage: botMsg };
    }
}
