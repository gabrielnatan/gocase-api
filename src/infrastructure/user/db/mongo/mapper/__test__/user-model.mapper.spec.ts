import { beforeAll, describe, expect, it } from "vitest";
import { UserModelMapper } from "../user-model.mapper.js";
import { User, UserProps } from "../../../../../../domain/user/entity/user.entity.js";
import { Uuid } from "../../../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IUser, UserModel } from "../../model/user.model.js";

describe("[User Model Mapper]", () => {
    let mockUser: UserProps;
    let mockUserModel: IUser;

    beforeAll(() => {
        const uuid = new Uuid();

        mockUser = {
            id: uuid,
            first_name: "John",
            last_name: "Doe",
            email: "john_doe@email.com",
            password: "123456",
            role: "admin",
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined,
        };

        mockUserModel = new UserModel({
            id: uuid.toString(),  
            first_name: "John",
            last_name: "Doe",
            email: "john_doe@email.com",
            password: "123456",
            role: "admin",
            created_at: mockUser.created_at,
            updated_at: mockUser.updated_at,
            deleted_at: mockUser.deleted_at,
        });
    });

    it("should create model mapper", () => {
        const user = new User(mockUser);
        const mapper = UserModelMapper.toModel(user);

        expect(mapper).toBeInstanceOf(UserModel);
        expect(mapper.first_name).toBe(mockUser.first_name);
        expect(mapper.last_name).toBe(mockUser.last_name);
        expect(mapper.email).toBe(mockUser.email);
    });

    it("should convert IUser to User entity correctly", () => {
        const userEntity = UserModelMapper.toEntity(mockUserModel);

        expect(userEntity).toBeInstanceOf(User);
        expect(userEntity.id.toString()).toBe(mockUserModel.id);
        expect(userEntity.first_name).toBe(mockUserModel.first_name);
        expect(userEntity.last_name).toBe(mockUserModel.last_name);
        expect(userEntity.email).toBe(mockUserModel.email);
        expect(userEntity.role).toBe(mockUserModel.role);
    });
});
