import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Shield, GraduationCap, Lock, ArrowRight } from 'lucide-react'
import { mockAuthService } from '../services/mockService'

export default function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: GraduationCap,
      description: 'Access chat assistant to report complaints and request leave',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'warden',
      name: 'Warden',
      icon: Shield,
      description: 'Manage complaints and approve leave requests',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'admin',
      name: 'Admin',
      icon: Lock,
      description: 'Full system access and configuration',
      color: 'from-gray-600 to-gray-700'
    }
  ]

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setError('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!selectedRole || !username || !password) return

    setIsLoading(true)
    setError('')

    try {
      const result = await mockAuthService.login(username, password, selectedRole)
      
      if (result.success) {
        // Store token in localStorage (in real app, use proper auth handling)
        localStorage.setItem('authToken', result.token)
        localStorage.setItem('userRole', result.user.role)
        
        if (selectedRole === 'student') {
          navigate('/student/chat')
        } else if (selectedRole === 'warden') {
          navigate('/warden/dashboard')
        } else if (selectedRole === 'admin') {
          navigate('/warden/dashboard') // Admin goes to warden dashboard for now
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hostel Management AI Agent</h1>
          <p className="text-lg text-gray-600">Select your role to continue</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-200 ${
                selectedRole === role.id
                  ? 'border-blue-500 bg-white shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} mb-4`}>
                <role.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{role.name}</h3>
              <p className="text-sm text-gray-600">{role.description}</p>
              {selectedRole === role.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Login Form */}
        {selectedRole && (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Login as {roles.find(r => r.id === selectedRole)?.name}
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !username || !password}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Login</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setSelectedRole('')}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Change role
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Demo Credentials */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">Demo Credentials:</p>
          <div className="inline-flex flex-wrap gap-4 justify-center text-xs text-gray-600 bg-white px-6 py-3 rounded-xl border border-gray-200">
            <span><strong>Student:</strong> student / password</span>
            <span><strong>Warden:</strong> warden / password</span>
            <span><strong>Admin:</strong> admin / password</span>
          </div>
        </div>
      </div>
    </div>
  )
}
