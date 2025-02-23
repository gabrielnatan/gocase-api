import { beforeAll, describe, expect, it } from 'vitest'
import {  User, UserProps } from '../user.entity.js'
import { Uuid } from '../../../../@sahred/domain/value-object/uuid/uuid.entity.js'
describe('[User entity]', () => {
    let mockUser:UserProps

    beforeAll(()=>{
        const uuid = new Uuid()
        mockUser = {
            id: uuid,
            first_name: 'John',
            last_name: 'Doe',
            email: 'john_doe@email.com',
            password: '123456',
            role: 'admin',
            created_at: new Date(),
            updated_at: undefined,
            deleted_at: undefined
        }
    })
    it("should create a User",()=>{
        
        const user = new User(mockUser)

        expect(user).instanceOf(User)
        expect(user.id).toBe(mockUser.id)
        expect(user.first_name).toBe(mockUser.first_name)
        expect(user.last_name).toBe(mockUser.last_name)
        expect(user.email).toBe(mockUser.email)
        expect(user.password).toBe(mockUser.password)
    })

    it("should create a User with the static create method",()=>{
        const user = User.create(mockUser)

        expect(user).instanceOf(User)
        expect(user.id).toBe(mockUser.id)
        expect(user.first_name).toBe(mockUser.first_name)
        expect(user.last_name).toBe(mockUser.last_name)
        expect(user.email).toBe(mockUser.email)
        expect(user.password).toBe(mockUser.password)
        expect(user.id).instanceOf(Uuid);
    })

    it("should return a JSON representation of the User",()=>{
        const user = new User(mockUser)

        expect(user.toJSON()).toStrictEqual(mockUser)
    })

    it("should create a User and generate an ID if not provided", () => {
        const user = new User(mockUser);
    
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBeDefined(); 
        expect(user.id).instanceOf(Uuid);
    });

    it("should update the first name of the User", () => {
        const user = new User(mockUser);
        user.changeFirstName("Michael");
    
        expect(user.first_name).toBe("Michael");
    });
    
    it("should update the last name of the User", () => {
        const user = new User(mockUser);
        user.changeLastName("Smith");
    
        expect(user.last_name).toBe("Smith");
    });
})