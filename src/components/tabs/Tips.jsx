import { useEffect, useState } from "react";
import instance from "../../utils/api";
// import "./Tips.scss"; // CSS for star animation

export default function Tips({setShowFavoritesTab}) {
    const [tips, setTips] = useState([]);
    const [userId, setUserId] = useState(null);
    const [rated, setRated] = useState({});
    const [favorites, setFavorites] = useState({});
    const [feedbackMessages, setFeedbackMessages] = useState({});
    const [favAnimations, setFavAnimations] = useState({});
    const [error, setError] = useState(null);
    const [favoriteMessages, setFavoriteMessages] = useState({});
    const piesOrder = ["physical", "intellectual", "emotional", "spiritual"];

    useEffect(() => {
        async function fetchTips() {
            try {
                const meRes = await instance.get("/me");
                const id = meRes.data.user.id;
                setUserId(id);

                const res = await instance.get("/reflection_tips");
                setTips(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load tips.");
            }
        }

        fetchTips();
    }, []);

    const sortedTips = [...tips].sort((a, b) => {
        return piesOrder.indexOf(a.category) - piesOrder.indexOf(b.category);
    });

    const handleHelpful = async (tipId, helpful) => {
        try {
            await instance.post(`/reflection_tips/${tipId}/rate`, { helpful });
            setRated((prev) => ({ ...prev, [tipId]: true }));
            setFeedbackMessages((prev) => ({ ...prev, [tipId]: "Thanks for the feedback!" }));

            setTimeout(() => {
                setFeedbackMessages((prev) => {
                    const updated = { ...prev };
                    delete updated[tipId];
                    return updated;
                });
            }, 2000);
        } catch (err) {
            console.error("Rating failed:", err);
        }
    };

    const toggleFavorite = async (tipId) => {
        try {
            const isNowFavorited = !favorites[tipId];

            await instance.post(`/reflection_tips/${tipId}/favorite`);

            setFavorites((prev) => ({ ...prev, [tipId]: isNowFavorited }));

            setFavoriteMessages((prev) => ({
                ...prev,
                [tipId]: isNowFavorited ? '✨ Saved to favs!' : '❌ Removed from favs!',
            }));

            setTimeout(() => {
                setFavoriteMessages((prev) => {
                    const updated = { ...prev };
                    delete updated[tipId];
                    return updated;
                });
            }, 2000);
        } catch (err) {
            console.error('Favorite toggle failed:', err);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Personalized Tips</h2>

            {error && <p className="text-red-400">{error}</p>}

            {sortedTips.length === 0 ? (
                <p className="text-gray-400">No tips yet — submit more PIES Check-Ins to see suggestions!</p>
            ) : (
                    sortedTips.map((tip) => (
                        <div
                            key={tip.id}
                            className="border border-gray-600 rounded p-4 bg-gray-800 text-white space-y-2"
                        >
                            <p className="text-xs uppercase text-gray-400 tracking-wide">
                                {tip.category}
                            </p>
                            <p>{tip.tip}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-300 relative">
                                {!rated[tip.id] ? (
                                    <>
                                        <button
                                            onClick={() => handleHelpful(tip.id, true)}
                                            className="hover:text-green-400 px-2 py-1 rounded"
                                        >
                                            👍
                                        </button>
                                        <button
                                            onClick={() => handleHelpful(tip.id, false)}
                                            className="hover:text-red-400 px-2 py-1 rounded"
                                        >
                                            👎
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-green-300">{feedbackMessages[tip.id]}</span>
                                )}

                                {/* Favorite Button */}
                                <button
                                    onClick={() => toggleFavorite(tip.id)}
                                    className="ml-auto px-2 py-1"
                                >
                                    <span
                                        className={`text-lg transition-transform ${favorites[tip.id] ? "text-yellow-400" : "text-white"
                                            }`}
                                    >
                                        {favorites[tip.id] ? "★" : "☆"}
                                    </span>
                                </button>
                            </div>

                            {/* Favorite Message Feedback */}
                            {favoriteMessages[tip.id] && (
                                <p className="text-yellow-300 text-xs">{favoriteMessages[tip.id]}</p>
                            )}
                        </div>
                    ))
                    
            )}
        </div>
    );
}