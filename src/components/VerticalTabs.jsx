import { useNavigate } from 'react-router-dom'

export default function VerticalTabs({ active, setActive, tabs, role = "individual" }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/", { replace: true });
    };

    // Add your role-based extras here
    const roleBasedTabs = {
        owner: ["Manage Users", "Analytics"],
        leader: ["My Cohort"],
        individual: []
    };

    const extras = roleBasedTabs[role] || [];

    return (
        <aside className="vertical-tabs">
            <div className="tabs-scroll">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={active === tab ? "active" : ""}
                    >
                        {tab}
                    </button>
                ))}

                {extras.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={active === tab ? "active" : ""}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="tabs-footer">
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
        </aside>
    );
}