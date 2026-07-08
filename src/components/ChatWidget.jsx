import { useState, useEffect, useRef } from 'react'
import { FiMessageCircle, FiX, FiSend, FiLock } from 'react-icons/fi'
import { useStreamChat } from '../context/StreamChatContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ChatWidget = () => {
  const { chatClient, isChatReady, unreadCount, resetUnreadCount } = useStreamChat()
  const { isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [channel, setChannel] = useState(null)
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && isChatReady && chatClient) {
      initChannel()
    }
  }, [isOpen, isChatReady, chatClient])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const initChannel = async () => {
    if (!chatClient?.user?.id) {
      //console.error('No user ID available')
      return
    }

    try {
      setLoading(true)
      
      const newChannel = chatClient.channel('messaging', `support-${chatClient.user.id}`, {
        name: 'Customer Support',
        members: [chatClient.user.id, 'admin'],
        created_by_id: chatClient.user.id,
      })

      await newChannel.watch()

      const response = await newChannel.query({ messages: { limit: 30 } })
      setMessages(response.messages)
      // setMessages(response.messages.reverse())
      setChannel(newChannel)

      newChannel.on('message.new', (event) => {
        setMessages(prev => [...prev, event.message])
      })

      setLoading(false)
      resetUnreadCount()

    } catch (error) {
      //console.error('Failed to init channel:', error)
      setLoading(false)
      toast.error('Failed to load chat')
    }
  }

  const handleOpenChat = () => {
    // Check if user is logged in
    if (!isAuthenticated) {
      toast.error('Please login to use chat support', {
        icon: '🔒',
        duration: 3000,
      })
      navigate('/login')
      return
    }

    // Check if chat is ready
    if (!isChatReady) {
      toast.error('Chat is connecting... Please wait')
      return
    }

    setIsOpen(true)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    
    if (!newMessage.trim() || !channel) return

    try {
      await channel.sendMessage({
        text: newMessage.trim(),
        user_id: chatClient.user.id,
      })

      setNewMessage('')
      inputRef.current?.focus()
    } catch (error) {
      //console.error('Failed to send message:', error)
      toast.error('Failed to send message')
    }
  }

  // Show nothing while auth is loading
  if (authLoading) return null

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => isOpen ? setIsOpen(false) : handleOpenChat()}
        className={`fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen
            ? 'bg-red-500 rotate-90'
            : isAuthenticated
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 animate-bounce'
            : 'bg-gray-400'
        }`}
        aria-label={isAuthenticated ? "Chat Support" : "Login to chat"}
        title={isAuthenticated ? "Chat with support" : "Please login first"}
      >
        {isOpen ? (
          <FiX className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            {isAuthenticated ? (
              <FiMessageCircle className="w-6 h-6 text-white" />
            ) : (
              <FiLock className="w-6 h-6 text-white" />
            )}
            {isAuthenticated && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[500px] max-h-[calc(100vh-200px)] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white flex items-center justify-between">
            <div>
              <h3 className="font-bold">Customer Support</h3>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-white/80">Online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-900">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Loading messages...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiMessageCircle className="w-8 h-8 text-blue-500" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Start a conversation with our support team
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    We typically reply within minutes
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg) => {
                const isMine = msg.user?.id === chatClient?.user?.id
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        isMine
                          ? 'bg-blue-500 text-white rounded-br-md'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md shadow-sm'
                      }`}
                    >
                      {!isMine && (
                        <p className="text-xs font-medium text-blue-500 mb-1">
                          Support Team
                        </p>
                      )}
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {msg.text}
                      </p>
                      <p className="text-xs mt-1 opacity-70">
                        {new Date(msg.created_at).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl border-none focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                disabled={!isChatReady}
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || !isChatReady}
                className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget