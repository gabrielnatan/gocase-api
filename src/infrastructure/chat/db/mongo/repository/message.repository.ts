import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Chat } from "../../../../../domain/chat/entity/chat/chat.entity.js";
import { IChatRepository } from "../../../../../domain/chat/repository/chat.repository.interface.js";
import { ChatModelMapper } from "../mapper/chat-model.mapper.js";
import { IChat, ChatModel } from "../model/chat.model.js";

export class ChatRepository implements IChatRepository {

    constructor(private chatModel = ChatModel) {}

    async insert(entity: Chat): Promise<void> {
        const chat = ChatModelMapper.toModel(entity);
        await this.chatModel.create(chat);
    }

    async delete(entityId: Uuid): Promise<void> {
        await this.chatModel.updateOne(
            { id: entityId.id },  
            { deleted_at: new Date() }
        );
    }

    async update(entity: Chat): Promise<void> {
        const modelProps = ChatModelMapper.toModel(entity);

        await this.chatModel.updateOne(
            { id: entity.id.id },
            { 
                title: modelProps.title,
                created_at: modelProps.created_at,
                updated_at: new Date(), 
                deleted_at: modelProps.deleted_at,
            }
        );
    }

    async findById(entityId: Uuid): Promise<Chat | null> {
        const model = await this.chatModel.findOne({ 
            id: entityId.toString(),
            deleted_at: null
        });
         
        return model ? ChatModelMapper.toEntity(model) : null;
    }

    async findAll(user_id:Uuid ): Promise<Chat[]> {
        const models = await this.chatModel.find({ user_id:user_id.id, deleted_at: null });
        console.log("ID ", user_id.id)
        console.log("MODELS ", models)
        return models.map((chat: IChat) => ChatModelMapper.toEntity(chat));
    }

    async findByEmail(entity: string): Promise<Chat | null> {
        const model = await this.chatModel.findOne({ email: entity }); 
        return model ? ChatModelMapper.toEntity(model) : null;
    }

    async findAllWithLastMessage(user_id: Uuid): Promise<any[]> {
        const chats = await this.chatModel.aggregate([
            {
                $match: { 
                    user_id: user_id.id,
                    deleted_at: null 
                }
            },
            {
                $lookup: {
                    from: "messages", 
                    localField: "id", 
                    foreignField: "chat_id", 
                    as: "messages"
                }
            },
            {
                $addFields: {
                    lastMessage: {
                        $arrayElemAt: [
                            { 
                                $sortArray: { input: "$messages", sortBy: { created_at: -1 } } 
                            },
                            0
                        ]
                    }
                }
            },
            {
                $sort: {
                    "lastMessage.created_at": -1 // Ordena os chats pela data da última mensagem (do mais recente para o mais antigo)
                }
            },
            {
                $project: {
                    id: 1,
                    title: 1,
                    created_at: 1,
                    updated_at: 1,
                    lastMessage: {
                        content: 1,
                        created_at: 1
                    }
                }
            }
        ]);
    
        console.log("Chats com última mensagem ordenada: ", chats);
        return chats.map((chat) => ({
            id: chat.id,
            title: chat.title,
            created_at: chat.created_at,
            updated_at: chat.updated_at,
            lastMessage: chat.lastMessage ? {
                content: chat.lastMessage.content,
                created_at: chat.lastMessage.created_at
            } : null
        }));
    }
    
    


}
