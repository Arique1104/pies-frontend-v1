import { useNavigate } from "react-router-dom";
export default function Keywords() {
    const navigate = useNavigate();
    // - review unmatched_keywords and 
    // transform them into reflection tips

    return <div className="p-6">
        <button
            onClick={() => navigate('/production')}
            className="mb-4 text-sm text-blue-600 underline"
        >
            ← Back to Production Dashboard
        </button>
        <h2>
            🗝️ Manage Keywords
        </h2>
    
    </div>;
}