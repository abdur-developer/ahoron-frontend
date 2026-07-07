import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const CategoryScroll = ({ categories }) => {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`)
  }

  if (!categories || categories.length === 0) return null

  return (
    <div className="relative group">
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-xl"
        aria-label="Scroll left"
      >
        <FiChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Categories Container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-2 px-1"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="flex flex-col items-center space-y-2 flex-shrink-0 w-20 group/category"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center shadow-lg group-hover/category:shadow-xl transition-all duration-300 group-hover/category:scale-110 group-active/category:scale-95">
              {category.icon ? (
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <span className="text-2xl">
                  {category.name === 'Books' && '📚'}
                  {category.name === 'Electronics' && '⚡'}
                  {category.name === 'Fashion' && '👕'}
                  {category.name === 'Shoes' && '👟'}
                  {category.name === 'Beauty' && '💄'}
                  {category.name === 'Groceries' && '🛒'}
                  {!['Books', 'Electronics', 'Fashion', 'Shoes', 'Beauty', 'Groceries'].includes(category.name) && '📦'}
                </span>
              )}
            </div>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight group-hover/category:text-primary-500 transition-colors">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-xl"
        aria-label="Scroll right"
      >
        <FiChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-200" />
      </button>
    </div>
  )
}

export default React.memo(CategoryScroll)