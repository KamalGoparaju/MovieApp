import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY, language: "en-US" },
  });

export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query, page, language: "en-US" },
  });

// ➕ ADD THESE
export const getMovieDetails = (movieId) =>
  axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, language: "en-US" },
  });

export const getMovieVideos = (movieId) =>
  axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
    params: { api_key: API_KEY, language: "en-US" },
  });

// 🔥 Popular movies
export const getPopularMovies = (page = 1) =>
  axios.get(`${BASE_URL}/movie/popular`, {
    params: {
      api_key: API_KEY,
      language: "en-US",
      page,
    },
  });
// 🎬 Discover movies by genre
export const discoverByGenre = (genreId, page = 1) =>
  axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
      page,
      language: "en-US",
    },
  });