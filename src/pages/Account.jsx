import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiPackage, FiLogOut, FiEdit2, FiSave, FiX } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import EmptyState from '../components/EmptyState'
import toast from 'react-hot-toast'

const Account = () => {
  const { user, logout, updateProfile, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [editing, setEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  })

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, loading, navigate])

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        bio: user.bio || '',
      })
    }
  }, [user])

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders()
    }
  }, [activeTab])

  const fetchOrders = async () => {
    setLoadingOrders(true)
    try {
      const response = await api.get('/api/orders')
      setOrders(response.data.orders || [])
    } catch (error) {
      //console.error('Failed to fetch orders:', error)
      toast.error('Failed to load orders')
    } finally {
      setLoadingOrders(false)
    }
  }

  const handleUpdateProfile = async () => {
    const result = await updateProfile(profileData)
    if (result.success) {
      toast.success('Profile updated successfully!')
      setEditing(false)
    } else {
      toast.error(result.error)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
    toast.success('Logged out successfully')
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!isAuthenticated) {
    return null
  }

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: FiUser },
    { id: 'orders', label: 'My Orders', icon: FiPackage },
  ]

  return (
    <div className="animate-in pb-24">
      {/* User Header */}
      <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center space-x-4">
          <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
          alt={user?.name}
          className="w-16 h-16 rounded-full"
        />
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-white/80 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-gray-800 rounded-2xl p-1 mb-6 card-shadow">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Profile Information
            </h3>
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center space-x-1 text-primary-500 text-sm font-medium"
              >
                <FiEdit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleUpdateProfile}
                  className="flex items-center space-x-1 text-green-500 text-sm font-medium"
                >
                  <FiSave className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="text-red-500"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                disabled={!editing}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                className="input-field bg-gray-100 dark:bg-gray-900"
                disabled
                readOnly
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Phone
              </label>
              <input
                type="tel"
                value={profileData.phone}
                className="input-field bg-gray-100 dark:bg-gray-900"
                disabled
                readOnly
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Address
              </label>
              <textarea
                value={profileData.address}
                onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                className="input-field"
                rows="3"
                disabled={!editing}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Bio
              </label>
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                className="input-field"
                rows="3"
                disabled={!editing}
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 flex items-center justify-center space-x-2 px-6 py-3 bg-red-50 dark:bg-red-900/30 text-red-500 rounded-xl font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          {loadingOrders ? (
            <LoadingSpinner />
          ) : orders.length === 0 ? (
            <EmptyState
              type="orders"
              action={{
                label: 'Start Shopping',
                onClick: () => navigate('/products'),
              }}
            />
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Transaction ID
                      </p>
                      <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                        #{order.transaction_id}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'confirmed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Name:</span>
                      <span className="font-medium">{order.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                      <span className="font-medium">{order.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Address:</span>
                      <span className="font-medium text-right max-w-[200px] truncate">
                        {order.address}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-gray-500 dark:text-gray-400">Amount:</span>
                      <span className="font-bold text-primary-500">৳{order.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Date:</span>
                      <span className="font-medium">
                        {new Date(order.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Account