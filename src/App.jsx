import { Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import AuthProvider from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';
import LoginForm from "./components/LoginForm";

import ProtectedOwnerRoute from './components/ProtectedOwnerRoute';
// owner protected routes
import Production from './components/tabs/Production';
import Keywords from './components/production/Keywords';
import Orgs from './components/production/Orgs';
import Insights from './components/production/Insights';
import Money from './components/production/Money';

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
        <Route
          path="/production"
          element={
            <ProtectedOwnerRoute>
              <Production />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/production/keywords"
          element={
            <ProtectedOwnerRoute>
              <Keywords />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/production/orgs"
          element={
            <ProtectedOwnerRoute>
              <Orgs />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/production/insights"
          element={
            <ProtectedOwnerRoute>
              <Insights />
            </ProtectedOwnerRoute>
          }
        />
        <Route
          path="/production/money"
          element={
            <ProtectedOwnerRoute>
              <Money />
            </ProtectedOwnerRoute>
          }
        />
      </Routes>
    </AuthProvider>
  )
}