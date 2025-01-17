
async function fetchOrDie(url) {
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
    return {
        name: username
    }
}

export async function getTractors() {
    return await fetchOrDie('/api/tractor')
}

export async function getConversion(conversionId) {
    return await fetchOrDie('/api/conversion/'+conversionId)
}