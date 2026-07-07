import React from 'react'

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-3 card-shadow animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-3" />
      <div className="flex items-center justify-between">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-8" />
      </div>
    </div>
  )
}

export default React.memo(SkeletonCard)