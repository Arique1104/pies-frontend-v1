import { useNavigate } from 'react-router-dom'

export default function ProductionDashboardNavigation() {
    const navigate = useNavigate();

    const tools = [
        { label: 'PIES Checkin', path: '/dashboard'},
        { label: 'Keywords', path: '/production/keywords' },
        { label: 'Orgs', path: '/production/orgs' },
        { label: 'Insights', path: '/production/insights' },
        { label: 'Money', path: '/production/money' },
    ];

    return (
        <div>
            {tools.map(({ label, path }) => (
                <button
                key={path}
                onClick={()=> navigate(path)}
                className="text-sm text-blue-600 underline hover:text-blue-800"
                >
                    {label}

                </button>
            ))}
        </div>
    );
}