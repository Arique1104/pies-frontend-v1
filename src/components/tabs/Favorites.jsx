import { useEffect, useState } from 'react';
import instance from '../../utils/api';

export default function Favorites() {
    const [favoriteTips, setFavoriteTips] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const res = await instance.get('/reflection_tips/favorites');
                setFavoriteTips(res.data);
            } catch (err) {
                console.error('Failed to load favorites', err);
                setError('Could not fetch your favorite tips.');
            }
        }

        fetchFavorites();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">⭐ Your Favorite Tips</h2>

            {error && <p className="text-red-400">{error}</p>}

            {favoriteTips.length === 0 ? (
                <p className="text-gray-400">No saved tips yet</p>
            ) : (
                favoriteTips.map((tip) => (
                    <div
                        key={tip.id}
                        className="border border-gray-600 rounded p-4 bg-gray-800 text-white space-y-2"
                    >
                        <p className="text-xs uppercase text-gray-400 tracking-wide">
                            {tip.category}
                        </p>
                        <p>{tip.tip}</p>
                    </div>
                ))
            )}
        </div>
    );
}