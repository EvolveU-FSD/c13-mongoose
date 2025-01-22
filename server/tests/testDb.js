const dbUri = process.env.MONGO_URI

if (!(dbUri.includes('test') || dbUri.includes('Test'))) {
    throw new Error('Can only run tests against a "test" database '+ dbUri)
}

export * from '../db.js'
import { collection, disconnectDb } from '../db.js'

export async function cleanoutDatabase() {
    await (await collection('users')).deleteMany()
    await (await collection('tractors')).deleteMany()
    await (await collection('conversions')).deleteMany()
}

beforeEach(async () => {
    await cleanoutDatabase()
})

afterAll(async () => {
    await disconnectDb()
})