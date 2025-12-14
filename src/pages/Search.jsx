import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import MovieSkeletonGrid from "../components/MovieSkeletonGrid";
import { GENRE_MAP } from "../utils/genres";
import { searchMovies, discoverByGenre } from "../api/tmdb";

export default function Search() {
  const { query } = useParams();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  

  const loaderRef = useRef(null);

  // 🔁 Reset when query changes
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [query]);

  // Fetch movies
  const fetchMovies = async () => {
  if (loading || !hasMore) return;

  setLoading(true);
  try {
    const normalizedQuery = query.toLowerCase().trim();

    // 1️⃣ Always search by movie title
    const searchPromise = searchMovies(query, page);

    // 2️⃣ If query matches genre, also fetch genre movies
    const genreId = GENRE_MAP[normalizedQuery];
    const genrePromise = genreId
      ? discoverByGenre(genreId, page)
      : null;

    // 3️⃣ Run API calls in parallel
    const responses = await Promise.all(
      genrePromise ? [searchPromise, genrePromise] : [searchPromise]
    );

    // 4️⃣ Merge results
    const mergedResults = responses.flatMap(
      (res) => res.data.results
    );

    // 5️⃣ Deduplicate by movie ID
    setMovies((prev) => {
      const map = new Map();
      prev.forEach((m) => map.set(m.id, m));
      mergedResults.forEach((m) => map.set(m.id, m));
      return Array.from(map.values());
    });

    // 6️⃣ Pagination (safe logic)
    const totalPages = Math.max(
      ...responses.map((res) => res.data.total_pages)
    );

    setHasMore(page < totalPages);
    setPage((prev) => prev + 1);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  // Initial fetch
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [query]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMovies();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loaderRef.current]); // eslint-disable-line

  return (
    <div className="px-6 py-8">
      <h2 className="text-xl font-semibold mb-6">
        Search results for:{" "}
        <span className="text-red-400">{query}</span>
      </h2>

      {movies.length === 0 && loading ? (
        <MovieSkeletonGrid />
      ) : movies.length === 0 ? (
        <p className="text-gray-400">No movies found.</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {loading && (
            <div className="mt-6">
              <MovieSkeletonGrid count={6} />
            </div>
          )}

          {/* Sentinel */}
          <div ref={loaderRef} className="h-10" />

          {!hasMore && (
            <p className="text-center text-gray-400 mt-6">
              🎉 End of results
            </p>
          )}
        </>
      )}
    </div>
  );
}
