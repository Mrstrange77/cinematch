import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { searchMovies } from "../services/tmdb";
import api from "../services/api";

const FEATURED = ["Inception", "Interstellar", "The Dark Knight", "Avengers", "Dune"];

export default function HeroBanner({ onMovieClick }) {
  const [movies,  setMovies]  = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const results = [];
      for (const title of FEATURED) {
        try {
          const res = await searchMovies(title);
          const top = res.data.results?.[0];
          if (top) {
            // get full details for overview
            const det = await api.get(`/movies/detail/${top.id}`);
            results.push({ ...top, overview: det.data.overview, genres: det.data.genres });
          }
        } catch {}
      }
      setMovies(results);
      setLoading(false);
    }
    load();
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % movies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [movies]);

  if (loading) return <div className="hero-skeleton" />;
  if (movies.length === 0) return null;

  const movie = movies[current];

  return (
    <div className="hero-banner">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="hero-bg"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{ backgroundImage: `url(${movie.poster_path})` }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="hero-overlay" />

      <div className="hero-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">🔥 Featured</div>
            <h2 className="hero-movie-title">{movie.title}</h2>
            <p className="hero-year">{movie.release_date?.slice(0, 4)}</p>
            {movie.overview && (
              <p className="hero-overview">
                {movie.overview.slice(0, 150)}{movie.overview.length > 150 ? "..." : ""}
              </p>
            )}
            <div className="hero-btns">
              <motion.button
                className="hero-btn primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onMovieClick(movie)}
              >
                ▶ View Details
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots navigation */}
        <div className="hero-dots">
          {movies.map((_, i) => (
            <motion.button
              key={i}
              className={`hero-dot ${i === current ? "active" : ""}`}
              onClick={() => setCurrent(i)}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}