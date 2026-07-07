import React from 'react'
import { FiTruck, FiShield, FiHeadphones, FiAward, FiUsers, FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const About = () => {
  const features = [
    {
      icon: FiTruck,
      title: 'Fast Delivery',
      description: 'Free delivery inside Dhaka for orders over ৳2000',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: 'Your payment information is always protected',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer service for you',
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: FiAward,
      title: 'Quality Products',
      description: 'We ensure the best quality for our customers',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
  ]

  const stats = [
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Products', value: '10,000+' },
    { label: 'Orders Delivered', value: '100,000+' },
    { label: 'Cities', value: '64' },
  ]

  const team = [
    {
      name: 'Md. Rahman',
      role: 'Founder & CEO',
      image: 'https://picsum.photos/200/200?random=20',
      bio: 'Visionary leader with 15+ years in e-commerce',
    },
    {
      name: 'Fatima Akter',
      role: 'Head of Operations',
      image: 'https://picsum.photos/200/200?random=21',
      bio: 'Ensuring smooth operations and customer satisfaction',
    },
    {
      name: 'Tanvir Ahmed',
      role: 'Tech Lead',
      image: 'https://picsum.photos/200/200?random=22',
      bio: 'Building innovative solutions for modern shopping',
    },
    {
      name: 'Nusrat Jahan',
      role: 'Customer Service Manager',
      image: 'https://picsum.photos/200/200?random=23',
      bio: 'Dedicated to providing exceptional customer experience',
    },
  ]

  return (
    <div className="animate-in pb-24 space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-4">About ProtiSheba</h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Your one-stop destination for premium shopping. We bring you the best
            products at the most affordable prices with exceptional service.
          </p>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Our Story */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Our Story
        </h2>
        <div className="space-y-3 text-gray-600 dark:text-gray-300 leading-relaxed">
          <p>
            Founded in 2020, ProtiSheba started with a simple mission: to make online
            shopping easy, accessible, and enjoyable for everyone in Bangladesh.
          </p>
          <p>
            What began as a small startup with just a handful of products has now
            grown into one of the most trusted e-commerce platforms in the country.
            We've served over 50,000 happy customers and delivered more than 100,000
            orders across 64 districts.
          </p>
          <p>
            Our commitment to quality, affordability, and customer satisfaction
            drives everything we do. We carefully curate our product selection and
            work directly with manufacturers and authorized distributors to ensure
            you get genuine products at the best prices.
          </p>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 card-shadow hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Our Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 card-shadow text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-xs text-primary-500 font-medium mb-2">
                {member.role}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 card-shadow">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Get in Touch
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
              <FiMapPin className="w-5 h-5 text-primary-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Our Location
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                123 Commerce Street, Gulshan, Dhaka-1212
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <FiPhone className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Phone
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                +880 1700-000000
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center">
              <FiMail className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Email
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                support@ProtiSheba.com
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <FiClock className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Working Hours
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Saturday - Thursday: 9:00 AM - 9:00 PM
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Your Name
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your name"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
              Message
            </label>
            <textarea
              className="input-field"
              rows="4"
              placeholder="Write your message..."
            />
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-primary-500 to-purple-600 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-3">Ready to Start Shopping?</h2>
        <p className="text-white/90 mb-6">
          Explore thousands of products at unbeatable prices
        </p>
        <Link
          to="/products"
          className="inline-block px-8 py-3 bg-white text-primary-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          Browse Products
        </Link>
      </section>
    </div>
  )
}

export default About