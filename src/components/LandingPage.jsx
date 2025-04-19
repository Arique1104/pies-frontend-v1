// src/components/LandingPage.jsx
import { Link } from 'react-router-dom'

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl font-bold mb-4">Welcome to PIES</h1>
            <p className="text-lg text-gray-600 mb-6">
                Personal check-ins for Physical, Intellectual, Emotional, and Spiritual growth.
            </p>
            <Link
                to="/signup"
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
                Get Started
            </Link>

            <p className="text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline">
                    Log in
                </Link>
            </p>
        </div>
    )
}