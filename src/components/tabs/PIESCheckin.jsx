import { useState, useEffect } from "react";
import instance from "../../utils/api"
import { createPIESCheckin } from "../../utils/api"
import HealingPlant from "../HealingPlant"

export default function PIESCheckin() {
    const [streakData, setStreakData] = useState(null);
    const [formData, setFormData] = useState({
        physical: { rating: 5, description: "" },
        intellectual: { rating: 5, description: "" },
        emotional: { rating: 5, description: "" },
        spiritual: { rating: 5, description: "" },
    });

    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    // Get user and streak info
    useEffect(() => {
        async function fetchUserAndStreak() {
            try {
                const streakRes = await instance.get(`pies_entries/latest`);
                setStreakData(streakRes.data);
            } catch (err) {
                console.error(err);
                setError("Could not load your check-in status.");
            }
        }

        fetchUserAndStreak();
    }, []);

    const handleSliderChange = (category, value) => {
        setFormData((prev) => ({
            ...prev,
            [category]: { ...prev[category], rating: Number(value) },
        }));
    };

    const handleDescriptionChange = (category, description) => {
        setFormData((prev) => ({
            ...prev,
            [category]: { ...prev[category], description },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

            const payload = {
                checked_in_on: today,
                physical: formData.physical.rating,
                physical_description: formData.physical.description,
                intellectual: formData.intellectual.rating,
                intellectual_description: formData.intellectual.description,
                emotional: formData.emotional.rating,
                emotional_description: formData.emotional.description,
                spiritual: formData.spiritual.rating,
                spiritual_description: formData.spiritual.description
            };
       

            await createPIESCheckin(payload);

            // Refresh streak info
            const updated = await instance.get(`/pies_entries/latest`);
            setStreakData(updated.data);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            console.error(err);
            setError("Failed to submit your check-in.");
        }
    };

    const isLockedOut = streakData?.today_checked_in;

    return (
        <div className="space-y-8 max-w-2xl">
            <h2 className="text-2xl font-bold">PIES Check-In</h2>

            {streakData && (
                <div className="healing-garden flex gap-2 py-4">
                    {[...Array(streakData.streak_count)].map((_, i) => (
                        <HealingPlant key={i} delay={i * 0.2} />
                    ))}
                </div>
            )}

            {isLockedOut ? (
                <p className="text-green-400">
                    ✅ You’ve already checked in today. Come back tomorrow to keep growing 🌿
                </p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {["physical", "intellectual", "emotional", "spiritual"].map((type) => (
                        <div key={type}>
                            <label className="block text-lg capitalize">
                                {type} ({formData[type].rating}/10)
                            </label>
                            <input
                                type="range"
                                min={1}
                                max={10}
                                value={formData[type].rating}
                                required
                                onChange={(e) => handleSliderChange(type, e.target.value)}
                                className="w-full"
                            />
                            <textarea
                                placeholder={`Optional: Add notes about your ${type} check-in`}
                                className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                                rows={2}
                                value={formData[type].description}
                                onChange={(e) => handleDescriptionChange(type, e.target.value)}
                            />
                        </div>
                    ))}

                    {error && <p className="text-red-400">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Submit Check-In
                    </button>
                </form>
            )}

            {submitted && (
                <p className="text-green-400 mt-3">✅ Check-in submitted successfully!</p>
            )}

            {streakData?.recent_entries && (
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-2">Your Recent Check-Ins</h3>
                    
                    <ul className="space-y-1 text-sm text-gray-300">
                        {streakData.recent_entries.map((entry) => (
                            <li key={entry.id} className="border-b border-gray-700 pb-1">
                                <strong>{new Date(entry.created_at).toLocaleDateString()}:</strong>{" "}
                                P:{entry.physical} | I:{entry.intellectual} | E:{entry.emotional} | S:{entry.spiritual}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}