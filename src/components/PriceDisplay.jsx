import React from 'react'

const PriceDisplay = ({ price, oldPrice, discount, size = 'md' }) => {
  const sizes = {
    sm: {
      current: 'text-base',
      old: 'text-xs',
      discount: 'text-xs',
    },
    md: {
      current: 'text-lg',
      old: 'text-sm',
      discount: 'text-xs',
    },
    lg: {
      current: 'text-2xl',
      old: 'text-base',
      discount: 'text-sm',
    },
    xl: {
      current: 'text-3xl',
      old: 'text-lg',
      discount: 'text-sm',
    },
  }

  const sizeStyles = sizes[size] || sizes.md

  const discountPercentage = oldPrice && price
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : discount || 0

  return (
    <div className="flex items-baseline flex-wrap gap-2">
      <span className={`${sizeStyles.current} font-bold text-primary-500`}>
        ৳{price}
      </span>
      
      {oldPrice > 0 && (
        <span className={`${sizeStyles.old} text-gray-400 line-through`}>
          ৳{oldPrice}
        </span>
      )}
      
      {discountPercentage > 0 && (
        <span className={`${sizeStyles.discount} font-medium text-red-500 bg-red-50 dark:bg-red-900/30 px-2 py-0.5 rounded-lg`}>
          -{discountPercentage}%
        </span>
      )}
    </div>
  )
}

export default PriceDisplay