import { useEffect, useState } from "react";
import { getTrendingMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import MovieSkeletonGrid from "../components/MovieSkeletonGrid";


export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrendingMovies()
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error("Failed to fetch movies", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">🔥 Trending Movies</h1>
      <MovieSkeletonGrid />
    </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">
        🔥 Trending Movies
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
