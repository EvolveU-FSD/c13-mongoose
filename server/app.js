import express from 'express'
import path from 'path'

import showRequests from './showRequests.js'
import authController from './auth/authController.js'
import userController from './user/userController.js'
import tractorController from './tractor/tractorController.js'
import conversionController from './conversion/conversionController.js'

export default function configure(app) {
    app.use(showRequests)
    app.use(express.static('../client/dist'))
    app.use(express.json())
    
    app.use('/api/auth',authController)
    app.use('/api/user',userController)
    app.use('/api/tractor',tractorController)
    app.use('/api/conversion',conversionController)
    
    app.use((req, res) => {
        console.log('Encountered unknown path')
        console.log('Sending app to browser in hopes that client side routing knows what to do.')
        res.sendFile(path.join(import.meta.dirname, '../client/dist/index.html'))
    })    
}
