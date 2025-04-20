import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance

export async function createPIESCheckin(userId, data) {
    return await instance.post(`/users/${userId}/pies_entries`, data)
}

export async function fetchGrowthSummary() {
    const response = await instance.get("/growth_summary");
    return response.data;
}