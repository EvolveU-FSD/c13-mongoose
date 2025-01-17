import { ObjectId } from "mongodb"
import { collection } from "../db.js"
import { addConversionToUser } from "../user/userData.js"

export async function findAllConversions() {
    const conversionCollection = await collection('conversions')
    const cursor = await conversionCollection.find({}) // no query finds everything!
    const conversions = await cursor.toArray()
    return conversions
}

export async function findConversionById(id) {
    const conversionCollection  = await collection('conversions')
    const singleConversion =  await conversionCollection.findOne({_id: new ObjectId(id)})
    return singleConversion
}

export async function findConversionByOwnerId(ownerId) {
    const conversionCollection  = await collection('conversions')
    const singleConversion =  await conversionCollection.findOne({ ownerId })
    return singleConversion
}

export async function createConversionForOwner(user) {
    const conversionCollection  = await collection('conversions')
    const insertResult = await conversionCollection.insertOne({
        orderNumber: 5,
        status: 'pending',
        ownerId: user._id,
        expectedCost: 'unknown',
        activityLog: [
            { date: '2025-01-16', comment: 'deposit processed'}
        ]
    })
    console.log('Inserted conversion ', insertResult.insertedId)
    await addConversionToUser(user, insertResult.insertedId)    
    return await conversionCollection.findOne({ _id: insertResult.insertedId })
}

export async function deleteAllConversions() {
    const conversionCollection  = await collection('conversions')
    conversionCollection.deleteMany()
}