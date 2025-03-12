import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { Chat } from "../../../../../domain/chat/entity/chat/chat.entity.js";
import { ChatModel, IChat } from "../model/chat.model.js";

export class ChatModelMapper {
    static toModel(entity: Chat): IChat {
        return new ChatModel({
            id: entity.id,
            title: entity.title,
            user_id: entity.user_id,
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        })
    }

    static toEntity(model: IChat): Chat {
        return new Chat({
            id: new Uuid(model.id),
            title: model.title,
            user_id: model.user_id,
            created_at: model.created_at,
            updated_at: model.updated_at,
            deleted_at: model.deleted_at
        });
    }
}
