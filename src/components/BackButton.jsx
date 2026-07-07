import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

const BackButton = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(location.pathname !== '/')
  }, [location])

  if (!isVisible) return null

  return (
    <button
      onClick={() => navigate(-1)}
      className="fixed top-4 left-4 z-50 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 active:scale-95"
      aria-label="Go back"
    >
      <FiArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
    </button>
  )
}

export default BackButton