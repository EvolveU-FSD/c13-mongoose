import { Router } from "express";
import { createUser, findAllUsers, findUserById } from "./userData.js";
import { requireBasicAuth } from "../auth/authController.js";

const router = Router()

// get a particular user
router.get('/:userId', requireBasicAuth, async function (req, res) {
    const id = req.params.userId

    if (req.user._id != id) {
        res.sendStatus(403)
        return
    }

    console.log(req.params)
    try {
        const user = await findUserById(id)
        if (user === null) {
            res.sendStatus(404)
        }
        else {
            res.send(user)
        }
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// list all users
router.get('/', async function (req, res) {
    try {
        const users = await findAllUsers()
        res.send(users)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    const { username, password } = req.body
    if (username && password) {       
        try {
            const newUser = await createUser(username, password)
            return res.send(newUser)    
        }
        catch (error) {
            return res.status(400).send(error.message)
        }
    }
    else {
        return res.sendStatus(400)
    }
})

export default router