import axios from 'axios'

const apiRequest = axios.create({
    baseURL: 'http://localhost:4444/api',
    withCredentials: true,
})

export default apiRequest