import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiShare2, FiStar, FiMinus, FiPlus, FiTruck } from 'react-icons/fi'
import api from '../services/api'
import { useCart } from '../context/CartContext'
import LazyImage from '../components/LazyImage'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { addItem, items } = useCart()
  const [isInCart, setIsInCart] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    const inCart = items.some(item => item.id === product?.id)
    setIsInCart(inCart)
  }, [items, product?.id])

  const handleAddToCart = () => {
    if (!selectedColor && product.colors) {
      toast.error('Please select a color')
      return
    }
    if (!selectedSize && product.sizes) {
      toast.error('Please select a size')
      return
    }
    addItem(product, quantity, selectedColor, selectedSize)
    setIsInCart(true)
  }

  const handleGoToCart = () => {
    navigate('/cart')
  }

  useEffect(() => {
    fetchProduct()
    // Add to recently viewed
    addToRecentlyViewed(id)
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(`/backend/api/products.php?id=${id}`)
      setProduct(response.data.products[0] || null)

      // Set default selections
      //   if (response.data.product?.colors) {
      //     const colors = response.data.product.colors.split(',')
      //     if (colors.length > 0) setSelectedColor(colors[0].trim())
      //   }
      //   if (response.data.product.sizes) {
      //     const sizes = response.data.product.sizes.split(',')
      //     if (sizes.length > 0) setSelectedSize(sizes[0].trim())
      //   }
    } catch (error) {
      setError('Failed to load product details')
      console.error('Failed to fetch product:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToRecentlyViewed = (productId) => {
    const viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
    const updated = [productId, ...viewed.filter(id => id !== productId)].slice(0, 10)
    localStorage.setItem('recentlyViewed', JSON.stringify(updated))
  }


  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description?.replace(/<[^>]*>/g, '').substring(0, 100),
          url: url,
        })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      }
    } catch (error) {
      console.error('Share failed:', error)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (error || !product) {
    return <ErrorState message={error} onRetry={fetchProduct} />
  }

  const images = [product.img, product.img_2, product.img_3].filter(Boolean)
  const colors = product.colors ? product.colors.split(',').map(c => c.trim()) : []
  const sizes = product.sizes ? product.sizes.split(',').map(s => s.trim()) : []
  const discountPercentage = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0

  return (
    <div className="animate-in pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <LazyImage
              src={`https://ahoron.store/admin/upload/${images[selectedImage]}`}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-2 mt-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                    ? 'border-primary-500 shadow-lg'
                    : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img
                    src={`https://ahoron.store/admin/upload/${img}`}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-6 space-y-4">
          {/* Category & Name */}
          {product.category_name && (
            <p className="text-sm text-primary-500 font-medium">
              {product.category_name}
            </p>
          )}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating_count > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating_count)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                      }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.rating_count} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-bold text-primary-500">
              ৳{product.price}
            </span>
            {product.old_price > 0 && (
              <>
                <span className="text-lg text-gray-400 line-through">
                  ৳{product.old_price}
                </span>
                <span className="text-sm font-medium text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-1 rounded-lg">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Delivery Discount */}
          {product.delivery_discount > 0 && (
            <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-xl">
              <FiTruck className="w-5 h-5" />
              <span className="text-sm font-medium">
                {product.delivery_discount}% delivery discount available
              </span>
            </div>
          )}

          {/* Colors */}
          {colors.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Color: <span className="text-primary-500">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedColor === color
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {sizes.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Size: <span className="text-primary-500">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedSize === size
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Quantity
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FiMinus className="w-5 h-5" />
              </button>
              <span className="text-lg font-bold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <div
                className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}

          {/* Review Section */}
          {product.review && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Customer Review
              </h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Abdur Rahman
                </p>
                <span className="text-xs text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-full">
                  ✓ Verified Buyer
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {product.review}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 p-4 safe-area-bottom">
        <div className="max-w-7xl mx-auto flex items-center space-x-3">
          {/* Wishlist Button - same */}
          {/* <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
          >
            <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button> */}

          {/* Share Button - same */}
          <button
            onClick={handleShare}
            className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            <FiShare2 className="w-5 h-5" />
          </button>

          {/* Add to Cart / Go to Cart Button - change this */}
          <button
            onClick={isInCart ? handleGoToCart : handleAddToCart}
            className={`flex-1 btn-primary flex items-center justify-center space-x-2 text-lg transition-all duration-300 ${isInCart ? 'bg-green-500 hover:bg-green-600' : ''
              }`}
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>{isInCart ? 'Go to Cart' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail