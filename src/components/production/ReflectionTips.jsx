import { useEffect, useState } from "react";
import axios from "../../utils/api";

export default function ReflectionTips() {
    const [tips, setTips] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = () => {
        setLoading(true);
        axios
            .get("/reflection_tips")
            .then((res) => setTips(res.data))
            .finally(() => setLoading(false));
    };

    const handleCreate = () => {
        const keyword = prompt("Keyword?");
        const category = prompt("Category? (physical, intellectual, emotional, spiritual)");
        const tip = prompt("Reflection Tip?");
        if (!keyword || !category || !tip) return;

        axios
            .post("/reflection_tips", { keyword, category, tip })
            .then(fetchTips);
    };

    const handleUpdate = (id, currentTip) => {
        const newTip = prompt("Edit Tip:", currentTip);
        if (!newTip || newTip === currentTip) return;

        axios
            .put(`/reflection_tips/${id}`, { tip: newTip })
            .then(fetchTips);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this tip?")) {
            axios.delete(`/reflection_tips/${id}`).then(fetchTips);
        }
    };

    const filteredTips = tips.filter((t) =>
        t.keyword.toLowerCase().includes(search.toLowerCase()) ||
        t.tip.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            {/* Controls */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <input
                    type="text"
                    placeholder="Search by keyword or tip..."
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Add Tip
                </button>
            </div>

            {/* List */}
            {loading ? (
                <p>Loading tips...</p>
            ) : filteredTips.length === 0 ? (
                <p className="text-gray-500">No tips found.</p>
            ) : (
                <div className="space-y-4">
                    {filteredTips.map(({ id, keyword, category, tip }) => (
                        <div
                            key={id}
                            className="border p-4 rounded shadow-sm bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between"
                        >
                            <div className="flex-1 mb-4 sm:mb-0">
                                <div className="font-semibold text-gray-800">{keyword}</div>
                                <div className="text-sm text-gray-500 mb-2">{category}</div>
                                <div className="text-sm text-gray-700 italic">"{tip}"</div>
                            </div>
                            <div className="flex gap-2 sm:flex-col sm:items-end">
                                <button
                                    onClick={() => handleUpdate(id, tip)}
                                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}