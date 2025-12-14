import { memo } from "react";
import MovieSkeleton from "./MovieSkeleton";

const MovieSkeletonGrid = memo(function MovieSkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <MovieSkeleton key={i} />
      ))}
    </div>
  );
});

export default MovieSkeletonGrid;
