export const APP_NAME = 'ProtiSheba'
export const APP_DESCRIPTION = 'Premium Mobile Shopping Experience'

export const DELIVERY_CHARGES = {
  INSIDE_DHAKA: 60,
  OUTSIDE_DHAKA: 120,
}

export const DHAKA_DISTRICTS = ['Dhaka', 'Gazipur', 'Narayanganj', 'Savar']

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

export const ORDER_STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30',
  confirmed: 'bg-green-100 text-green-600 dark:bg-green-900/30',
  processing: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30',
  shipped: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30',
  delivered: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30',
  cancelled: 'bg-red-100 text-red-600 dark:bg-red-900/30',
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price_high', label: 'Price: High to Low' },
  { value: 'price_low', label: 'Price: Low to High' },
]

export const BANGLADESH_DISTRICTS = [
  'Dhaka', 'Gazipur', 'Narayanganj', 'Savar',
  'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna',
  'Barisal', 'Rangpur', 'Mymensingh', 'Comilla',
  'Bogra', 'Jessore', 'Dinajpur', 'Tangail',
]