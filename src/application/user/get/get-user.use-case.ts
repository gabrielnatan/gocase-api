import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { Uuid } from "../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { UserRepository } from "../../../infrastructure/user/db/mongo/repository/user.repository.js";
import { UserOutput, UserOutputMapper } from "../common/user-output.js";

export class GetUserUseCase implements IUseCase<GetUserInput,GetUserOutput>{
    constructor(private readonly userRepo: UserRepository){}
    
    async execute(input: GetUserInput): Promise<GetUserOutput> {
        const uuid = new Uuid(input.id)
        const user = await this.userRepo.findById(uuid)
        
        if(!user){
            throw new Error("User not exists")
        }

        return UserOutputMapper.toOutput(user)
    }

}

interface GetUserInput {
    id: string
}

type GetUserOutput = UserOutput