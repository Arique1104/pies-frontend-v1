import { useEffect, useState } from "react";
import {
    addOrgMembers,
    updateOrgMemberRoles,
} from "../../utils/api";
import instance from "../../utils/api";
import ProductionDashboardNavigation from "./ProductionDashboardNavigation";

export default function OrgShowForSuperUser() {
    const [orgData, setOrgData] = useState(null);
    const [newMembers, setNewMembers] = useState([{ email: "", role: "" }]);
    const [roleUpdates, setRoleUpdates] = useState([{ user_id: "", role: "" }]);
    const orgId = sessionStorage.getItem("selectedOrgId");

    useEffect(() => {
        if (!orgId) return;

        instance
            .post("/orgs/show", { org_id: orgId })
            .then((res) => setOrgData(res.data))
            .catch((err) => console.error("Failed to load org show", err));
    }, [orgId]);

    const handleAddMembers = async () => {
        try {
            const response = await addOrgMembers(newMembers, orgId);
            console.log("Members added:", response);
        } catch (error) {
            console.error("Error adding members", error);
        }
    };

    const handleUpdateRoles = async () => {
        try {
            const response = await updateOrgMemberRoles(roleUpdates);
            console.log("Roles updated:", response);
        } catch (error) {
            console.error("Error updating roles", error);
        }
    };

    if (!orgData) return <div className="p-6">Loading organization...</div>;

    return (
        <div className="p-6">
            <ProductionDashboardNavigation />
            <h2 className="text-2xl font-bold mb-4">{orgData.name}</h2>
            <p className="mb-6 text-gray-600">{orgData.description}</p>

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Members</h3>
                <ul className="list-disc ml-6">
                    {orgData.memberships?.map((m) => (
                        <li key={m.id}>
                            {m.user?.name || "Unnamed"} –{" "}
                            <span className="text-sm text-gray-500">{m.role}</span>
                        </li>
                    )) || <li>No members found</li>}
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Events</h3>
                <ul className="list-disc ml-6">
                    {orgData.events.map((e) => (
                        <li key={e.id}>
                            {e.title} –{" "}
                            <span className="text-sm text-gray-500">
                                {new Date(e.date).toLocaleDateString()}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* ─── Add New Members ─────────────────────── */}
            <div className="my-8">
                <h3 className="font-bold text-lg mb-2">Add Members</h3>
                {newMembers.map((m, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input
                            type="email"
                            placeholder="Email"
                            className="border px-2 py-1"
                            value={m.email}
                            onChange={(e) => {
                                const updated = [...newMembers];
                                updated[i].email = e.target.value;
                                setNewMembers(updated);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Role"
                            className="border px-2 py-1"
                            value={m.role}
                            onChange={(e) => {
                                const updated = [...newMembers];
                                updated[i].role = e.target.value;
                                setNewMembers(updated);
                            }}
                        />
                    </div>
                ))}
                <button
                    className="bg-gray-200 px-3 py-1 mr-2"
                    onClick={() =>
                        setNewMembers([...newMembers, { email: "", role: "" }])
                    }
                >
                    + Add Row
                </button>
                <button className="bg-blue-500 text-white px-3 py-1" onClick={handleAddMembers}>
                    Submit New Members
                </button>
            </div>

            {/* ─── Update Roles ─────────────────────── */}
            <div className="my-8">
                <h3 className="font-bold text-lg mb-2">Update Member Roles</h3>
                {roleUpdates.map((r, i) => (
                    <div key={i} className="flex gap-2 mb-2">
                        <input
                            type="text"
                            placeholder="User ID"
                            className="border px-2 py-1"
                            value={r.user_id}
                            onChange={(e) => {
                                const updated = [...roleUpdates];
                                updated[i].user_id = e.target.value;
                                setRoleUpdates(updated);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="New Role"
                            className="border px-2 py-1"
                            value={r.role}
                            onChange={(e) => {
                                const updated = [...roleUpdates];
                                updated[i].role = e.target.value;
                                setRoleUpdates(updated);
                            }}
                        />
                    </div>
                ))}
                <button
                    className="bg-gray-200 px-3 py-1 mr-2"
                    onClick={() =>
                        setRoleUpdates([...roleUpdates, { user_id: "", role: "" }])
                    }
                >
                    + Add Row
                </button>
                <button className="bg-green-600 text-white px-3 py-1" onClick={handleUpdateRoles}>
                    Submit Role Updates
                </button>
            </div>
        </div>
    );
}