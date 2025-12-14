import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../api/tmdb";
import { isFavorite, toggleFavorite } from "../utils/favorites";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  // ❤️ Favorite handler
  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      if (!movie) return;
      toggleFavorite(movie);
      setFavorite((prev) => !prev);
    },
    [movie]
  );

  // Fetch movie details
  useEffect(() => {
    setLoading(true);
    Promise.all([getMovieDetails(id), getMovieVideos(id)])
      .then(([detailsRes, videosRes]) => {
        setMovie(detailsRes.data);

        const trailer = videosRes.data.results.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // Sync favorite state AFTER movie loads
  useEffect(() => {
    if (movie) {
      setFavorite(isFavorite(movie.id));
    }
  }, [movie]);

  if (loading) {
    return (
      <div className="flex justify-center mt-10 text-gray-400">
        Loading details...
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 relative">
        {/* ❤️ Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 text-2xl"
        >
          {favorite ? "❤️" : "🤍"}
        </button>

        <img
          src={
            movie.poster_path
              ? IMAGE_BASE_URL + movie.poster_path
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="w-full md:w-80 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>

          <p className="mb-2">
            ⭐ <span className="font-semibold">{movie.vote_average}</span>
          </p>
          <p className="mb-2">📅 {movie.release_date}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {movie.genres?.map((g) => (
              <span
                key={g.id}
                className="text-xs bg-slate-700 px-2 py-1 rounded"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {trailerKey && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">🎥 Trailer</h2>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="Trailer"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
