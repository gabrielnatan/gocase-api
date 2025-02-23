import { Uuid } from "../../../../@sahred/domain/value-object/uuid/uuid.entity.js";
import { IRepository } from "../../../../@sahred/repository/repository.interface.js";
import { User } from "../user.entity.js";

export interface IUserRepository extends IRepository<User,Uuid>{
    findByEmail(entity:string):Promise<User | null>
}