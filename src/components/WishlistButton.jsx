import React, { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi'
import toast from 'react-hot-toast'

const WishlistButton = ({ productId, className = '' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    checkWishlistStatus()
  }, [productId])

  const checkWishlistStatus = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setIsWishlisted(wishlist.includes(productId))
  }

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    
    if (isWishlisted) {
      const updated = wishlist.filter(id => id !== productId)
      localStorage.setItem('wishlist', JSON.stringify(updated))
      setIsWishlisted(false)
      toast.success('Removed from wishlist')
    } else {
      wishlist.push(productId)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      setIsWishlisted(true)
      toast.success('Added to wishlist', {
        icon: '❤️',
      })
    }
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
        isWishlisted
          ? 'bg-red-500 text-white shadow-lg scale-110'
          : 'bg-white/80 text-gray-600 hover:bg-white'
      } ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <FiHeart
        className={`w-5 h-5 transition-all ${
          isWishlisted ? 'fill-current scale-110' : ''
        }`}
      />
    </button>
  )
}

export default WishlistButton