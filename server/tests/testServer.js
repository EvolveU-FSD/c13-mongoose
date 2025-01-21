import './testDb.js'

import express from 'express'
import configure from '../app'

let runningServers = {}

export async function startServer() {
    const app = express()
    configure(app)
    return await new Promise((resolve, reject) => {
        let server = app.listen(() => {
            const baseUrl = 'http://localhost:' + server.address().port
            runningServers[baseUrl] = server
            resolve(baseUrl)
        })
    })
}

export async function shutdownServer(baseUrl) {
    if (!runningServers[baseUrl]) return Promise.resolve()
    return new Promise((resolve, reject) => {
        runningServers[baseUrl].close((err) => {
            delete runningServers[baseUrl]
            if (err) {
                reject() 
            }
            else {
                resolve()
            }
        })
    })
}

afterAll(async () => {
    const baseUrls = Object.keys(runningServers)
    await Promise.allSettled(baseUrls.map(shutdownServer))
})