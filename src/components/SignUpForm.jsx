import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from '../utils/api'
import { useAuth } from './AuthProvider'

export default function SignupForm() {
    const { setUser } = useAuth()
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('/users', { ...form })
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/dashboard')
        } catch (err) {
            alert('Signup failed')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <input type="password" placeholder="Confirm Password" onChange={e => setForm({ ...form, password_confirmation: e.target.value })} />
            <button type="submit">Sign Up</button>
        </form>
    )
}