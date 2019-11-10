import axios from 'axios';

const baseUrl = 'https://localhost:44337/api';

const getAllCandies = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/candy`)
    .then(result => resolve(result.data))
    .catch(err => reject(err));
});

export default {
    getAllCandies
} 