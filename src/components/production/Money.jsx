import { useNavigate } from "react-router-dom"

export default function Money() {
    const navigate = useNavigate()
    return (
    <div className="money">
            <button
                onClick={() => navigate('/production')}
                className="mb-4 text-sm text-blue-600 underline"
            >
                ← Back to Production Dashboard
            </button>
        <h2>
            💸 Manage Monetized Tools
        </h2>
    
    </div>)
}