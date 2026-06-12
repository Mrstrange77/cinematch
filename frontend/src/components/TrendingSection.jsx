import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTrending } from "../services/tmdb";
import MovieCard from "./MovieCard";
import { SkeletonGrid } from "./SkeletonCard";

export default function TrendingSection({ onMovieClick }) {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTrending()
      .then((res) => setMovies(res.data.results || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="trending-section">
      <div className="section-header">
        <h2 className="genre-title">🔥 Trending Now</h2>
        <div className="trending-bar">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="bar-item"
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
      {loading ? <SkeletonGrid count={8} /> : (
        <div className="card-grid">
          {movies.map((m, i) => (
            <MovieCard key={m.id} movie={m} index={i} onClick={onMovieClick} />
          ))}
        </div>
      )}
    </section>
  );
}