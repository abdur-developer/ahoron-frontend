import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiSearch, FiX, FiSliders } from 'react-icons/fi'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import SkeletonCard from '../components/SkeletonCard'
import EmptyState from '../components/EmptyState'
import ErrorState from '../components/ErrorState'
import { useDebounce } from '../hooks/useDebounce'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [showFilters, setShowFilters] = useState(false)
  
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    setPage(1)
    fetchProducts(1, true)
  }, [debouncedSearch, selectedCategory, sortBy])

  useEffect(() => {
    // Update URL params
    const params = {}
    if (debouncedSearch) params.search = debouncedSearch
    if (selectedCategory) params.category = selectedCategory
    if (sortBy !== 'newest') params.sort = sortBy
    setSearchParams(params)
  }, [debouncedSearch, selectedCategory, sortBy])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories')
      setCategories(response.data.categories || [])
    } catch (error) {
      //console.error('Failed to fetch categories:', error)
    }
  }

  const fetchProducts = async (pageNum, reset = false) => {
    try {
      if (reset) {
        setLoading(true)
        setError(null)
      } else {
        setLoadingMore(true)
      }

      const params = {
        page: pageNum,
        limit: 20,
        search: debouncedSearch,
        category: selectedCategory,
        sort: sortBy,
      }

      const response = await api.get('/api/products', { params })
      
      if (reset) {
        setProducts(response.data.products || [])
      } else {
        setProducts(prev => [...prev, ...(response.data.products || [])])
      }
      
      setHasMore(response.data.hasMore || false)
    } catch (error) {
      setError('Failed to load products. Please try again.')
      //console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      const nextPage = page + 1
      setPage(nextPage)
      fetchProducts(nextPage)
    }
  }

  // Infinite scroll
  const handleScroll = useCallback(() => {
    if (loadingMore || !hasMore) return

    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 200) {
      handleLoadMore()
    }
  }, [loadingMore, hasMore, page])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortBy('newest')
  }

  return (
    <div className="space-y-4 animate-in">
      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-gray-50 dark:bg-gray-900 py-3 space-y-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-4 py-2 rounded-xl shadow-sm"
          >
            <FiSliders className="w-4 h-4" />
            <span>Filters</span>
            {(selectedCategory || sortBy !== 'newest') && (
              <span className="w-2 h-2 bg-primary-500 rounded-full" />
            )}
          </button>

          {(selectedCategory || sortBy !== 'newest' || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-500 font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg space-y-4 animate-slide-down">
            {/* Categories */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Category
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    !selectedCategory
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category._id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Sort By
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'newest', label: 'Newest' },
                  { value: 'oldest', label: 'Oldest' },
                  { value: 'price_high', label: 'Price: High to Low' },
                  { value: 'price_low', label: 'Price: Low to High' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      sortBy === option.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={() => fetchProducts(1, true)} />
      ) : products.length === 0 ? (
        <EmptyState
          type="search"
          message="No products found matching your criteria."
          action={{
            label: 'Clear Filters',
            onClick: clearFilters,
          }}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard key={`${product._id}_${index}`} product={product} />
            ))}
          </div>

          {/* Loading More */}
          {loadingMore && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={`skeleton-${i}`} />
              ))}
            </div>
          )}

          {/* Load More Button (Fallback) */}
          {hasMore && !loadingMore && (
            <div className="text-center mt-6">
              <button
                onClick={handleLoadMore}
                className="btn-secondary"
              >
                Load More Products
              </button>
            </div>
          )}

          {/* End of List */}
          {!hasMore && products.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              You've reached the end of the list 🎉
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Products