// src/components/production/ProductionDashboardNavigation.jsx
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProductionDashboardNavigation() {
    const navigate = useNavigate();
    const location = useLocation();

    const tools = [
        { key: 'dashboard', label: 'PIES Checkin', path: '/dashboard' },
        { key: 'keywords', label: 'Keywords', path: '/production/keywords' },
        { key: 'orgs', label: 'Orgs', path: '/production/orgs' },
        { key: 'insights', label: 'Insights', path: '/production/insights' },
        { key: 'money', label: 'Money', path: '/production/money' },
    ];

    return (
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-6">
            <h1 className="text-2xl font-bold mb-3">Production Toolbox</h1>
            <div className="flex gap-2 border-b pb-2">
                {tools.map(({ key, label, path }) => (
                    <button
                        key={key}
                        onClick={() => navigate(path)}
                        className={`px-4 py-2 rounded text-sm font-medium ${location.pathname.startsWith(path)
                                ? "bg-black text-white"
                                : "bg-white hover:bg-gray-200 text-gray-700"
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
