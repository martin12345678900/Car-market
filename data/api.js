async function request(url, options) {
    try {
        const serverResponse = await fetch(url, options);

        if (serverResponse.ok == false) {
            throw new Erorr((await serverReponse.json()).message);
        }

        return await serverResponse.json();
    } catch(error) {
        throw error;
    }
}

function setOptions(method, data) {
    const options = {
        method,
        headers: {}
    }

    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
        options.headers['X-Authorization'] = authToken;
    }

    if (data) {
        options.body = JSON.stringify(data);
        options.headers['Content-Type'] = 'application/json';
    }

    return options;
}

async function get(url) {
    const data = await request('http://localhost:3030' + url, setOptions('get'));
    return data;
}

async function post(url, data) {
    const userData = await request('http://localhost:3030' + url, setOptions('post', data));
    return userData;
}

async function put(url, data) {
    await request('http://localhost:3030' + url, setOptions('put', data));
}

async function del(url) {
    await request('http://localhost:3030' + url, setOptions('delete'));
}

export {
    get,
    post,
    put,
    del
}