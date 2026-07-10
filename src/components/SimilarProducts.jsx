import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const SimilarProducts = ({ products }) => {
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  if (!products || products.length === 0) return null

  return (
    <>
        <h3 className="text-lg font-semibold mt-5 mb-2">Similar Products</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
    </> 
  )
}

export default React.memo(SimilarProducts)