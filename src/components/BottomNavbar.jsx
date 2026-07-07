import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiGrid, FiShoppingCart, FiUser } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const BottomNavbar = () => {
  const location = useLocation()
  const { getCartCount } = useCart()

  const navItems = [
    {
      path: '/',
      icon: FiHome,
      label: 'Home',
    },
    {
      path: '/products',
      icon: FiGrid,
      label: 'Products',
    },
    {
      path: '/cart',
      icon: FiShoppingCart,
      label: 'Cart',
      badge: getCartCount(),
    },
    {
      path: '/account',
      icon: FiUser,
      label: 'Account',
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 safe-area-bottom">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center space-y-1 px-3 py-1 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'text-primary-500'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default React.memo(BottomNavbar)