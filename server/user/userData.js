import { ObjectId } from "mongodb"
import { collection } from "../db.js"
import bcryptjs from 'bcryptjs'

export async function findAllUsers() {
    const userCollection = await collection('users')
    const cursor = await userCollection.find({}).project({ pwHash: 0 }) // no query finds everything!
    const users = await cursor.toArray()
    return users
}

export async function findUserByUsername(username) {
    const userCollection  = await collection('users')
    const singleUser =  await userCollection.findOne({ username }, { projection: { pwHash: 0 }})
    return singleUser
}

export async function findUserById(id) {
    const userCollection  = await collection('users')
    const singleUser =  await userCollection.findOne({_id: new ObjectId(id)}, { projection: { pwHash: 0 }})
    return singleUser
}

export async function createUser(username, password) {
    const userCollection  = await collection('users')

    const existingUser = await findUserByUsername(username)
    if (existingUser) {
        throw new Error('The user ' + username + ' already exists.')
    }

    const pwHash = bcryptjs.hashSync(password)
    const insertResult = await userCollection.insertOne({
        username,
        pwHash
    })
    console.log('Inserted user ', insertResult.insertedId)
    return await userCollection.findOne({ _id: insertResult.insertedId })
}

// returns the user or null if the user is not found or the password doesn't match
export async function checkPassword(username, password) {
    const userCollection  = await collection('users')
    const user =  await userCollection.findOne({ username })
    if (bcryptjs.compareSync(password, user.pwHash))
        return user
}

export async function addConversionToUser(user, conversionId) {
    const userCollection  = await collection('users')
    await userCollection.updateOne({ _id: user._id }, { $set: { conversionId } })    
}

export async function deleteAllUsers() {
    const userCollection  = await collection('users')
    userCollection.deleteMany()
}