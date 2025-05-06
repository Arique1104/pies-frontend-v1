import { useState } from 'react';
import { useAuth } from './AuthProvider';
import VerticalTabs from './VerticalTabs';
import { tabMap, defaultTabs, roleExtraTabs } from './tabsConfig';

export default function Dashboard() {
    const { role } = useAuth();

    const allKeys = [
        ...defaultTabs,
        ...(roleExtraTabs[role] || []),
    ];

    const [active, setActive] = useState(allKeys[0]);

    return (
        <div className="dashboard-container">
            <VerticalTabs
                active={active}
                setActive={setActive}
                role={role}
            />
            <div className="dashboard-content">
                {tabMap[active]?.component || <div>Tab not found</div>}
            </div>
        </div>
    );
}