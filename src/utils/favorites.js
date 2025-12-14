const STORAGE_KEY = "favorite_movies";

// Get all favorites
export const getFavorites = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Check if movie is favorite
export const isFavorite = (movieId) => {
  return getFavorites().some((m) => m.id === movieId);
};

// Toggle favorite
export const toggleFavorite = (movie) => {
  const favorites = getFavorites();
  const exists = favorites.find((m) => m.id === movie.id);

  let updated;
  if (exists) {
    updated = favorites.filter((m) => m.id !== movie.id);
  } else {
    updated = [...favorites, movie];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
