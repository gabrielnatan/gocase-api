import { IAuthentication } from "../../../../infrastructure/authentication/cache/redis/repository/redis.repository.js";

export interface IAuthenticationCache {
    create(authenticationData: IAuthentication): Promise<IAuthentication>;
    get(user_id: string): Promise<IAuthentication | null>;
    remove(user_id: string): Promise<void>;
    update(user_id: string, access_token: string, expires_at: Date): Promise<void>;
}
