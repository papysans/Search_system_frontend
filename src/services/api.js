import axios from 'axios'
import mockProjectsData from './mockProjects.json'

const api = axios.create({
  baseURL: 'http://your-api-url.com/api'
})

// Mock user data for testing
const mockUser = {
  id: '123',
  name: '张三',
  college: '计算机科学与工程学院',
  major: '软件工程',
  className: '软件2班'
}

// Helper function to filter projects based on search criteria
const filterProjects = (projects, query, major) => {
  return projects.filter(project => {
    const matchQuery = !query || 
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.projectType.toLowerCase().includes(query.toLowerCase()) ||
      project.source.toLowerCase().includes(query.toLowerCase()) ||
      project.supervisor.name.toLowerCase().includes(query.toLowerCase())
    
    const matchMajor = !major || project.major === major
    
    return matchQuery && matchMajor
  })
}

// Helper function to paginate results
const paginateResults = (items, page, pageSize) => {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  return {
    items: items.slice(startIndex, endIndex),
    total: items.length,
    currentPage: page,
    totalPages: Math.ceil(items.length / pageSize)
  }
}

// API functions
export async function login(studentId, password) {
  // Mock login - always returns success for testing
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        user: mockUser
      })
    }, 500)
  })
}

export async function getUserInfo(userId) {
  // Mock user info retrieval
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUser)
    }, 300)
  })
}

export async function searchProjects({ query = '', major = '', page = 1, pageSize = 15 }) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Filter projects based on search criteria
  const filteredProjects = filterProjects(mockProjectsData, query, major)
  
  // Paginate results
  const { items: projects, total, currentPage, totalPages } = paginateResults(filteredProjects, page, pageSize)
  
  return {
    projects,
    total,
    currentPage,
    totalPages
  }
}

export async function getMajors() {
  // Get unique majors from mock data
  const majors = [...new Set(mockProjectsData.map(project => project.major))]
  return majors
}