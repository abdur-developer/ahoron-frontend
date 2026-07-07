import React from 'react'
import { FiBox, FiShoppingCart, FiHeart, FiSearch } from 'react-icons/fi'

const EmptyState = ({ type = 'default', title, message, action }) => {
  const configs = {
    cart: {
      icon: FiShoppingCart,
      defaultTitle: 'Your cart is empty',
      defaultMessage: 'Looks like you haven\'t added any items to your cart yet.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    wishlist: {
      icon: FiHeart,
      defaultTitle: 'No wishlist items',
      defaultMessage: 'Save your favorite items for later.',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/30',
    },
    search: {
      icon: FiSearch,
      defaultTitle: 'No results found',
      defaultMessage: 'Try adjusting your search or filters.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    orders: {
      icon: FiBox,
      defaultTitle: 'No orders yet',
      defaultMessage: 'Your order history will appear here.',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    default: {
      icon: FiBox,
      defaultTitle: 'Nothing here',
      defaultMessage: 'There\'s nothing to display at the moment.',
      color: 'text-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-800',
    },
  }

  const config = configs[type] || configs.default
  const Icon = config.icon

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-in">
      <div className={`w-24 h-24 ${config.bgColor} rounded-full flex items-center justify-center mb-6`}>
        <Icon className={`w-12 h-12 ${config.color}`} />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title || config.defaultTitle}
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
        {message || config.defaultMessage}
      </p>
      
      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}

export default EmptyState