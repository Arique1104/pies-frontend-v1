// src/components/Chart.jsx
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const PIESLineChart = ({ entries }) => {
    if (!entries || entries.length === 0) return <p>No data to display.</p>;

    // Transform entries into chart-friendly data
    const data = entries.map((entry) => ({
        date: entry.checked_in_on,
        physical: entry.physical,
        intellectual: entry.intellectual,
        emotional: entry.emotional,
        spiritual: entry.spiritual,
    }));

    return (
        <div className="w-full h-80 mb-6">
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="physical" stroke="#EF4444" name="Physical" />
                    <Line type="monotone" dataKey="intellectual" stroke="#3B82F6" name="Intellectual" />
                    <Line type="monotone" dataKey="emotional" stroke="#F59E0B" name="Emotional" />
                    <Line type="monotone" dataKey="spiritual" stroke="#10B981" name="Spiritual" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PIESLineChart;