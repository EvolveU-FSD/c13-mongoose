import { Router } from "express";
import { createTractor, findAllTractors, findTractorById } from "./tractorData.js";

const router = Router()

// get a particular tractor
router.get('/:tractorId', async function (req, res) {
    const id = req.params.tractorId
    try {
        const tractor = await findTractorById(id)
        if (tractor === null) {
            res.sendStatus(404)
        }
        else {
            res.send(tractor)
        }
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

// list all tractors
router.get('/', async function (req, res) {
    try {
        const tractors = await findAllTractors()
        res.send(tractors)
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.post('/', async (req, res) => {
    console.log('Incoming POST on /api/tractors with data')
    console.log(req.body)

    if (req.body.name && req.body.description) {       
        const newTractor = await createTractor(req.body)
        return res.send(newTractor)
    }
    else {
        return res.sendStatus(400)
    }
})

export default router