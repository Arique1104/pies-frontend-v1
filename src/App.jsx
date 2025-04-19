import { Routes, Route, Navigate } from 'react-router-dom'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import AuthProvider from './components/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  )
}