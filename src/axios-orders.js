import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://react-my-burger-9f4e9.firebaseio.com/'
})

export default instance;