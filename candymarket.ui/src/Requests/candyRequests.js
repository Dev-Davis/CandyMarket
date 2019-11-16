import axios from 'axios';

const baseUrl = 'https://localhost:44337/api';

const getAllCandies = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/candy`)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
});

const eatCandy = candyId => axios.delete(`${baseUrl}/candy/${candyId}/eat`);

const addCandy = (newCandy) => axios.post(`${baseUrl}/candy`, newCandy);



export default {
    getAllCandies,
    eatCandy,
    addCandy
} 