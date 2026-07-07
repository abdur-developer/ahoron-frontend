import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import EmptyState from '../components/EmptyState'
import LazyImage from '../components/LazyImage'
import api from '../services/api'
import toast from 'react-hot-toast'

const Cart = () => {
  const { items, removeItem, updateQuantity, clearCart, getCartTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    district: '',
    notes: '',
  })
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const subtotal = getCartTotal()
  const total = subtotal + deliveryCharge

  const handleDistrictChange = (district) => {
    setFormData(prev => ({ ...prev, district }))
    
    // Inside Dhaka: 60, Outside: 120
    const dhakaDistricts = ['Dhaka', 'Gazipur', 'Narayanganj', 'Savar']
    if (dhakaDistricts.includes(district)) {
      setDeliveryCharge(60)
    } else {
      setDeliveryCharge(120)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.phone || !formData.address || !formData.district) {
      toast.error('Please fill in all required fields')
      return
    }

    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setSubmitting(true)
    
    try {
      const orderData = {
        ...formData,
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
          size: item.size,
        })),
        subtotal,
        delivery_charge: deliveryCharge,
        total,
        user_id: user?.id || null,
      }

      const response = await api.post('/backend/api/orders.php', orderData)
      
      if (response.data.success) {
        toast.success('Order placed successfully!')
        clearCart()
        navigate('/account')
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order')
    } finally {
      setSubmitting(false)
    }
  }

  if (items.length === 0) {
    return (
      <EmptyState
        type="cart"
        action={{
          label: 'Continue Shopping',
          onClick: () => navigate('/products'),
        }}
      />
    )
  }

  return (
    <div className="animate-in pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${item.color}-${item.size}`}
            className="bg-white dark:bg-gray-800 rounded-2xl p-3 flex space-x-3 card-shadow"
          >
            <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
              <LazyImage
                src={`https://ahoron.store/admin/upload/${item.img}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {item.name}
              </h3>
              
              {(item.color || item.size) && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.color && `Color: ${item.color}`}
                  {item.color && item.size && ' | '}
                  {item.size && `Size: ${item.size}`}
                </p>
              )}

              <div className="flex items-center justify-between mt-2">
                <span className="text-primary-500 font-bold">
                  ৳{item.price}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.color, item.size)}
                    className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                  >
                    <FiMinus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                    className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
                  >
                    <FiPlus className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id, item.color, item.size)}
                    className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 ml-2"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Delivery Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Mobile Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Full Address *
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="input-field"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              District *
            </label>
            <select
              value={formData.district}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="input-field"
              required
            >
              <option value="">Select District</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Gazipur">Gazipur</option>
              <option value="Narayanganj">Narayanganj</option>
              <option value="Savar">Savar</option>
              <option value="Chittagong">Chittagong</option>
              <option value="Sylhet">Sylhet</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Khulna">Khulna</option>
              <option value="Barisal">Barisal</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Order Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="input-field"
              rows="2"
              placeholder="Any special instructions..."
            />
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span className="font-medium">৳{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Delivery Charge</span>
              <span className="font-medium">
                {deliveryCharge === 0 ? 'Select district' : `৳${deliveryCharge}`}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
              <span>Total</span>
              <span className="text-primary-500">৳{total}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || deliveryCharge === 0}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <FiShoppingBag className="w-5 h-5" />
                <span>Place Order</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Cart