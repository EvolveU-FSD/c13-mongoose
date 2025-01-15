import { ObjectId } from "mongodb"
import { collection } from "../db.js"

export async function findAllTractors() {
    const tractorCollection = await collection('tractors')
    const cursor = await tractorCollection.find({}) // no query finds everything!
    const tractors = await cursor.toArray()
    return tractors
}

export async function findTractorById(id) {
    const tractorCollection  = await collection('tractors')
    const singleTractor =  await tractorCollection.findOne({_id: new ObjectId(id)})
    return singleTractor
}

export async function createTractor(data) {
    const tractorCollection  = await collection('tractors')
    const insertResult = await tractorCollection.insertOne(data)
    console.log('Inserted tractor ', insertResult.insertedId)
    return await tractorCollection.findOne({ _id: insertResult.insertedId })
}

export async function deleteAllTractors() {
    const tractorCollection  = await collection('tractors')
    tractorCollection.deleteMany()
}