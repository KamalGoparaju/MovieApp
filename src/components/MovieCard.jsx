import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isFavorite, toggleFavorite } from "../utils/favorites";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = memo(function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(isFavorite(movie.id));

  const handleFavorite = useCallback(
    (e) => {
      e.stopPropagation();
      toggleFavorite(movie);
      setFavorite((prev) => !prev);
    },
    [movie]
  );

  return (
    <div
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="relative bg-slate-800 rounded-lg overflow-hidden
      hover:scale-105 hover:shadow-2xl
      transition-all duration-300 ease-out cursor-pointer"
    >
      <button onClick={handleFavorite} className="absolute top-2 right-2 text-xl">
        {favorite ? "❤️" : "🤍"}
      </button>

      <img
        src={
          movie.poster_path
            ? IMAGE_BASE_URL + movie.poster_path
            : "https://via.placeholder.com/500x750?text=No+Image"
        }
        alt={movie.title}
        loading="lazy"   // 🔥 LAZY LOAD IMAGE
        className="w-full h-[360px] object-cover"
      />

      <div className="p-3">
        <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
        <div className="flex justify-between items-center mt-2 text-xs text-gray-400">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>{movie.release_date}</span>
        </div>
      </div>
    </div>
  );
});

export default MovieCard;
