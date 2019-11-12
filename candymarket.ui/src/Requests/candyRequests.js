import axios from 'axios';

const baseUrl = 'https://localhost:44337/api';

const getAllCandies = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/candy`)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
});

const eatCandy = (candyId) => new Promise((resolve, reject) => {
    axios.delete(`${baseUrl}/candyId/eat`)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
})

const addCandy = (newCandy) => new Promise((resolve, reject) => {
    axios.post(`${baseUrl}/candy`, newCandy)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
})



export default {
    getAllCandies,
    eatCandy,
    addCandy
} 