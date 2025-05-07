import { useNavigate } from "react-router-dom";

export default function Orgs() {
    const navigate = useNavigate()
    
    return (
    <div className="p-6">
        <button
            onClick={() => navigate('/production')}
            className="mb-4 text-sm text-blue-600 underline"
        >
            ← Back to Production Dashboard
        </button>
        <h2>
        🏢 Manage Organizations
        </h2>
        </div>);
}
