import { useEffect, useState } from "react";
import instance from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function OrgIndexForSuperUser() {
    const [orgs, setOrgs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        instance.get("/orgs")
            .then(res => {
                const sorted = res.data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setOrgs(sorted);
            })
            .catch(err => console.error("Failed to fetch orgs", err));
    }, []);

    const handleTileClick = (org) => {
        sessionStorage.setItem("selectedOrgId", org.id);
        navigate("/production/orgs/show");
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-6">Your Organizations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {orgs.map(org => (
                    <div
                        key={org.id}
                        className="border-2 border-blue-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-lg hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer ring-offset-1 hover:ring-2 hover:ring-blue-300"
                        onClick={() => handleTileClick(org)}
                    >
                        <h3 className="font-semibold text-lg text-blue-800 mb-1">{org.name}</h3>
                        <p className="text-sm text-gray-600">{org.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}