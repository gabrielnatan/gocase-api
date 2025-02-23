import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { IUserRepository } from "../../../domain/user/entity/repository/user.repository.interface.js";
import { User } from "../../../domain/user/entity/user.entity.js";
import { UserOutput, UserOutputMapper, UserRole } from "../common/user-output.js";

export class CreateUserUseCase implements IUseCase<CreateUserInput,CreateUserOutput>{
    constructor(private readonly userRepo: IUserRepository){}

    async execute(input: CreateUserInput): Promise<UserOutput> {
        const userExist = await this.userRepo.findByEmail(input.email)
        
        if(userExist){
            throw new Error('User already exists');
        }

        const entity = User.create(input);
        await this.userRepo.insert(entity);

        return UserOutputMapper.toOutput(entity);
    }
}

export type CreateUserInput = {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    role: UserRole
  };
  
  export type CreateUserOutput = UserOutput;