import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useDebounce } from '../hooks/useDebounce'

const TopNavbar = () => {
  const { user, isAuthenticated } = useAuth()
  const { darkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearch = useDebounce(searchQuery, 500)

  const handleSearch = (e) => {
    e.preventDefault()
    if (debouncedSearch.trim()) {
      navigate(`/products?search=${debouncedSearch}`)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <img src="https://i.ibb.co.com/GvMLt6gS/logo.jpg" alt="" />
            </div>
            <span className="font-bold text-xl gradient-text hidden sm:block">
              ProtiSheba
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-primary-500 transition-colors">
              About
            </Link>
          </div>

          {/* Search Bar */}
          {/* <form onSubmit={handleSearch} className="flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </form> */}

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-500" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {isAuthenticated ? (
              <Link
                to="/account"
                className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FiUser className="w-5 h-5 text-white" />
              </Link>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-4">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default React.memo(TopNavbar)