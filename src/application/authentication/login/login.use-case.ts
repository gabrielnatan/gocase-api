import { IUseCase } from "../../../@sahred/application/use-case.interface.js";
import { IAuthenticationCache } from "../../../@sahred/domain/cache/authentication/authentication.entity.js";
import { SessionToken } from "../../../@sahred/domain/token/entity/session-token.entity.js";
import { IUserRepository } from "../../../domain/user/repository/user.repository.interface.js";

export class LoginUseCase implements IUseCase<LoginAuthenticationInput, LoginAuthenticationOutput> {

    constructor(
        private readonly userRepo: IUserRepository,
        private readonly authenticationCache: IAuthenticationCache,
        private readonly sessionToken: SessionToken,
    ) {
        this.authenticationCache = authenticationCache;
    }

    async execute(input: LoginAuthenticationInput): Promise<LoginAuthenticationOutput> {
        const { email, password } = input;
        const user = await this.userRepo.findByEmail(email);

        if (!user) {
            throw new Error("Algo deu errado, tente novamente.");
        }

        if (password !== user.password) {
            throw new Error("Algo deu errado, tente novamente.");
        }

        const accessToken = await this.generateAccessToken(user.id.id);
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

        await this.authenticationCache.create({
            id: `auth:${user.id.id}`,
            user_id: user.id.id,
            access_token: accessToken,
            expires_at: expiresAt,
            created_at: new Date(),
        });

        return {
            success: true,
            access_token: accessToken,
            expires_at: expiresAt,
            user_id: user.id.id
        };
    }

    private async generateAccessToken(user_id: string): Promise<string> {
        return await this.sessionToken.sign(
            { id: user_id },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1h" }
        );
    }
}

interface LoginAuthenticationInput {
    email: string;
    password: string;
}

type LoginAuthenticationOutput = {
    success: boolean;
    access_token?: string;
    expires_at?: Date;
    user_id?: string;
};
