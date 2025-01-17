import { Router } from "express";
import { findConversionById } from "./conversionData.js";

const router = Router()

// get a particular conversion
router.get('/:conversionId', async function (req, res) {
    const id = req.params.conversionId
    console.log(req.params)
    try {
        const conversion = await findConversionById(id)
        if (conversion === null) {
            res.sendStatus(404)
        }
        else {
            res.send(conversion)
        }
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

export default router