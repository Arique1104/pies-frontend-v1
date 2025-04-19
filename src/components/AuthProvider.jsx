import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../utils/api'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            axios.get('/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => setUser(res.data))
                .catch(() => localStorage.removeItem('token'))
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}