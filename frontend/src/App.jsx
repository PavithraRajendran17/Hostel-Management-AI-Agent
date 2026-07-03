import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import StudentChat from './components/StudentChat'
import WardenDashboard from './components/WardenDashboard'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/chat" element={<StudentChat />} />
        <Route path="/warden/dashboard" element={<WardenDashboard />} />
      </Routes>
    </div>
  )
}

export default App
