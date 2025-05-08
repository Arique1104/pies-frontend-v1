import { useEffect, useState } from "react";
import axios from "../../utils/api";

export default function DismissedKeywords({ onRescue }) {
    const [dismissed, setDismissed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLetter, setSelectedLetter] = useState("All");

    useEffect(() => {
        fetchDismissed();
    }, []);

    const fetchDismissed = () => {
        setLoading(true);
        axios
            .get("/dismissed_keywords")
            .then((res) => setDismissed(res.data))
            .finally(() => setLoading(false));
    };

    const handleRescue = (word) => {
        if (!confirm(`Rescue keyword "${word}"?`)) return;

        axios.delete(`/dismissed_keywords/${word}`).then(() => {
            fetchDismissed(); // refresh dismissed list
            if (onRescue) onRescue(); // trigger unmatched refresh
        });
    };

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const filtered = dismissed.filter(({ word }) => {
        if (selectedLetter === "All") return true;
        return word[0]?.toUpperCase() === selectedLetter;
    });

    return (
        <div>
            {/* A–Z Index */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => setSelectedLetter("All")}
                    className={`px-2 py-1 text-sm font-medium rounded ${selectedLetter === "All"
                            ? "bg-black text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                >
                    All
                </button>
                {alphabet.map((letter) => (
                    <button
                        key={letter}
                        onClick={() => setSelectedLetter(letter)}
                        className={`px-2 py-1 text-sm font-medium rounded ${selectedLetter === letter
                                ? "bg-black text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {letter}
                    </button>
                ))}
            </div>

            {/* Keyword List */}
            {loading ? (
                <p>Loading dismissed keywords...</p>
            ) : filtered.length === 0 ? (
                <p className="text-gray-500">No keywords starting with "{selectedLetter}".</p>
            ) : (
                <div className="space-y-4">
                    {filtered.map(({ word, category, created_at }) => (
                        <div
                            key={word}
                            className="border p-4 rounded bg-white shadow-sm flex flex-col sm:flex-row sm:justify-between"
                        >
                            <div>
                                <div className="text-lg font-bold text-gray-800">{word}</div>
                                <div className="text-sm text-gray-500">
                                    {category} • dismissed{" "}
                                    {new Date(created_at).toLocaleDateString()}
                                </div>
                            </div>

                            <button
                                onClick={() => handleRescue(word)}
                                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 sm:mt-0 hover:bg-blue-700"
                            >
                                Rescue
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}