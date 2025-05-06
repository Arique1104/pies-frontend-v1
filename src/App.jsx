import { Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import LoginForm from "./components/LoginForm";


export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={ <LandingPage /> } />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}