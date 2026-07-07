import React from 'react'
import { FiAlertCircle, FiRefreshCw } from 'react-icons/fi'

const ErrorState = ({ message = 'Something went wrong', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-in">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
        <FiAlertCircle className="w-12 h-12 text-red-500" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Oops!
      </h3>
      
      <p className="text-gray-500 dark:text-gray-400 text-center mb-6 max-w-sm">
        {message}
      </p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 btn-primary"
        >
          <FiRefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  )
}

export default ErrorState