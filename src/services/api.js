import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://ahoron.store/',
  // baseURL: import.meta.env.VITE_API_URL || 'http://localhost',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`, 
      token ? '(authenticated)' : '(guest)')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.log('401 detected - logging out')
      
      // Clear auth data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
      
      // Only redirect if not already on auth pages
      const authPages = ['/login', '/signup']
      const currentPath = window.location.pathname
      
      if (!authPages.includes(currentPath)) {
        // window.location.href = '/login?expired=true'
      }
    }
    
    return Promise.reject(error)
  }
)

export default api