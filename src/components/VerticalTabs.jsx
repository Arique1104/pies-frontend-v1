import { useNavigate } from 'react-router-dom'
import { defaultTabs, roleExtraTabs, tabMap } from './tabsConfig'

export default function VerticalTabs({ active, setActive, role = "individual" }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const allKeys = [
    ...defaultTabs,
    ...(roleExtraTabs[role] || []),
  ];

  return (
    <aside className="vertical-tabs">
      <div className="tabs-scroll">
        {allKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={active === key ? "active" : ""}
          >
            {tabMap[key]?.label || key}
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