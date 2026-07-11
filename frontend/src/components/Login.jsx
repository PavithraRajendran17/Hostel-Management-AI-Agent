import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Building2, ArrowRight, MessageSquare, FileText, Calendar, Bot } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockAuthService } from '../services/mockService'

export default function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const roles = [
    { id: 'student', name: 'Student' },
    { id: 'warden', name: 'Warden' },
    { id: 'admin', name: 'Admin' }
  ]

  const features = [
    { icon: Building2, title: 'Smart Hostel Management', description: 'Efficient hostel operations' },
    { icon: FileText, title: 'Complaint Management', description: 'Track and resolve issues' },
    { icon: Calendar, title: 'Leave Requests', description: 'Quick approval process' },
    { icon: Bot, title: 'AI Assistant', description: '24/7 intelligent support' }
  ]

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!selectedRole || !username || !password) return

    setIsLoading(true)
    setError('')

    try {
      const result = await mockAuthService.login(username, password, selectedRole)
      
      if (result.success) {
        localStorage.setItem('authToken', result.token)
        localStorage.setItem('userRole', result.user.role)
        
        if (selectedRole === 'student') {
          navigate('/student/dashboard')
        } else if (selectedRole === 'warden') {
          navigate('/warden/dashboard')
        } else if (selectedRole === 'admin') {
          navigate('/admin/dashboard')
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
          filter: 'blur(2px)'
        }}
      >
        <div className="absolute inset-0 bg-blue-900/45" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-[430px]">
          {/* Glass Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="bg-white/95 backdrop-blur-xl rounded-[24px] p-8 shadow-2xl"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-royal-500 to-royal-600 rounded-full mb-4 shadow-lg"
              >
                <Building2 className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Hostel Management AI Agent</h1>
              <p className="text-sm text-gray-500">Smart • Secure • Simple</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#1E293B] placeholder-gray-400 focus:ring-2 focus:ring-royal-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#1E293B] placeholder-gray-400 focus:ring-2 focus:ring-royal-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1E293B] mb-2">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-[#1E293B] focus:ring-2 focus:ring-royal-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="">Select your role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading || !username || !password || !selectedRole}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-royal-500 to-royal-600 text-white rounded-xl font-semibold hover:from-royal-600 hover:to-royal-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/90 backdrop-blur-sm border-2 border-royal-200 rounded-xl p-4 text-center"
              >
                <feature.icon className="w-6 h-6 text-royal-600 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-[#1E293B] mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
