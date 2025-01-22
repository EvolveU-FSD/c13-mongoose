import './testDb.js'

import express from 'express'
import configure from '../app'
import { createUser } from '../user/userData.js'

let runningServers = {}
let credential  // from the currently running test

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

export function createCredentialHeaders(username, password) {
    return {
        'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    }
}

export async function createUserAndLogin() {
    const username = 'someUsername'
    const password = 'somePassword'
    const user = await createUser(username, password)
    credential = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    return user
}

export async function logout() {
    credential = undefined
}

export async function doGet(url) {
    const headers = {}
    if (credential) headers['Authorization']=credential

    const response = await fetch(url, { headers })
    expect(response.ok).toEqual(true) 
    return await response.json()
}

export async function doPost(url, body) {
    const headers = {
        'Content-Type': 'application/json'
    }
    if (credential) headers['Authorization']=credential

    const response = await fetch(url, {
        method: 'post',
        headers,
        body: JSON.stringify(body)
    })
    expect(response.ok).toEqual(true) 
    return await response.json()
}

afterAll(async () => {
    const baseUrls = Object.keys(runningServers)
    await Promise.allSettled(baseUrls.map(shutdownServer))
})