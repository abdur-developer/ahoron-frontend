import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiPhone, FiEye, FiEyeOff, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

const SignUp = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid Bangladesh phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors below')
      return
    }

    setLoading(true)
    
    try {
      const response = await api.post('/api/signup', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      })
      
      if (response.data.success) {
        toast.success('Account created successfully! Please login.')
        navigate('/login')
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setLoading(false)
    }
  }

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength++
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const passwordStrength = getPasswordStrength(formData.password)
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const strengthColors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-500']

  return (
    <div className="w-full max-w-md animate-slide-up">
      {/* <button
        onClick={() => navigate('/')}
        className="mb-6 text-white/80 hover:text-white flex items-center space-x-2 transition-colors"
      >
        <FiArrowLeft className="w-5 h-5" />
        <span>Back to Home</span>
      </button> */}

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
        {/* Logo & Header */}
        <div className="text-center mb-5">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <img src="./logo.png" alt="" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          {/* <p className="text-gray-500 dark:text-gray-400 mt-1">
            Join ShopEase for the best shopping experience
          </p> */}
        </div>

        {/* Social Sign Up Buttons */}
        {/* <div className="flex gap-3 mb-6">
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Facebook</span>
          </button>
        </div> */}

        {/* Divider */}
        {/* <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or sign up with email
            </span>
          </div>
        </div> */}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            {/* <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Full Name *
            </label> */}
            <div className="relative">
              <input type="text" value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                  if (errors.name) setErrors(prev => ({ ...prev, name: '' }))
                }}
                className={`input-field pl-10 ${
                  errors.name ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Enter your full name"
              />
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {formData.name && !errors.name && (
                <FiCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              )}
            </div>
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            {/* <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email Address *
            </label> */}
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, email: e.target.value }))
                  if (errors.email) setErrors(prev => ({ ...prev, email: '' }))
                }}
                className={`input-field pl-10 ${
                  errors.email ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="your@email.com"
              />
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {formData.email && !errors.email && (
                <FiCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              )}
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            {/* <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Phone Number *
            </label> */}
            <div className="relative">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, phone: e.target.value }))
                  if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }))
                }}
                className={`input-field pl-10 ${
                  errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="01XXXXXXXXX"
              />
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {formData.phone && !errors.phone && (
                <FiCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              )}
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            {/* <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Password *
            </label> */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, password: e.target.value }))
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
                }}
                className={`input-field pl-10 pr-12 ${
                  errors.password ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Create a password"
              />
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < passwordStrength
                          ? strengthColors[passwordStrength]
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Password strength: {strengthLabels[passwordStrength]}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            {/* <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Confirm Password *
            </label> */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }))
                }}
                className={`input-field pl-10 ${
                  errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''
                }`}
                placeholder="Confirm your password"
              />
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <FiCheck className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 w-5 h-5" />
              )}
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <FiX className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 rounded border-gray-300 dark:border-gray-600 text-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
              I agree to the{' '}
              <a href="#" className="text-primary-500 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary-500 hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-500 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp