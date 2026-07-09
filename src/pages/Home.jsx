import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi'
import api from '../services/api'
import ProductCard from '../components/ProductCard'
import BannerSlider from '../components/BannerSlider'
import CategoryScroll from '../components/CategoryScroll'
import SkeletonCard from '../components/SkeletonCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Home = () => {
  const [banners, setBanners] = useState([])
  const [categories, setCategories] = useState([])
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [specialDeals, setSpecialDeals] = useState([])
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchHomeData()
  }, [])

  const fetchHomeData = async () => {
    try {
      const [bannersRes, categoriesRes, featuredRes, specialRes, productsRes] = await Promise.all([
        api.get('/api/banners'),
        api.get('/api/categories'),
        api.get('/api/products/featured'),
        api.get('/api/products/special'),
        api.get('/api/products?page=1&limit=10'),
      ])

      setBanners(bannersRes.data.banners || [])
      setCategories(categoriesRes.data.categories || [])
      setFeaturedProducts(featuredRes.data.products || [])
      setSpecialDeals(specialRes.data.products || [])
      setAllProducts(productsRes.data.products || [])
      setHasMore(productsRes.data.hasMore || false)
    } catch (error) {
      //console.error('Failed to fetch home data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMoreProducts = async () => {
    try {
      const nextPage = page + 1
      const response = await api.get(`/api/products?page=${nextPage}&limit=10`)
      
      setAllProducts(prev => [...prev, ...response.data.products])
      setPage(nextPage)
      setHasMore(response.data.hasMore)
    } catch (error) {
      //console.error('Failed to load more products:', error)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-12 rounded-xl" />
        <div className="skeleton h-48 rounded-2xl" />
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Search Bar */}
      {/* <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          className="input-field pl-12"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              navigate(`/products?search=${e.target.value}`)
            }
          }}
        />
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div> */}

      {/* Banner Slider */}
      {banners.length > 0 && <BannerSlider banners={banners} />}

      {/* Categories */}
      {categories.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Browse Categories
            </h2>
            <Link
              to="/products"
              className="text-primary-500 text-sm font-medium flex items-center"
            >
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <CategoryScroll categories={categories} />
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Featured Products
            </h2>
            <Link
              to="/products?filter=featured"
              className="text-primary-500 text-sm font-medium flex items-center"
            >
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Special Deals */}
      {specialDeals.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Special Deals 🔥
            </h2>
            <Link
              to="/products?filter=special"
              className="text-primary-500 text-sm font-medium flex items-center"
            >
              View All <FiArrowRight className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {specialDeals.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All Products */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Our Products
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {hasMore && (
          <div className="mt-6 text-center">
            <button
              onClick={loadMoreProducts}
              className="btn-secondary"
            >
              Load More Products
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default Home