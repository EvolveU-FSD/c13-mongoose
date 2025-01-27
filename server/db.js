import mongoose from "mongoose";

const mongo_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/c13-tractorify'

let connected = null

export async function connect() {
    if (!connected) {
        connected = await mongoose.connect(mongo_uri);
    }
    return connected
}

export async function disconnectDb() {
    if (connected) {
        await connected.connection.close()
        connected = null
    }
}
