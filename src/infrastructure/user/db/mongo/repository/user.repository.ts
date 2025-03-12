import { Uuid } from "../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../../../@sahred/repository/repository.interface.js";
import { IUserRepository } from "../../../../../domain/user/repository/user.repository.interface.js";
import { User } from "../../../../../domain/user/entity/user.entity.js";
import { UserModelMapper } from "../mapper/user-model.mapper.js";
import { UserModel, IUser } from "../model/user.model.js";

export class UserRepository implements IUserRepository {

    constructor(private userModel = UserModel) {}


    async insert(entity: User): Promise<void> {
        const user = UserModelMapper.toModel(entity);
        await this.userModel.create(user);
    }

    async delete(entityId: Uuid): Promise<void> {
        await this.userModel.updateOne(
            { id: entityId.id },  
            { deleted_at: new Date() }
        );
    }

    async update(entity: User): Promise<void> {
        const modelProps = UserModelMapper.toModel(entity);

        await this.userModel.updateOne(
            { id: entity.id.id },
            { 
                first_name: modelProps.first_name,
                last_name: modelProps.last_name,
                email: modelProps.email,
                password: modelProps.password,
                role: modelProps.role,
                created_at: modelProps.created_at,
                updated_at: new Date(), 
                deleted_at: modelProps.deleted_at,
            }
        );
    }

    async findById(entityId: Uuid): Promise<User | null> {
        const model = await this.userModel.findOne({ 
            id: entityId.toString(),
            deleted_at: null
        });
         
        return model ? UserModelMapper.toEntity(model) : null;
    }

    async findAll(): Promise<User[]> {
        const models = await this.userModel.find({ deleted_at: null });
        return models.map((user: IUser) => UserModelMapper.toEntity(user));
    }

    async findByEmail(entity: string): Promise<User | null> {
        const model = await this.userModel.findOne({ email: entity }); 
        return model ? UserModelMapper.toEntity(model) : null;
    }


}
