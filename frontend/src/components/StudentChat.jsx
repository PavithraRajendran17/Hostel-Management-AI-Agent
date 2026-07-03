import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, LogOut, MessageSquare } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockAIService, mockComplaintService, mockLeaveService } from '../services/mockService'

export default function StudentChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your Hostel AI Assistant. How can I help you today? You can report complaints or request leave.'
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
      content: inputMessage
    }

    setMessages([...messages, userMessage])
    const currentInput = inputMessage
    setInputMessage('')
    setIsTyping(true)

    try {
      // Use mock AI service to parse input
      const parsedResult = await mockAIService.parseUserInput(currentInput)
      
      let botResponseContent = ''

      if (parsedResult.intent === 'COMPLAINT') {
        // Create complaint using mock service
        await mockComplaintService.createComplaint({
          studentName: 'Current Student',
          rollNumber: 'CS001',
          details: parsedResult.details,
          category: parsedResult.category,
          priority: parsedResult.priority
        })
        botResponseContent = `I've registered your ${parsedResult.category.toLowerCase()} complaint with ${parsedResult.priority} priority. The warden will review it shortly. Reference ID: ${Date.now()}`
      } else if (parsedResult.intent === 'LEAVE_REQUEST') {
        // Create leave request using mock service
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
        content: botResponseContent
      }
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'Sorry, I encountered an error processing your request. Please try again.'
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

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Hostel AI Assistant</h1>
              <p className="text-sm text-gray-500">Student Chat Interface</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 flex flex-col">
        <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    message.type === 'user'
                      ? 'bg-primary-600'
                      : 'bg-green-500'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-900 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex gap-3">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (e.g., 'I want to report a complaint about the AC' or 'I need leave from tomorrow to next Monday')"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none transition-all"
                rows={2}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter to send, Shift + Enter for new line
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setInputMessage('I want to report a complaint about the electrical issue in my room')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all text-left"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Report Complaint</h3>
            <p className="text-sm text-gray-500">Report maintenance or facility issues</p>
          </button>
          <button
            onClick={() => setInputMessage('I need to request leave from tomorrow for 3 days to visit my family')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all text-left"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Request Leave</h3>
            <p className="text-sm text-gray-500">Submit a leave request for approval</p>
          </button>
          <button
            onClick={() => setInputMessage('What is the status of my previous requests?')}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all text-left"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Check Status</h3>
            <p className="text-sm text-gray-500">View status of your requests</p>
          </button>
        </div>
      </main>
    </div>
  )
}
