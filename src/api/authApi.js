import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyCSXs35gbC93BFOZTAwzG4y3Inkcl-ZwiY'
    }
})

export default authApi
