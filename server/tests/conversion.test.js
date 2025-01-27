import { createConversionForOwner } from '../conversion/conversionData.js'
import { createUser } from '../user/userData.js'
import { startServer, shutdownServer, doGet, doPost, createUserAndLogin, createCredentialHeaders } from './testServer.js'

describe('/api/conversion', () => {

    let baseUrl 
    beforeEach(async () => {
        baseUrl = await startServer()
    })

    afterEach(async () => {
        await shutdownServer(baseUrl)
    })

    it('should create a new conversion with default state', async () => {
        // setup (create data using data layer)
        const user = await createUserAndLogin()
        const conversion = await createConversionForOwner(user)

        // execute
        const actual = await doGet(baseUrl+'/api/conversion/'+conversion._id)

        // verify
        expect(actual.status).toEqual('pending')
        expect(actual.expectedCost).toEqual(null)
    })

    it('should require login to access a conversion', async () => {
        // setup (create data using data layer)
        const user = await createUser('owner', 'ownerpassword') // NO LOGIN
        const conversion = await createConversionForOwner(user)

        // execute
        const response = await fetch(baseUrl+'/api/conversion/'+conversion._id)

        // verify
        expect(response.status).toEqual(401)
    })

    it('should not allow the non-owner to access a conversion', async () => {
        // setup (create data using data layer)
        const user = await createUser('owner', 'ownerpassword') // NO LOGIN
        const conversion = await createConversionForOwner(user)
        const someOtherUser = await createUser('someoneElse', 'someoneElsesPassword')
        
        // execute
        const response = await fetch(baseUrl+'/api/conversion/'+conversion._id,
            { headers: createCredentialHeaders('someoneElse', 'someoneElsesPassword') }
        )

        // verify
        expect(response.status).toEqual(403)
    })

})