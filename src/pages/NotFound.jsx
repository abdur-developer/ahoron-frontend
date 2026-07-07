import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiArrowLeft, FiFrown } from 'react-icons/fi'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md animate-bounce-in">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold gradient-text opacity-20 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <FiFrown className="w-12 h-12 text-primary-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary flex items-center justify-center space-x-2"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          
          <Link
            to="/"
            className="btn-primary flex items-center justify-center space-x-2"
          >
            <FiHome className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              to="/products"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Cart
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound