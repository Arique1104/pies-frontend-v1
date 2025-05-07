import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export default function ProtectedOwnerRoute({ children }) {
    const { role } = useAuth();
    return role === 'owner' ? children : <Navigate to = "/" replace />;
}