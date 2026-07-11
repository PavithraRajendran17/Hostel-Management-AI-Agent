import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard'
import StudentChat from './components/StudentChat'
import ComplaintForm from './components/ComplaintForm'
import LeaveForm from './components/LeaveForm'
import WardenDashboard from './components/WardenDashboard'
import AdminDashboard from './components/AdminDashboard'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/chat" element={<StudentChat />} />
        <Route path="/student/complaints" element={<ComplaintForm />} />
        <Route path="/student/leave" element={<LeaveForm />} />
        
        {/* Warden Routes */}
        <Route path="/warden/dashboard" element={<WardenDashboard />} />
        
        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
