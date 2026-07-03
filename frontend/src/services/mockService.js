// Mock Data Service for Hostel Management Frontend

// Mock Complaints Data
export const mockComplaints = [
  {
    id: 1,
    studentName: 'Alice Johnson',
    rollNumber: 'CS001',
    details: 'The air conditioning in room 101 is not working properly. It makes loud noises and doesn\'t cool the room.',
    category: 'ELECTRICAL',
    priority: 'HIGH',
    status: 'PENDING',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    studentName: 'Bob Williams',
    rollNumber: 'CS002',
    details: 'There is a leakage in the bathroom tap. Water is continuously dripping.',
    category: 'PLUMBING',
    priority: 'MEDIUM',
    status: 'PENDING',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    studentName: 'Charlie Brown',
    rollNumber: 'CS003',
    details: 'The room cleaning service has not been provided for the past 3 days.',
    category: 'CLEANING',
    priority: 'LOW',
    status: 'APPROVED',
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    studentName: 'Diana Prince',
    rollNumber: 'CS004',
    details: 'The door lock is broken and needs immediate repair.',
    category: 'SECURITY',
    priority: 'URGENT',
    status: 'PENDING',
    createdAt: '2024-01-16'
  }
]

// Mock Leave Requests Data
export const mockLeaveRequests = [
  {
    id: 1,
    studentName: 'Alice Johnson',
    rollNumber: 'CS001',
    reason: 'Need to attend family function in hometown',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    status: 'PENDING',
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    studentName: 'Bob Williams',
    rollNumber: 'CS002',
    reason: 'Medical appointment and recovery period',
    startDate: '2024-01-18',
    endDate: '2024-01-19',
    status: 'APPROVED',
    createdAt: '2024-01-14'
  },
  {
    id: 3,
    studentName: 'Charlie Brown',
    rollNumber: 'CS003',
    reason: 'Going home for semester break',
    startDate: '2024-01-25',
    endDate: '2024-02-01',
    status: 'REJECTED',
    createdAt: '2024-01-13'
  },
  {
    id: 4,
    studentName: 'Diana Prince',
    rollNumber: 'CS004',
    reason: 'Attending sister\'s wedding',
    startDate: '2024-01-23',
    endDate: '2024-01-25',
    status: 'PENDING',
    createdAt: '2024-01-16'
  }
]

// Mock AI Service - Simulates natural language processing
export const mockAIService = {
  async parseUserInput(userInput) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const lowerInput = userInput.toLowerCase()

    // Simple keyword-based intent detection
    if (lowerInput.includes('complaint') || lowerInput.includes('issue') || lowerInput.includes('problem') || lowerInput.includes('broken') || lowerInput.includes('not working')) {
      return {
        intent: 'COMPLAINT',
        details: userInput,
        category: this.detectCategory(lowerInput),
        priority: this.detectPriority(lowerInput),
        confidence: 0.85
      }
    } else if (lowerInput.includes('leave') || lowerInput.includes('request') || lowerInput.includes('need') || lowerInput.includes('going') || lowerInput.includes('visit')) {
      return {
        intent: 'LEAVE_REQUEST',
        reason: userInput,
        start_date: this.extractDate(lowerInput, 'start'),
        end_date: this.extractDate(lowerInput, 'end'),
        confidence: 0.82
      }
    } else if (lowerInput.includes('status') || lowerInput.includes('check') || lowerInput.includes('my request')) {
      return {
        intent: 'QUERY',
        queryType: 'STATUS_CHECK',
        confidence: 0.90
      }
    } else {
      return {
        intent: 'UNKNOWN',
        confidence: 0.30
      }
    }
  },

  detectCategory(input) {
    if (input.includes('ac') || input.includes('fan') || input.includes('light') || input.includes('electrical')) return 'ELECTRICAL'
    if (input.includes('water') || input.includes('tap') || input.includes('leak') || input.includes('plumbing')) return 'PLUMBING'
    if (input.includes('clean') || input.includes('dirt') || input.includes('mess')) return 'CLEANING'
    if (input.includes('lock') || input.includes('security') || input.includes('safety')) return 'SECURITY'
    if (input.includes('food') || input.includes('mess') || input.includes('canteen')) return 'FOOD'
    return 'OTHER'
  },

  detectPriority(input) {
    if (input.includes('urgent') || input.includes('emergency') || input.includes('immediate') || input.includes('broken')) return 'URGENT'
    if (input.includes('high') || input.includes('serious') || input.includes('important')) return 'HIGH'
    if (input.includes('low') || input.includes('minor')) return 'LOW'
    return 'MEDIUM'
  },

  extractDate(input, type) {
    // Simple date extraction - in real app, use proper date parsing
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const nextWeek = new Date(today)
    nextWeek.setDate(nextWeek.getDate() + 7)

    if (type === 'start') {
      if (input.includes('tomorrow')) return tomorrow.toISOString().split('T')[0]
      if (input.includes('today')) return today.toISOString().split('T')[0]
      return tomorrow.toISOString().split('T')[0]
    } else {
      if (input.includes('week') || input.includes('7 days')) return nextWeek.toISOString().split('T')[0]
      const dayAfter = new Date(tomorrow)
      dayAfter.setDate(dayAfter.getDate() + 2)
      return dayAfter.toISOString().split('T')[0]
    }
  }
}

// Mock Authentication Service
export const mockAuthService = {
  async login(username, password, role) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Mock credentials check
    const validCredentials = {
      student: { username: 'student', password: 'password' },
      warden: { username: 'warden', password: 'password' },
      admin: { username: 'admin', password: 'password' }
    }

    const expected = validCredentials[role]
    if (username === expected.username && password === expected.password) {
      return {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: { username, role }
      }
    }

    return {
      success: false,
      error: 'Invalid credentials'
    }
  }
}

// Mock Complaint Service
export const mockComplaintService = {
  async getComplaints() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockComplaints]
  },

  async updateComplaintStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const complaint = mockComplaints.find(c => c.id === id)
    if (complaint) {
      complaint.status = status
      return { success: true, complaint }
    }
    return { success: false, error: 'Complaint not found' }
  },

  async createComplaint(complaintData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newComplaint = {
      id: mockComplaints.length + 1,
      ...complaintData,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0]
    }
    mockComplaints.push(newComplaint)
    return { success: true, complaint: newComplaint }
  }
}

// Mock Leave Request Service
export const mockLeaveService = {
  async getLeaveRequests() {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockLeaveRequests]
  },

  async updateLeaveStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const request = mockLeaveRequests.find(r => r.id === id)
    if (request) {
      request.status = status
      return { success: true, request }
    }
    return { success: false, error: 'Leave request not found' }
  },

  async createLeaveRequest(requestData) {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newRequest = {
      id: mockLeaveRequests.length + 1,
      ...requestData,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0]
    }
    mockLeaveRequests.push(newRequest)
    return { success: true, request: newRequest }
  }
}
