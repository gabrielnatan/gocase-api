import { Entity } from "../domain/entity/entity.js"
import { ValueObject } from "../domain/value-object/value-object.js"

export interface IRepository<E extends Entity, EntityId extends ValueObject>{
    insert(entity:E):Promise<void>
    delete(entityId:EntityId):Promise<void>
    update(entityId:EntityId):Promise<void>
    
    findById(entityId:EntityId):Promise<E | null>
    findAll():Promise<E[] | null>
}