import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { User } from "../../../../../domain/user/entity/user.entity.js";
import { IUser, UserModel } from "../model/user.model.js";

export class UserModelMapper {
    static toModel(entity: User): IUser {
        return new UserModel({
            id: entity.id,  
            first_name: entity.first_name,
            last_name: entity.last_name,
            email: entity.email,
            password: entity.password,
            role: entity.role,
            created_at: entity.created_at,
            updated_at: entity.updated_at,
            deleted_at: entity.deleted_at,
        })
    }

    static toEntity(model: IUser): User {
        return new User({
            id: new Uuid(model.id.toString()),
            first_name: model.first_name,
            last_name: model.last_name,
            email: model.email,
            password: model.password,
            role: model.role,
            created_at: model.created_at,
            updated_at: model.updated_at,
            deleted_at: model.deleted_at,
        });
    }
}
