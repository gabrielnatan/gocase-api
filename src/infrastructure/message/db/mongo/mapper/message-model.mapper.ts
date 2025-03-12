import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Message } from "../../../../../domain/message/entity/message/message.entity.js";
import { IMessage, MessageModel } from "../model/message.model.js";

export class MessageModelMapper {
    static toModel(entity: Message): IMessage {
        return new MessageModel({
            id: entity.id,
            chat_id: entity.chat_id,
            content: entity.content,
            sender: entity.sender,
            ...(entity.type && {type: entity.type}),
            ...(entity.props && {props: entity.props}),
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        })
    }

    static toEntity(model: IMessage): Message {
        return new Message({
            id: new Uuid(model.id),
            chat_id: model.chat_id,
            content: model.content,
            props: model.props,
            type: model.type,
            sender: model.sender,
            created_at: model.created_at,
        });
    }
}
