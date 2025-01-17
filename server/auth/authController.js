import { Router } from "express"
import { checkPassword } from "../user/userData.js"

const router = Router()

async function getUserFromRequest(req) {
    let user
    if (req.headers['authorization']) {
        const authorization = req.headers['authorization']
        const [scheme, credential] = authorization.split(' ')
        if (scheme === 'Basic') {
            const usernamePassword = Buffer.from(credential, 'base64').toString()
            const [username, password] = usernamePassword.split(':')
            user = await checkPassword(username, password)
        }        
    }
    return user
}

export async function requireBasicAuth(req, res, next) {
    req.user = await getUserFromRequest(req)
    // send back 401 if there is no authentication header
    if (!req.user) {
        res.sendStatus(401)
        return
    }
    next()
}

router.post('/login', async function (req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        res.sendStatus(400)
        return
    }

    const user = await checkPassword(username, password)
    console.log(user)
    if (user) {
        // send cookie here!
        res.send(user)
    }
    else {
        res.sendStatus(401)
    }
})

router.get('/currentUser', async function (req, res) {
    let user = await getUserFromRequest(req)
    res.send(user)
})

router.get('/logout', async function (req, res) {
    res.sendStatus(200)
})

export default router