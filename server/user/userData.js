import { connect } from '../db.js'
import bcryptjs from 'bcryptjs'

const mongoose = await connect()

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    pwHash: {
        type: String,
        required: true,
        select: false,
    },
    conversionId: mongoose.ObjectId
}) 

const User = mongoose.model("user", userSchema, "users")

export async function findAllUsers() {
    return await User.find()
}

export async function findUserByUsername(username) {
    return await User.findOne({ username });
}

export async function findUserById(id) {
    return await User.findById(id);
}

export async function createUser(username, password) {
    try {
        const pwHash = bcryptjs.hashSync(password)
        const createdUser = await User.create({
          username,
          pwHash,
        })
        return findUserById(createdUser._id)
    } catch (error) {
        if (error.code === 11000) {
            throw new Error("Duplicate Username")
        }
    }    
}

// returns the user or null if the user is not found or the password doesn't match
export async function checkPassword(username, password) {
    const user = await User.findOne({ username }).select('+pwHash')
    if (user && bcryptjs.compareSync(password, user.pwHash)) {
        const userData = user.toObject()
        delete userData.pwHash
        return userData;
    } else {
        return undefined;
    }
}

export async function addConversionToUser(user, conversionId) {
    user.conversionId = conversionId
    await user.save()
}

// please never call this on a production system.
export async function deleteAllUsers() {
    await User.deleteMany();
}