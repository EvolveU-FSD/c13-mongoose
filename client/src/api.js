
async function getOrDie(url) {
    const httpResponse = await fetch(url)
    if (!httpResponse.ok) {
        throw new Error('Fetch for '+url+' failed: ' + httpResponse.status)
    }
    return (await httpResponse).json()
}

async function postOrDie(url, body) {
    const httpResponse = await fetch(url, {
        method: 'post',
        body: JSON.stringify(body)
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
    return user
}

export async function logout() {
    return await getOrDie('/api/auth/logout')
}

export async function getTractors() {
    return await getOrDie('/api/tractor')
}

export async function getConversion(conversionId) {
    return await getOrDie('/api/conversion/'+conversionId)
}