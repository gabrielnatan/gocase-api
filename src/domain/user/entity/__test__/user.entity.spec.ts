import { beforeAll, describe, expect, it } from 'vitest'
import { User, UserProps } from '../user.entity.js'
import { v4 as uuid} from 'uuid'
describe('[User entity]', () => {
    let mockUser:UserProps

    beforeAll(()=>{
        mockUser = {
            id: uuid(),
            first_name: 'John',
            last_name: 'Doe',
        }
    })
    it("should create a User",()=>{
        
        const user = new User(mockUser)

        expect(user).instanceOf(User)
        expect(user.id).toBe(mockUser.id)
        expect(user.first_name).toBe(mockUser.first_name)
        expect(user.last_name).toBe(mockUser.last_name)
    })

    it("should create a User with the static create method",()=>{
        const user = User.create(mockUser)

        expect(user).instanceOf(User)
        expect(user.id).toBe(mockUser.id)
        expect(user.first_name).toBe(mockUser.first_name)
        expect(user.last_name).toBe(mockUser.last_name)
        expect(typeof user.id).toBe("string");
    })

    it("should return a JSON representation of the User",()=>{
        const user = new User(mockUser)

        expect(user.toJSON()).toStrictEqual(mockUser)
    })

    it("should create a User and generate an ID if not provided", () => {
        const user = new User(mockUser);
    
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBeDefined(); 
        expect(typeof user.id).toBe("string");
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