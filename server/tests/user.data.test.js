import './testDb.js'

import { checkPassword, createUser, findUserById, findUserByUsername } from "../user/userData.js"

describe('User data layer', () => {

    it('should create a user', async () => {
        // execute
        const createdUser = await createUser('tony', '123456')
        
        // verify
        expect(createdUser.username).toEqual('tony')
    })

    it('should fail to create a user without a password', async () => {
        // execute
        try {
            await createUser('tony', '')
            fail('Should not be able to create a user without a password')
        }
        catch (error) {
            // happy case!!!
        }
    })

    it('should fail to create a duplicate user', async () => {
        await createUser('tony', '123456')
        // execute
        try {
            await createUser('tony', '123456')
            fail('Should not be able to create a user with the same name a second time')
        }
        catch (error) {
            // happy case!!!
        }
    })

    it('should not expose the users password hash', async () => {
        // execute
        const createdUser = await createUser('tony', '123456')
        
        // verify
        expect(createdUser.pwHash).toBeUndefined()
    })

    it('should find a user by username', async () => {
        // execute
        const createdUser = await createUser('tony', '123456')

        // verify
        const foundUser = await findUserByUsername('tony')
        expect(foundUser._id).toEqual(createdUser._id)        
        expect(createdUser.pwHash).toBeUndefined()
    })

    it('should find a user by id', async () => {
        //setup
        const createdUser = await createUser('tony', '123456')

        // execute
        const foundUser = await findUserById(createdUser._id)

        //verify
        expect(foundUser.username).toEqual(createdUser.username)        
        expect(createdUser.pwHash).toBeUndefined()
    })

    it('should successfully validate a password for a user', async () => {
        //setup
        await createUser('tony', '123456')

        // execute
        const result = await checkPassword('tony', '123456')

        // verify
        expect(result.username).toEqual('tony')        
    })

    it('should reject a bad password for a user', async () => {
        // setup
        await createUser('tony', '123456')

        // execute
        const result = await checkPassword('tony', '7654321')

        // verify
        expect(result).toBeUndefined()        
    })

})