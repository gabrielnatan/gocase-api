import { RedisCache } from "../../../../../@sahred/infrastructure/cache/redis/redis.js";

export interface IAuthentication {
    id: string;
    user_id: string;
    access_token: string;
    expires_at: Date;
    created_at?: Date;
    updated_at?: Date;
    revoked_at?: Date;
}

export class AuthenticationRedis {
    private redisClient: RedisCache;
    private static EXPIRATION_TIME = 60 * 60 * 24; 

    constructor() {
        this.redisClient = new RedisCache();
    }


    async create(authenticationData: IAuthentication): Promise<IAuthentication> {
        const key = this.getKey(authenticationData.user_id);
        await this.redisClient.set(key, authenticationData, AuthenticationRedis.EXPIRATION_TIME);
        return authenticationData;
    }

    async get(user_id: string): Promise<IAuthentication | null> {
        const key = this.getKey(user_id);
        return await this.redisClient.get<IAuthentication>(key);
    }

    async remove(user_id: string): Promise<void> {
        const key = this.getKey(user_id);
        await this.redisClient.delete(key);
    }

    async update(user_id: string, access_token: string, expires_at: Date): Promise<void> {
        const auth = await this.get(user_id);

        if (!auth) {
            throw new Error("Sessão não encontrada");
        }

        auth.access_token = access_token;
        auth.expires_at = expires_at;
        auth.updated_at = new Date();

        await this.redisClient.set(this.getKey(user_id), auth, AuthenticationRedis.EXPIRATION_TIME);
    }

    private getKey(user_id: string): string {
        return `auth:${user_id}`;
    }
}
