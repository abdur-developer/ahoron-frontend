import { useState } from 'react'
import { FiMessageCircle, FiPhone, FiMail, FiX, FiHelpCircle, FiChevronRight } from 'react-icons/fi'

const CustomerSupport = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('chat')

  const supportOptions = [
    {
      id: 'chat',
      title: 'Live Chat',
      icon: FiMessageCircle,
      description: 'Chat with us in real-time',
      action: () => {
        // Trigger Tawk.to chat
        if (window.Tawk_API) {
          window.Tawk_API.maximize();
          setIsOpen(false);
        }
      },
      available: true,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      id: 'phone',
      title: 'Call Us',
      icon: FiPhone,
      description: '+880 1700-000000',
      action: () => {
        window.location.href = 'tel:+8801700000000';
      },
      available: true,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: 'email',
      title: 'Email Us',
      icon: FiMail,
      description: 'support@shopease.com',
      action: () => {
        window.location.href = 'mailto:support@shopease.com';
      },
      available: true,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
  ]

  const faqs = [
    {
      question: 'How to place an order?',
      answer: 'Browse products, add to cart, fill in delivery details, and confirm your order.'
    },
    {
      question: 'What is the delivery time?',
      answer: 'Inside Dhaka: 24-48 hours. Outside Dhaka: 3-5 business days.'
    },
    {
      question: 'How can I return a product?',
      answer: 'Contact our support within 7 days of delivery for return instructions.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept Cash on Delivery, bKash, Nagad, and credit/debit cards.'
    },
  ]

  return (
    <>
      {/* Floating Support Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl active:scale-95 ${
          isOpen 
            ? 'bg-red-500 rotate-90' 
            : 'bg-green-500 animate-bounce'
        }`}
        aria-label="Customer Support"
      >
        {isOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <FiMessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Support Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className="fixed bottom-24 right-4 z-50 w-[350px] max-w-[calc(100vw-32px)] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">Customer Support</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/90 text-sm">
                We're here to help! Choose your preferred contact method.
              </p>
            </div>

            {/* Support Options */}
            <div className="p-4 space-y-3">
              {supportOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.id}
                    onClick={option.action}
                    className="w-full flex items-center space-x-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all group"
                  >
                    <div className={`w-12 h-12 ${option.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${option.color}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {option.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                    <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                )
              })}
            </div>

            {/* Working Hours */}
            <div className="px-4 py-3 bg-yellow-50 dark:bg-yellow-900/20 mx-4 rounded-xl mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Available: Sat-Thu (9 AM - 9 PM)
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                <FiHelpCircle className="w-5 h-5 mr-2 text-primary-500" />
                Frequently Asked Questions
              </h4>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {faqs.map((faq, index) => (
                  <details
                    key={index}
                    className="group bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 pr-4">
                        {faq.question}
                      </span>
                      <FiChevronRight className="w-4 h-4 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-3 pb-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default CustomerSupport