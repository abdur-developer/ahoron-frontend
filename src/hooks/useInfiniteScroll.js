import { useState, useEffect, useCallback } from 'react'

export const useInfiniteScroll = (callback, options = {}) => {
  const [isFetching, setIsFetching] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return

    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      setIsFetching(true)
    }
  }, [isFetching, hasMore])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (!isFetching) return

    callback().finally(() => {
      setIsFetching(false)
    })
  }, [isFetching, callback])

  return { isFetching, hasMore, setHasMore }
}