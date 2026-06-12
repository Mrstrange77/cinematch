import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { getMoviesByGenre } from "../services/tmdb";
import MovieCard from "./MovieCard";
import { SkeletonGrid } from "./SkeletonCard";

export default function GenreSection({ genre, onMovieClick }) {
  const [movies,  setMovies]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded,  setLoaded]  = useState(false);

  // Only load when section scrolls into view
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (!inView || loaded) return;
    setLoaded(true);
    getMoviesByGenre(genre.id)
      .then((res) => setMovies(res.data.results?.slice(0, 8) || []))
      .finally(() => setLoading(false));
  }, [inView]);

  return (
    <motion.section
      ref={ref}
      className="genre-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="section-header">
        <h2 className="genre-title">{genre.emoji} {genre.name}</h2>
        <span className="genre-count">{movies.length} movies</span>
      </div>
      {loading && inView ? <SkeletonGrid count={8} /> : (
        <div className="card-grid">
          {movies.map((m, i) => (
            <MovieCard key={m.id} movie={m} index={i} onClick={onMovieClick} />
          ))}
        </div>
      )}
    </motion.section>
  );
}