import React, { useState } from 'react'
import { FiShare2, FiCheck, FiCopy, FiFacebook, FiTwitter, FiLink } from 'react-icons/fi'
import toast from 'react-hot-toast'

const ShareButton = ({ title, text, url }) => {
  const [showOptions, setShowOptions] = useState(false)

  const shareUrl = url || window.location.href
  const shareTitle = title || document.title
  const shareText = text || ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied to clipboard!')
      setShowOptions(false)
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleShare = async (platform) => {
    let shareLink = ''

    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
        break
      case 'whatsapp':
        shareLink = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`
        break
      default:
        if (navigator.share) {
          try {
            await navigator.share({
              title: shareTitle,
              text: shareText,
              url: shareUrl,
            })
            setShowOptions(false)
            return
          } catch (error) {
            //console.error('Share failed:', error)
          }
        }
        return
    }

    window.open(shareLink, '_blank', 'width=600,height=400')
    setShowOptions(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        aria-label="Share"
      >
        <FiShare2 className="w-5 h-5" />
      </button>

      {showOptions && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOptions(false)}
          />
          
          {/* Share Options */}
          <div className="absolute bottom-full right-0 mb-2 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-2 min-w-[200px] animate-slide-up">
            <div className="space-y-1">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <FiCopy className="w-4 h-4 text-blue-500" />
                <span>Copy Link</span>
              </button>

              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <FiFacebook className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </button>

              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <FiTwitter className="w-4 h-4 text-sky-500" />
                <span>Twitter</span>
              </button>

              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                <FiLink className="w-4 h-4 text-green-500" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButton