import { useEffect, useState } from "react";
import instance from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function OrgIndexForSuperUser() {
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    instance.get("/orgs")
      .then(res => setOrgs(res.data))
      .catch(err => console.error("Failed to fetch orgs", err));
  }, []);

  const handleTileClick = (org) => {
    sessionStorage.setItem("selectedOrgId", org.id);
    navigate("/production/orgs/show")
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {orgs.map(org => (
        <div
          key={org.id}
          className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
          onClick={() => handleTileClick(org)}
        >
          <h3 className="font-bold text-lg">{org.name}</h3>
          <p className="text-sm text-gray-600">{org.description}</p>
        </div>
      ))}
    </div>
  );
}