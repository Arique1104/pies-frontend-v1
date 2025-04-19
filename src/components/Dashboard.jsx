import VerticalTabs from './VerticalTabs'
import PIESCheckin from './tabs/PIESCheckin'
import Growth from './tabs/Growth'
import Tips from './tabs/Tips'
import Events from './tabs/Events'
import Memberships from './tabs/Memberships'
import { useState } from 'react'

export default function Dashboard() {
    const [active, setActive] = useState('PIES Checkin')

    const tabs = {
        'PIES Checkin': <PIESCheckin />,
        'Growth': <Growth />,
        'Tips': <Tips />,
        'Events': <Events />,
        'Memberships': <Memberships />
    }

    // Placeholder for future org-role logic:
    const role = "owner" // Simulating a role for now

    return (
        <div className="dashboard-container">
            <VerticalTabs
                active={active}
                setActive={setActive}
                tabs={Object.keys(tabs)}
                role={role}
            />
            <div className="dashboard-content">
                {tabs[active]}
            </div>
        </div>
    )
}