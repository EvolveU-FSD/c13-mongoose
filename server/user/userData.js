import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllUsers() {
    const userCollection = await collection('users')
    const cursor = await userCollection.find({}) // no query finds everything!
    const users = await cursor.toArray()
    return users
}

export async function findUserByUsername(username) {
    const userCollection  = await collection('users')
    const singleUser =  await userCollection.findOne({ username })
    return singleUser
}

export async function findUserById(id) {
    const userCollection  = await collection('users')
    const singleUser =  await userCollection.findOne({_id: new ObjectId(id)})
    return singleUser
}

export async function createUser(username, password) {
    const userCollection  = await collection('users')

    const existingUser = await findUserByUsername(username)
    if (existingUser) {
        throw new Error('The user ' + username + ' already exists.')
    }

    const insertResult = await userCollection.insertOne({
        username,
        neverStoreAPasswordLikeThis: password
    })
    console.log('Inserted user ', insertResult.insertedId)
    return await userCollection.findOne({ _id: insertResult.insertedId })
}

export async function deleteAllUsers() {
    const userCollection  = await collection('users')
    userCollection.deleteMany()
}