import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiClock, FiX } from 'react-icons/fi'
import api from '../services/api'
import LazyImage from './LazyImage'

const RecentlyViewed = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    fetchRecentlyViewed()
  }, [])

  const fetchRecentlyViewed = async () => {
    try {
      const viewedIds = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
      
      if (viewedIds.length === 0) {
        setIsVisible(false)
        setLoading(false)
        return
      }

      // Fetch products by IDs
      const response = await api.get('/api/products?recently-viewed', {
        params: { ids: viewedIds.join(',') }
      })
      
      setProducts(response.data.products || [])
    } catch (error) {
      //console.error('Failed to fetch recently viewed:', error)
      setIsVisible(false)
    } finally {
      setLoading(false)
    }
  }

  if (!isVisible || products.length === 0) return null

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FiClock className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            Recently Viewed
          </h3>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>

      <div className="flex space-x-3 overflow-x-auto pb-2">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product._id}`}
            className="flex-shrink-0 w-24 group"
          >
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-2">
              <LazyImage
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <p className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2 group-hover:text-primary-500 transition-colors">
              {product.name}
            </p>
            <p className="text-xs font-bold text-primary-500 mt-1">
              ৳{product.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentlyViewed