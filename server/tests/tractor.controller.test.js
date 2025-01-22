import { startServer, shutdownServer, doGet, doPost } from './testServer.js'

import { createTractor, findTractorById } from '../tractor/tractorData.js'

describe('/api/tractor', () => {

    let baseUrl 
    beforeEach(async () => {
        baseUrl = await startServer()
    })

    afterEach(async () => {
        await shutdownServer(baseUrl)
    })

    it('should find all tractors in db', async () => {
        // setup (create data using data layer)
        await createTractor({ 
            name: "Bug-o-matic", 
            imageUrl: 'http://localhost:5173/src/assets/bug-tractor.jpg', 
            description: "1979 Volkswagon Bug converted into a high traction hauler.",
            price: 15000,
            review: "Great on gas, my kid took it to his high school grad and they all loved it too."        
        })

        // execute
        const response = await fetch(baseUrl+'/api/tractor')

        // verify
        expect(response.ok).toEqual(true)
        const tractors = await response.json()
        expect(tractors.length).toEqual(1)
        expect(tractors[0].name).toEqual('Bug-o-matic')
    })

    it('should find a tractor by id', async () => {
        // setup (create data using data layer)
        const createdTractor = await createTractor({ 
            name: "Bug-o-matic", 
            imageUrl: 'http://localhost:5173/src/assets/bug-tractor.jpg', 
            description: "1979 Volkswagon Bug converted into a high traction hauler.",
            price: 15000,
            review: "Great on gas, my kid took it to his high school grad and they all loved it too."        
        })

        // execute
        const actualTractor = await doGet(baseUrl+'/api/tractor/' + createdTractor._id)

        // verify
        expect(actualTractor.name).toEqual('Bug-o-matic')
    })

    it('should create a tractor', async () => {
        // execute
        const actual = await doPost(baseUrl+'/api/tractor', { 
            name: "new tractor", 
            description: "tractor description"
        })

        // verify
        expect(actual.name).toEqual('new tractor')
        expect(actual.description).toEqual('tractor description')

        // verify data layer here!
    })
})