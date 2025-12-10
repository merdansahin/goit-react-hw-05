import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  params: {
    language: "en-US",
  },
});

// Resim yolunu oluşturma yardımcı fonksiyonu
export const createImageUrl = (path) =>
  path
    ? `${IMG_BASE_URL}${path}`
    : "https://via.placeholder.com/250x375?text=No+Image";

// 1. Trend Olan Filmler (HomePage için)
export async function getTrendingMovies() {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
}

// 2. Film Arama (MoviesPage için)
export async function searchMovies(query) {
  const response = await instance.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
}

// 3. Film Detayları (MovieDetailsPage için)
export async function getMovieDetails(movieId) {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
}

// 4. Oyuncu Kadrosu (MovieCast için)
export async function getMovieCast(movieId) {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
}

// 5. İncelemeler (MovieReviews için)
export async function getMovieReviews(movieId) {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
}
