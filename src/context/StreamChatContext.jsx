import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { StreamChat } from 'stream-chat'
import { useAuth } from './AuthContext'
import api from '../services/api'
import toast from 'react-hot-toast'

const StreamChatContext = createContext()

export const useStreamChat = () => {
  const context = useContext(StreamChatContext)
  if (!context) {
    throw new Error('useStreamChat must be used within StreamChatProvider')
  }
  return context
}

export const StreamChatProvider = ({ children }) => {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const [chatClient, setChatClient] = useState(null)
  const [isChatReady, setIsChatReady] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [chatError, setChatError] = useState(null)
  const clientRef = useRef(null)

  useEffect(() => {
    // Wait for auth to complete
    if (authLoading) return

    if (isAuthenticated && user) {
      //console.log('User authenticated, initializing chat...', user)
      initializeChat()
    } else {
      //console.log('User not authenticated, disconnecting chat...')
      disconnectChat()
    }

    return () => {
      disconnectChat()
    }
  }, [isAuthenticated, user, authLoading])

  const initializeChat = async () => {
    try {
      setChatError(null)
      
      // Get Stream token from backend
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No auth token found')
      }

      const response = await api.post('/api/stream-token')
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to get chat token')
      }

      const { user, streamToken, api_key } = response.data

      // Create Stream client
      const client = new StreamChat(api_key)
      
      // Connect user to Stream
      await client.connectUser(
        {
          id: user.id,
          name: user.name || 'User',
          email: user.email || '',
          phone: user.phone || '',
          role: 'user',
        },
        streamToken
      )

      // Set up event listeners
      client.on('message.new', (event) => {
        //console.log('New message received:', event)
        if (event.user?.id !== user_id) {
          setUnreadCount(prev => prev + 1)
        }
      })

      client.on('connection.changed', (event) => {
        //console.log('Connection status:', event.online ? 'online' : 'offline')
      })

      client.on('error', (error) => {
        //console.error('Stream chat error:', error)
        setChatError(error.message)
      })

      clientRef.current = client
      setChatClient(client)
      setIsChatReady(true)
      //console.log('Chat initialized successfully')

    } catch (error) {
      //console.error('Failed to initialize chat:', error)
      setChatError(error.message || 'Failed to connect chat')
      setIsChatReady(false)
      
      // Don't show toast for auth errors (will be handled by auth context)
      if (error.response?.status !== 401) {
        toast.error('Chat connection failed')
      }
    }
  }

  const disconnectChat = () => {
    if (clientRef.current) {
      try {
        clientRef.current.disconnectUser()
        //console.log('Chat disconnected')
      } catch (error) {
        //console.error('Error disconnecting chat:', error)
      }
      clientRef.current = null
    }
    setChatClient(null)
    setIsChatReady(false)
    setUnreadCount(0)
  }

  const resetUnreadCount = () => {
    setUnreadCount(0)
  }

  const value = {
    chatClient,
    isChatReady,
    unreadCount,
    chatError,
    resetUnreadCount,
  }

  return (
    <StreamChatContext.Provider value={value}>
      {children}
    </StreamChatContext.Provider>
  )
}