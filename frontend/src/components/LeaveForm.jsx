import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  AlertCircle,
  CheckCircle,
  Clock,
  Home,
  Briefcase,
  User,
  MapPin
} from 'lucide-react'
import { mockLeaveService } from '../services/mockService'

export default function LeaveForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    reason: '',
    startDate: '',
    endDate: '',
    isEmergency: false,
    destination: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const leaveReasons = [
    { id: 'family', name: 'Family Function', icon: Home, color: 'from-blue-500 to-blue-600' },
    { id: 'medical', name: 'Medical', icon: Briefcase, color: 'from-red-500 to-red-600' },
    { id: 'personal', name: 'Personal', icon: User, color: 'from-purple-500 to-purple-600' },
    { id: 'travel', name: 'Travel', icon: MapPin, color: 'from-green-500 to-green-600' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.reason || !formData.startDate || !formData.endDate) {
      setError('Please fill in all required fields')
      return
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      setError('End date must be after start date')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await mockLeaveService.createLeaveRequest({
        studentName: 'Current Student',
        rollNumber: 'CS001',
        reason: formData.reason,
        startDate: formData.startDate,
        endDate: formData.endDate
      })
      setSuccess(true)
      setTimeout(() => {
        navigate('/student/dashboard')
      }, 2000)
    } catch (err) {
      setError('Failed to submit leave request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReasonSelect = (reason) => {
    setFormData(prev => ({ ...prev, reason }))
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-12 text-center shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Leave Request Submitted!</h2>
          <p className="text-gray-600">Your leave request has been submitted and is pending approval.</p>
        </motion.div>
      </div>
    )
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/student/dashboard')}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </motion.button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Apply for Leave</h1>
            <p className="text-sm text-gray-500">Submit a leave request for approval</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Leave Reason Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Leave Reason <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {leaveReasons.map((reason) => (
                  <motion.button
                    key={reason.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReasonSelect(reason.name)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      formData.reason === reason.name
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <reason.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium text-gray-900 text-sm">{reason.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Custom Reason Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Detailed Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Please provide more details about your leave request..."
                rows={4}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none shadow-sm"
                required
              />
            </div>

            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Start Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    min={today}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  End Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    min={formData.startDate || today}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Destination */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Destination (Optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  placeholder="Where will you be going?"
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Emergency Toggle */}
            <div className="flex items-center gap-4 p-4 bg-red-50 rounded-2xl border border-red-200">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Emergency Leave</p>
                <p className="text-sm text-gray-600">Mark this as an emergency leave request</p>
              </div>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, isEmergency: !prev.isEmergency }))}
                className={`w-14 h-8 rounded-full transition-all duration-300 ${
                  formData.isEmergency ? 'bg-red-600' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  animate={{ x: formData.isEmergency ? 24 : 4 }}
                  className="w-6 h-6 bg-white rounded-full shadow"
                />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Leave Request</span>
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-6 bg-blue-50 rounded-2xl border border-blue-200 flex items-start gap-4"
        >
          <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Leave Request Guidelines</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Submit requests at least 24 hours in advance for regular leave</li>
              <li>• Emergency leave requests are processed on priority</li>
              <li>• Maximum leave duration is 7 days per request</li>
              <li>• You will receive notification upon approval/rejection</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
