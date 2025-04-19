export default function VerticalTabs({ tabs, active, setActive }) {
    return (
        <div className="tabs-column">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={tab === active ? 'active-tab' : ''}
                >
                    {tab}
                </button>
            ))}
        </div>
    )
}