import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IUserRepository } from "../../../domain/user/repository/user.repository.interface.js";

export class DeleteUserUseCase implements IUseCase<DeleteUserInput,DeleteUserOutput>{
    constructor(private readonly userRepo:IUserRepository){}
    async execute(input: DeleteUserInput): Promise<DeleteUserOutput> {
        const uuid = new Uuid(input.id)
        await this.userRepo.delete(uuid)
        return { success: true };
    }
}

export type DeleteUserInput = {
    id: string
};
  
export type DeleteUserOutput = { success: true };;