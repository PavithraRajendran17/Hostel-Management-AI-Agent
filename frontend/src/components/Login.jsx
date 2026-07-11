import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Shield, GraduationCap, Lock, ArrowRight, MessageSquare, FileText, Calendar, CheckCircle } from 'lucide-react'
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
    { icon: MessageSquare, title: 'AI Assistant', description: 'Smart chatbot for instant help' },
    { icon: FileText, title: 'Complaint Management', description: 'Easy complaint tracking' },
    { icon: Calendar, title: 'Leave Management', description: 'Quick leave requests' },
    { icon: CheckCircle, title: 'Secure Login', description: 'Safe authentication' }
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
          backgroundImage: 'url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-indigo-900/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Glass Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-3xl p-8 shadow-2xl"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-4 shadow-xl"
              >
                <User className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">Hostel Management AI Agent</h1>
              <p className="text-gray-300">Smart Hostel Management System</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-5 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-5 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-5 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  required
                >
                  <option value="" className="text-gray-900">Select your role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id} className="text-gray-900">
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-red-500/20 backdrop-blur border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading || !username || !password || !selectedRole}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
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

            {/* Demo Credentials */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
              <div className="inline-flex flex-wrap gap-3 justify-center text-xs text-gray-300 bg-white/5 backdrop-blur px-4 py-2 rounded-xl border border-white/10">
                <span><strong>Student:</strong> student / password</span>
                <span><strong>Warden:</strong> warden / password</span>
                <span><strong>Admin:</strong> admin / password</span>
              </div>
            </div>
          </motion.div>

          {/* Feature Icons */}
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
                className="glass-dark rounded-xl p-4 text-center"
              >
                <feature.icon className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <h3 className="text-sm font-medium text-white mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
