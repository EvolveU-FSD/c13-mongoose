import { connect } from '../db.js'
import { addConversionToUser } from "../user/userData.js"

const mongoose = await connect()

const conversionSchema = mongoose.Schema({
    orderNumber: Number,
    status: {
        type: String,
        required: true
    },
    ownerId: {
        type: mongoose.ObjectId,
    },
    expectedCost: { 
        type: Number, 
        default: null 
    },
    activityLog: [ { date: String, comment: String }],
})

const Conversion = mongoose.model("conversion", conversionSchema, "conversions");

export async function findAllConversions() {
    return await Conversion.find()
}

export async function findConversionById(id) {
    return await Conversion.findById(id)
}

export async function findConversionByOwnerId(ownerId) {
    return await Converstion.findOne({ ownerId })
}

export async function createConversionForOwner(user) {
    const conversion = await Conversion.create({
        orderNumber: 5,
        status: 'pending',
        ownerId: user._id,
        activityLog: [
            { date: '2025-01-16', comment: 'deposit processed'}
        ]
    })
    await addConversionToUser(user, conversion._id) 
    return conversion   
}

export async function deleteAllConversions() {
    await Conversion.deleteMany()
}