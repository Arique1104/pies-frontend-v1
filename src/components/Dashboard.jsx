import { useEffect, useState } from 'react';
import VerticalTabs from './VerticalTabs';
import PIESCheckin from './tabs/PIESCheckin';
import Growth from './tabs/Growth';
import Tips from './tabs/Tips';
import Events from './tabs/Events';
import Memberships from './tabs/Memberships';
import Favorites from './tabs/Favorites';

export default function Dashboard() {
    const [active, setActive] = useState(() => {
        return localStorage.getItem('activeTab') || 'PIES Checkin';
    });

    useEffect(() => {
        localStorage.setItem('activeTab', active);
    }, [active]);

    const tabs = {
        'PIES Checkin': <PIESCheckin />,
        'Tips': <Tips />,
        '⭐ Favorites': <Favorites />,
        'Growth': <Growth />,
        'Events': <Events />,
        'Memberships': <Memberships />,
    };

    const role = 'owner'; // Placeholder for future role logic

    return (
        <div className="dashboard-container">
            <VerticalTabs
                active={active}
                setActive={setActive}
                tabs={Object.keys(tabs)}
                role={role}
            />
            <div className="dashboard-content">{tabs[active]}</div>
        </div>
    );
}