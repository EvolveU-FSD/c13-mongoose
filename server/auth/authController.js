import { Router } from "express";
const router = Router()

router.get('/login', async function (req, res) {
    res.sendStatus(401)
})

router.get('/currentUser', async function (req, res) {
    res.sendStatus(401)
})

router.get('/logout', async function (req, res) {
    res.sendStatus(401)
})

export default router