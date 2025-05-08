// src/components/production/Keywords.jsx
import { useState } from "react";
import UnmatchedKeywords from "./UnmatchedKeywords";
import ReflectionTips from "./ReflectionTips";
import DismissedKeywords from "./DismissedKeywords";
import ProductionDashboardNavigation from "./ProductionDashboardNavigation";

export default function Keywords() {
    const [active, setActive] = useState("unmatched");
    const [refreshUnmatched, setRefreshUnmatched] = useState(false);

    const triggerUnmatchedRefresh = () => setRefreshUnmatched(prev => !prev);

    return (
        <div className="p-6">
            <ProductionDashboardNavigation />

            {/* Section Tabs with improved styling */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
                <div className="flex gap-4 border-b pb-2">
                    <button
                        onClick={() => {
                            triggerUnmatchedRefresh();
                            setActive("unmatched");
                        }}
                        className={`text-sm font-medium px-4 py-2 rounded-t ${active === "unmatched"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                            }`}
                    >
                        Unmatched
                    </button>
                    <button
                        onClick={() => setActive("tips")}
                        className={`text-sm font-medium px-4 py-2 rounded-t ${active === "tips"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                            }`}
                    >
                        Reflection Tips
                    </button>
                    <button
                        onClick={() => setActive("dismissed")}
                        className={`text-sm font-medium px-4 py-2 rounded-t ${active === "dismissed"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                            }`}
                    >
                        Dismissed
                    </button>
                </div>
            </div>

            {/* Section Content */}
            {active === "unmatched" && <UnmatchedKeywords refreshTrigger={refreshUnmatched} />}
            {active === "tips" && <ReflectionTips />}
            {active === "dismissed" && (
                <DismissedKeywords onRescue={triggerUnmatchedRefresh} />
            )}
        </div>
    );
}