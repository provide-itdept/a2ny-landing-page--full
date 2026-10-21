import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api', headers: { 'Content-Type': 'application/json' } })
export const submitInquiry = (payload) => api.post('/contact', payload)
export const submitQuotation = (payload) => api.post('/quotations', payload)
export default api
