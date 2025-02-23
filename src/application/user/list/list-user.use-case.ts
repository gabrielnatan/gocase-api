import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { IUserRepository } from "../../../domain/user/entity/repository/user.repository.interface.js";
import { User } from "../../../domain/user/entity/user.entity.js";
import { UserOutput, UserOutputMapper } from "../common/user-output.js";

export class ListUserUseCase implements IUseCase<ListUserInput,ListUserOutput>{
    constructor(private readonly userRepo: IUserRepository){}
    
    async execute(input: ListUserInput): Promise<ListUserOutput> {
        const users = await this.userRepo.findAll()
        return users ? users.map((user:User)=>UserOutputMapper.toOutput(user)) : []
    }

}

export interface ListUserInput {}

export type ListUserOutput = UserOutput[]