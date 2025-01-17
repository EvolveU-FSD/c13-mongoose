let credential
    
async function getOrDie(url) {
    const headers = (credential) ? { "Authorization": credential }  : undefined

    const httpResponse = await fetch(url, { headers })
    if (!httpResponse.ok) {
        throw new Error('Fetch for '+url+' failed: ' + httpResponse.status)
    }
    return (await httpResponse).json()
}

async function postOrDie(url, body) {
    const headers = (credential) ? { "Authorization": credential }  : undefined

    const httpResponse = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers
    })
    if (!httpResponse.ok) {
        throw new Error('Fetch for '+url+' failed: ' + httpResponse.status)
    }
    return (await httpResponse).json()
}

export async function login(username, password) {
    const loginResponse = await fetch('/api/auth/login', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })
    if (!loginResponse.ok) {
        throw new Error('Login failed')
    }
    const user = await loginResponse.json()
    if (!user) {
        throw new Error('Login failed')
    }
    credential = 'Basic ' + btoa(`${username}:${password}`)
    return user
}

export async function logout() {
    await getOrDie('/api/auth/logout')
    credential = null
    console.log('Logged out and deleted credential')
    return
}

export async function getTractors() {
    return await getOrDie('/api/tractor')
}

export async function getConversion(conversionId) {
    return await getOrDie('/api/conversion/'+conversionId)
}