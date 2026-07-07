import React, { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product, quantity = 1, color = '', size = '') => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === product.id && item.color === color && item.size === size
      )

      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += quantity
        return updated
      }

      return [...prev, { ...product, quantity, color, size }]
    })
    
    toast.success('Added to cart!', {
      icon: '🛒',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      },
    })
  }

  const removeItem = (productId, color = '', size = '') => {
    setItems(prev => prev.filter(
      item => !(item.id === productId && item.color === color && item.size === size)
    ))
    toast.success('Removed from cart')
  }

  const updateQuantity = (productId, quantity, color = '', size = '') => {
    if (quantity < 1) {
      removeItem(productId, color, size)
      return
    }
    
    setItems(prev => prev.map(item =>
      item.id === productId && item.color === color && item.size === size
        ? { ...item, quantity }
        : item
    ))
  }

  const clearCart = () => {
    setItems([])
    toast.success('Cart cleared')
  }

  const getCartTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const getCartCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}