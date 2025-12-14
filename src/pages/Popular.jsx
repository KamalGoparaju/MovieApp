import { useEffect, useRef, useState } from "react";
import { getPopularMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import MovieSkeletonGrid from "../components/MovieSkeletonGrid";
import { useCallback } from "react";


export default function Popular() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  // Fetch movies
  const fetchMovies = useCallback(async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    const res = await getPopularMovies(page);
    const newMovies = res.data.results;

    setMovies((prev) => {
      const map = new Map();
      prev.forEach((m) => map.set(m.id, m));
      newMovies.forEach((m) => map.set(m.id, m));
      return Array.from(map.values());
    });

    setHasMore(res.data.page < res.data.total_pages);
    setPage((prev) => prev + 1);

    console.log("Loaded page:", res.data.page);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, [page, loading, hasMore]);



  // Initial load
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, []);

  // Intersection Observer
  useEffect(() => {
  if (!loaderRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        fetchMovies();
      }
    },
    {
      rootMargin: "300px", // 🔥 trigger early
    }
  );

  observer.observe(loaderRef.current);

  return () => observer.disconnect();
}, [fetchMovies]);

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6">⭐ Popular Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <div className="mt-6">
          <MovieSkeletonGrid count={6} />
        </div>
      )}

      {/* Sentinel */}
      <div ref={loaderRef} className="h-10" />

      {!hasMore && (
        <p className="text-center text-gray-400 mt-6">
          🎉 You’ve reached the end
        </p>
      )}
    </div>
  );
}
