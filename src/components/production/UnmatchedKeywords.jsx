import { useEffect, useState } from "react";
import axios from "../../utils/api";

export default function UnmatchedKeywords({refreshTrigger}) {
    const [keywords, setKeywords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios
            .get("/unmatched_keywords")
            .then((res) => setKeywords(res.data))
            .finally(() => setLoading(false));
    }, [refreshTrigger]);

    const handleDismiss = (word, category) => {
        axios.post("/dismissed_keywords", { word, category }).then(() => {
            setKeywords((prev) => prev.filter((k) => k.word !== word));
        });
    };

    const handleCreateTip = (word, category) => {
        const tip = prompt(`Enter a reflection tip for "${word}" (${category}):`);
        if (!tip) return;

        axios
            .post("/reflection_tips", { keyword: word, category, tip })
            .then(() => {
                setKeywords((prev) => prev.filter((k) => k.word !== word));
            });
    };

    const filtered = keywords.filter(({ word, category, example }) => {
        const query = search.toLowerCase();
        return (
            word.toLowerCase().includes(query) ||
            category.toLowerCase().includes(query) ||
            (example && example.toLowerCase().includes(query))
        );
    });

    return (
        <div>
            {/* Search Input */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search unmatched keywords..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-1/2 border px-4 py-2 rounded"
                />
            </div>

            {/* Loading / Empty */}
            {loading ? (
                <p>Loading unmatched keywords...</p>
            ) : filtered.length === 0 ? (
                <p className="text-gray-500">No matching keywords found.</p>
            ) : (
                <div className="space-y-4">
                    {filtered.map(({ word, category, count, example }) => (
                        <div
                            key={word}
                            className="border p-4 rounded flex flex-col sm:flex-row sm:items-start sm:justify-between bg-white shadow-sm"
                        >
                            <div className="flex-1 mb-4 sm:mb-0">
                                <div className="text-lg font-bold text-gray-800">{word}</div>
                                <div className="text-sm text-gray-500 mb-1">
                                    {category} | seen {count} time{count !== 1 ? "s" : ""}
                                </div>
                                {example && (
                                    <div className="text-sm italic text-gray-600">"{example}"</div>
                                )}
                            </div>

                            <div className="flex gap-2 sm:flex-col sm:items-end">
                                <button
                                    onClick={() => handleDismiss(word, category)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Dismiss
                                </button>
                                <button
                                    onClick={() => handleCreateTip(word, category)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Create Tip
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}