import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check authentication on mount and when token changes
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      // Set default header immediately
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      verifyToken()
    } else {
      setUser(null)
      setIsAuthenticated(false)
      setLoading(false)
    }
  }, [])

  const verifyToken = async () => {
    try {
      // Call verify endpoint to check if token is valid
      const response = await axios.get('/api/verify-token')
      
      if (response.data.success && response.data.authenticated) {
        setUser(response.data.user)
        setIsAuthenticated(true)
        //console.log('Token verified successfully')
      } else {
        // Token invalid
        handleLogout()
      }
    } catch (error) {
      //console.error('Token verification failed:', error)
      
      // If 401, clear everything
      if (error.response?.status === 401) {
        handleLogout()
      } else {
        // Network error - try to restore from localStorage
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          try {
            const parsedUser = JSON.parse(savedUser)
            setUser(parsedUser)
            setIsAuthenticated(true)
            //console.log('Restored user from localStorage')
          } catch (e) {
            handleLogout()
          }
        } else {
          handleLogout()
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password })
      
      if (response.data.success) {
        const { token, user: userData } = response.data
        
        // Save to localStorage (persist across reloads)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        setUser(userData)
        setIsAuthenticated(true)
        
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const logout = () => {
    handleLogout()
    window.location.href = '/'
  }

  const updateProfile = async (data) => {
    try {
      const response = await axios.put('/api/user/profile', data)
      if (response.data.success) {
        setUser(response.data.user)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return { success: true }
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Update failed' 
      }
    }
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}