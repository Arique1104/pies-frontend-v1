import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState('individual')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get('/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                const userData = res.data;
                // console.log("Logged-in user data:", userData); // for debugging

                const currentUser = userData.user || userData; // fallback
                setUser(currentUser);

                let assignedRole = 'individual';
                if (currentUser.super_user === true) {
                    assignedRole = 'owner';
                } else if (currentUser.leader === true) {
                    assignedRole = 'leader';
                }

                setRole(assignedRole);
                // console.log("Role set to:", assignedRole); // for debugging
            }).catch(() => localStorage.removeItem('token'))
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, role }}>
            {children}
        </AuthContext.Provider>
    )
}