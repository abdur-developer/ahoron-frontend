export const formatPrice = (price) => {
  return `৳${parseFloat(price).toLocaleString('en-BD')}`
}

export const calculateDiscount = (price, oldPrice) => {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export const getImageUrl = (path) => {
  if (!path) return '/placeholder.png'
  if (path.startsWith('http')) return path
  return `${import.meta.env.VITE_API_URL || ''}/${path}`
}

export const generateTransactionId = () => {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 8)
  return `TXN-${timestamp}-${random}`.toUpperCase()
}

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export const validatePhone = (phone) => {
  const re = /^01[3-9]\d{8}$/
  return re.test(phone)
}

export const getDeliveryCharge = (district) => {
  const dhakaDistricts = ['Dhaka', 'Gazipur', 'Narayanganj', 'Savar']
  return dhakaDistricts.includes(district) ? 60 : 120
}

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('en-US', options)
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}