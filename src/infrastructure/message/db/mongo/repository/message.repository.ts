import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Message } from "../../../../../domain/message/entity/message/message.entity.js";
import { IMessageRepository } from "../../../../../domain/message/repository/message.repository.interface.js";
import { MessageModelMapper } from "../mapper/message-model.mapper.js";
import { IMessage, MessageModel } from "../model/message.model.js";

export class MessageRepository implements IMessageRepository {

    constructor(private messageModel = MessageModel) {}

    async insert(entity: Message): Promise<void> {
        console.log("INSET ",entity)
        const message = MessageModelMapper.toModel(entity);
        await this.messageModel.create(message);
    }

    async delete(entityId: Uuid): Promise<void> {
        await this.messageModel.updateOne(
            { id: entityId.id },  
            { deleted_at: new Date() }
        );
    }

    async update(entity: Message): Promise<void> {
        const modelProps = MessageModelMapper.toModel(entity);

        await this.messageModel.updateOne(
            { id: entity.id.id },
            { 
                chat_id: modelProps.chat_id,
                content: modelProps.content,
                sender: modelProps.sender,
                created_at: modelProps.created_at,
                updated_at: new Date(), 
                deleted_at: modelProps.deleted_at,
            }
        );
    }

    async findById(entityId: Uuid): Promise<Message | null> {
        const model = await this.messageModel.findOne({ 
            id: entityId.toString(),
            deleted_at: null
        });
         
        return model ? MessageModelMapper.toEntity(model) : null;
    }

    async findAll(): Promise<Message[]> {
        const models = await this.messageModel.find({ deleted_at: null });
        return models.map((message: IMessage) => MessageModelMapper.toEntity(message));
    }

    async findAllByChatId(chat_id:string): Promise<Message[]> {
        const models = await this.messageModel.find({ chat_id, deleted_at: null });
        return models.map((message: IMessage) => MessageModelMapper.toEntity(message));
    }
    

    async findByEmail(entity: string): Promise<Message | null> {
        const model = await this.messageModel.findOne({ email: entity }); 
        return model ? MessageModelMapper.toEntity(model) : null;
    }


}
