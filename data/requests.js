import { get, post, put, del} from './api.js';

async function register(userData) {
    return await post('/users/register', userData);
}

async function login(userData) {
    return await post('/users/login', userData);
}

async function getAllListings() {
    return await get('/data/cars?sortBy=_createdOn%20desc');
}

async function createCarListing(carData) {
    return await post('/data/cars', carData);
}

async function carListingDetails(id) {
    return await get('/data/cars/' + id);
}

async function carListingEdit(id, carData) {
    return await put('/data/cars/' + id, carData);
}

async function carListingDelete(id) {
    return await del('/data/cars/'+ id);
}

async function getCarById(id) {
    return await get('/data/cars/' + id);
}

async function carListingsSearch(searchQuery) {
    return await get(`/data/cars?where=year%3D${searchQuery}`);
}

export {
    carListingsSearch,
    carListingDelete,
    carListingEdit,
    carListingDetails,
    createCarListing,
    getCarById,
    getAllListings,
    login,
    register
}