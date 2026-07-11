import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, ArrowLeft, MoreVertical, Phone, Video, Smile, Paperclip } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { mockAIService, mockComplaintService, mockLeaveService } from '../services/mockService'

export default function StudentChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your Hostel AI Assistant. How can I help you today? You can report complaints or request leave.',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const navigate = useNavigate()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    const currentInput = inputMessage
    setInputMessage('')
    setIsTyping(true)

    try {
      const parsedResult = await mockAIService.parseUserInput(currentInput)
      
      let botResponseContent = ''

      if (parsedResult.intent === 'COMPLAINT') {
        await mockComplaintService.createComplaint({
          studentName: 'Current Student',
          rollNumber: 'CS001',
          details: parsedResult.details,
          category: parsedResult.category,
          priority: parsedResult.priority
        })
        botResponseContent = `I've registered your ${parsedResult.category.toLowerCase()} complaint with ${parsedResult.priority} priority. The warden will review it shortly. Reference ID: ${Date.now()}`
      } else if (parsedResult.intent === 'LEAVE_REQUEST') {
        await mockLeaveService.createLeaveRequest({
          studentName: 'Current Student',
          rollNumber: 'CS001',
          reason: parsedResult.reason,
          startDate: parsedResult.start_date,
          endDate: parsedResult.end_date
        })
        botResponseContent = `Your leave request from ${parsedResult.start_date} to ${parsedResult.end_date} has been submitted and is pending approval. Reference ID: ${Date.now()}`
      } else if (parsedResult.intent === 'QUERY') {
        botResponseContent = 'You have 1 pending complaint and 1 pending leave request. Would you like me to show you the details?'
      } else {
        botResponseContent = 'I\'m not sure I understood that correctly. You can report complaints (e.g., "The AC is not working") or request leave (e.g., "I need leave from tomorrow to next Monday").'
      }

      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: botResponseContent,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* WhatsApp-style Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 shadow-lg">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/student/dashboard')}
            className="text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-white font-semibold">Hostel AI Assistant</h1>
              <p className="text-indigo-200 text-xs">Online • Smart Chatbot</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <Video className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-white/80 hover:text-white transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden flex flex-col bg-[#e5ddd5]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 relative z-10">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                <div
                  className={`px-4 py-2 shadow-sm ${
                    message.type === 'user'
                      ? 'bg-[#dcf8c6] rounded-2xl rounded-tr-sm'
                      : 'bg-white rounded-2xl rounded-tl-sm'
                  }`}
                >
                  <p className="text-sm text-gray-800 leading-relaxed">{message.content}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Smile className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Paperclip className="w-6 h-6" />
            </motion.button>
            
            <div className="flex-1">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-white rounded-full outline-none text-sm shadow-sm"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-white shadow-lg hover:shadow-xl transition-all disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  )
}
