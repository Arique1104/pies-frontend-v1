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

    return (
        <div className="dashboard-container">
            <VerticalTabs active={active} setActive={setActive} tabs={Object.keys(tabs)} />
            <div className="dashboard-content">{tabs[active]}</div>
        </div>
    )
}