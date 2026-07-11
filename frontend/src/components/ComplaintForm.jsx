import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Upload, 
  X, 
  AlertCircle,
  CheckCircle,
  Zap,
  Droplets,
  Wrench,
  Shield,
  Utensils,
  Trash2
} from 'lucide-react'
import { mockComplaintService } from '../services/mockService'

export default function ComplaintForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    category: '',
    priority: 'MEDIUM',
    details: '',
    images: []
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const categories = [
    { id: 'ELECTRICAL', name: 'Electrical', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'PLUMBING', name: 'Plumbing', icon: Droplets, color: 'from-blue-500 to-cyan-500' },
    { id: 'MAINTENANCE', name: 'Maintenance', icon: Wrench, color: 'from-gray-500 to-gray-600' },
    { id: 'SECURITY', name: 'Security', icon: Shield, color: 'from-red-500 to-red-600' },
    { id: 'FOOD', name: 'Food/Mess', icon: Utensils, color: 'from-green-500 to-green-600' },
    { id: 'CLEANING', name: 'Cleaning', icon: Trash2, color: 'from-purple-500 to-purple-600' },
  ]

  const priorities = [
    { id: 'LOW', name: 'Low', color: 'bg-green-100 text-green-700 border-green-300' },
    { id: 'MEDIUM', name: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    { id: 'HIGH', name: 'High', color: 'bg-orange-100 text-orange-700 border-orange-300' },
    { id: 'URGENT', name: 'Urgent', color: 'bg-red-100 text-red-700 border-red-300' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.category || !formData.details) {
      setError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await mockComplaintService.createComplaint({
        studentName: 'Current Student',
        rollNumber: 'CS001',
        details: formData.details,
        category: formData.category,
        priority: formData.priority
      })
      setSuccess(true)
      setTimeout(() => {
        navigate('/student/dashboard')
      }, 2000)
    } catch (err) {
      setError('Failed to submit complaint. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Complaint Submitted!</h2>
          <p className="text-gray-600">Your complaint has been registered and will be reviewed by the warden.</p>
        </motion.div>
      </div>
    )
  }

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
            <h1 className="text-2xl font-bold text-gray-900">Report Complaint</h1>
            <p className="text-sm text-gray-500">Submit a new complaint about hostel facilities</p>
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
            {/* Category Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Category <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      formData.category === category.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Priority Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Priority Level
              </label>
              <div className="flex flex-wrap gap-3">
                {priorities.map((priority) => (
                  <motion.button
                    key={priority.id}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.id }))}
                    className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                      formData.priority === priority.id
                        ? priority.color
                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {priority.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                placeholder="Please describe your complaint in detail..."
                rows={6}
                className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none shadow-sm"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Attach Images (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-indigo-600" />
                  </div>
                  <p className="text-gray-900 font-medium mb-1">Click to upload images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {/* Image Previews */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {formData.images.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
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
                  <span>Submit Complaint</span>
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  )
}
