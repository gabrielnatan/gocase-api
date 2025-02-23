import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IUserRepository } from "../../../domain/user/entity/repository/user.repository.interface.js";
import { UserOutput, UserOutputMapper, UserRole } from "../common/user-output.js";

export class UpdateUserUseCase implements IUseCase<UpdateUserInput, UpdateUserOutput> {
    constructor(private readonly userRepo: IUserRepository) {}

    async execute(input: UpdateUserInput): Promise<UserOutput> {
        const uuid = new Uuid(input.id);
        const user = await this.userRepo.findById(uuid);

        if (!user) {
            throw new Error("User does not exist.");
        }

        if (input.first_name !== undefined) {
            user.first_name = input.first_name;
        }

        if (input.last_name !== undefined) {
            user.last_name = input.last_name;
        }

        if (input.email !== undefined) {
            user.email = input.email;
        }

        if (input.password !== undefined) {
            user.password = input.password;
        }

        if (input.role !== undefined) {
            user.role = input.role;
        }

        await this.userRepo.update(user);

        return UserOutputMapper.toOutput(user);
    }
}

export interface UpdateUserInput {
    id: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
}

export type UpdateUserOutput = UserOutput;
