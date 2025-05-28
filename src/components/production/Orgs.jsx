import ProductionDashboardNavigation from "./ProductionDashboardNavigation";
import OrgIndexForSuperUser from "./OrgIndexForSuperUser";
export default function Orgs() {
    
    return (
    <div className="p-6">
        <ProductionDashboardNavigation/>
        <h2>
        🏢 Manage Organizations
        </h2>
        <OrgIndexForSuperUser />
        </div>);
}
