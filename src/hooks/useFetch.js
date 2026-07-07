import { useState, useEffect } from 'react'
import api from '../services/api'

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { immediate = true } = options

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(url)
      setData(response.data)
      return response.data
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [url])

  return { data, loading, error, refetch: fetchData }
}