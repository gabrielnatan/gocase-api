import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { IAuthenticationCache } from "../../../@sahred/domain/cache/authentication/authentication.entity.js";

export class LogoutUseCase implements IUseCase<LogoutUseCaseInput,LogoutUseCaseOutput>{
    constructor(
        private readonly authenticationCache: IAuthenticationCache,
    ){}

    async execute(input: LogoutUseCaseInput): Promise<LogoutUseCaseOutput> {
        const { id } = input
        const format_id = id.split(':')[1] 
        await this.authenticationCache.remove(format_id)
        
        return { sucess: true }
    }

}

interface LogoutUseCaseInput{
    id: string
}

type LogoutUseCaseOutput = { sucess: boolean}