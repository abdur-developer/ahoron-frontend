import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import LazyImage from './LazyImage'

const ProductCard = ({ product }) => {
  const { addItem, items } = useCart()
  const [isAdded, setIsAdded] = useState(false)
  const navigate = useNavigate()

  // Check if product already in cart
  useEffect(() => {
    const isInCart = items.some(item => item.id === product.id)
    setIsAdded(isInCart)
  }, [items, product.id])

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    addItem(product, 1)
    setIsAdded(true)
  }

  const handleGoToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/cart')
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden card-shadow card-hover group animate-in"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
        <LazyImage
          src={`${product.img}`}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount Badge */}
        {/* {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            -{discountPercentage}%
          </div>
        )} */}

        {/* Wishlist Button */}
        {/* <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${isWishlisted
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          aria-label="Add to wishlist"
        >
          <FiHeart
            className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
          />
        </button> */}

        {/* Quick Add to Cart / Go to Cart */}
        <button
          onClick={isAdded ? handleGoToCart : handleAddToCart}
          className={`absolute bottom-2 right-2 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform ${isAdded
              ? 'bg-green-500 hover:bg-green-600 px-4 py-2 gap-2'
              : 'bg-primary-500 hover:bg-primary-600 w-10 h-10'
            }`}
          aria-label={isAdded ? "Go to cart" : "Add to cart"}
        >
          {isAdded ? (
            <>
              <FiShoppingCart className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-medium whitespace-nowrap">Go to Cart</span>
            </>
          ) : (
            <FiShoppingCart className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Category */}
        {product.category_name && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            {product.category_name}
          </p>
        )}

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-primary-500 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        {product.rating_count > 0 && (
          <div className="flex items-center space-x-1 mb-2">
            <FiStar className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.rating_count}
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-lg font-bold text-primary-500">
              ৳{product.price}
            </span>
            {product.old_price > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ৳{product.old_price}
              </span>
            )}
          </div>

          {product.d_discount > 0 && (
            <span className="text-xs text-green-500 font-medium">
              {product.d_discount}% off
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)