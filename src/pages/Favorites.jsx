import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import MovieCard from "../components/MovieCard";

export default function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getFavorites());
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">❤️ My Favorites</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
