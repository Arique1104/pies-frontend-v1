import { useNavigate } from 'react-router-dom';

export default function Production() {
    const navigate = useNavigate();

    const tools = [
        { label: 'Keywords', path: '/production/keywords' },
        { label: 'Orgs', path: '/production/orgs' },
        { label: 'Insights', path: '/production/insights' },
        { label: 'Money', path: '/production/money' }
    ];

    return (
        <div className="p-6">
            <button
                onClick={() => navigate('/dashboard')}
                className="mb-4 text-sm text-blue-600 underline"
            >
                ← Back to PIES Checkin Dashboard
            </button>
            <h2 className="text-xl mb-4">Production Tools</h2>
            <div className="grid gap-4 grid-cols-2">
                {tools.map(({ label, path }) => (
                    <button
                        key={path}
                        className="border p-4 rounded hover:bg-gray-100"
                        onClick={() => navigate(path)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}