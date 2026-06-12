import api from "./api";

// OMDB returns full poster URLs directly, no base needed
export const IMG_BASE = "";

export const searchMovies     = (q)  => api.get(`/movies/search?q=${encodeURIComponent(q)}`);
export const getSuggestions   = (q)  => api.get(`/movies/suggestions?q=${encodeURIComponent(q)}`);
export const getMoviesByGenre = (g)  => api.get(`/movies/genre/${encodeURIComponent(g)}`);
export const getMovieDetail   = (id) => api.get(`/movies/detail/${id}`);
export const getTrending = () => api.get("/movies/trending");