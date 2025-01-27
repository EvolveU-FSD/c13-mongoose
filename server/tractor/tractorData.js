import { connect } from '../db.js'

const mongoose = await connect()

const tractorSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    description: {
        required: true,
        type: String,
    },
    imageUrl: {
        type: String,
    },
    price: {
        type: Number,
    },
    review: {
        type: String,
    }
})
const Tractor = mongoose.model("tractor", tractorSchema, "tractors")

export async function findAllTractors() {
    console.log('Tractors is: ', Tractor)
    return await Tractor.find()
}

export async function findTractorById(id) {
    return await Tractor.findById(id)
}

export async function createTractor(data) {
    return await Tractor.create(data)
}

export async function deleteAllTractors() {
    await Tractor.deleteMany()
}