import React, { useEffect, useState } from "react";
import { fetchGrowthSummary } from "../../utils/api";
import PIESFlower from "../PiesFlower";
import PIESLineChart from "../PIESLineChart";

const Growth = () => {
    const [growthData, setGrowthData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGrowthSummary()
            .then((data) => {
                setGrowthData(data); // ✅ data, not response.data
            })
            .catch((err) => {
                const fallback = err?.response?.data?.errors || "Something went wrong";
                setError(typeof fallback === "string" ? fallback : JSON.stringify(fallback));
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading your growth insights...</p>;
    if (error) return <p className="text-red-600">Error: {error}</p>;
    if (!growthData) return null; // just in case
    if (growthData.message) {
        return <p className="text-gray-700">{growthData.message}</p>;
    }

    // Now safe to destructure
    const { average_scores, previous_scores, today_scores, insights } = growthData;
    
    const renderScoreBlock = (label, scores) => (
        <div className="border p-4 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{label}</h3>
            <ul>
                {Object.entries(scores).map(([category, score]) => (
                    <li key={category}>
                        <strong>{category}:</strong> {Number(score).toFixed(1)}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="grid gap-4 p-4 md:grid-cols-3">
            {renderScoreBlock("All-Time Averages", average_scores)}
            {renderScoreBlock("Previous Check-In", previous_scores)}
            {renderScoreBlock("Today’s Scores", today_scores)}
            {<PIESFlower scores={average_scores} />}
            {/* {<PIESLineChart entries={average_scores}/>} */}

            <div className="md:col-span-3 border p-4 rounded-xl bg-yellow-50 shadow-inner">
                <h3 className="font-semibold text-lg mb-2">Growth Insights</h3>
                {insights.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {insights.map((msg, idx) => (
                            <li key={idx}>{msg}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No major changes today — keep checking in!</p>
                )}
            </div>
        </div>
    );
};

export default Growth;