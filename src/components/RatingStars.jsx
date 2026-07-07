import React from 'react'
import { FiStar } from 'react-icons/fi'

const RatingStars = ({ rating = 0, count = 0, size = 'sm', showCount = true }) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  const starSize = sizes[size] || sizes.sm

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FiStar
            key={index}
            className={`${starSize} ${
              index < Math.floor(rating)
                ? 'text-yellow-400 fill-current'
                : index < rating
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
      {showCount && count > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
          ({count})
        </span>
      )}
    </div>
  )
}

export default RatingStars