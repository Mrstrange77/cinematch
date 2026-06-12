import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMovieDetail, getSuggestions } from "../services/tmdb";
import MovieCard from "./MovieCard";
import StarRating from "./StarRating";
import TrailerModal from "./TrailerModal";

export default function MovieModal({ movie, onClose, onMovieClick }) {
  const [details,      setDetails]      = useState(null);
  const [suggestions,  setSuggestions]  = useState([]);
  const [showTrailer,  setShowTrailer]  = useState(false);
  const [userRating,   setUserRating]   = useState(0);
  const [ratingDone,   setRatingDone]   = useState(false);

  useEffect(() => {
    async function load() {
      const [det, sug] = await Promise.all([
        getMovieDetail(movie.id),
        getSuggestions(movie.title),
      ]);
      setDetails(det.data);
      setSuggestions(sug.data.results?.slice(0, 6) || []);
    }
    load();
  }, [movie.id]);

  const handleRate = (val) => {
    setUserRating(val);
    setRatingDone(true);
    setTimeout(() => setRatingDone(false), 3000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0, y: 60 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ duration: 0.45, ease: [0.34, 1.2, 0.64, 1] }}
        >
          {!details ? (
            <div style={{ padding: 60, textAlign: "center" }}>
              <motion.div
                className="loader-ring"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <>
              {details.backdrop_path && (
                <motion.img
                  className="modal-backdrop"
                  src={details.backdrop_path}
                  alt=""
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 0.65, scale: 1 }}
                  transition={{ duration: 0.6 }}
                />
              )}
              <button className="close-btn" onClick={onClose}>✕</button>

              <div className="modal-content">
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {details.title} <span>({details.release_date?.slice(0, 4)})</span>
                </motion.h2>

                <motion.div
                  className="genres-tags"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {details.genres?.map((g) => <span key={g.id}>{g.name}</span>)}
                </motion.div>

                <motion.p
                  className="rating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  ⭐ {details.vote_average > 0 ? details.vote_average.toFixed(1) : "N/A"} / 10
                  &nbsp;|&nbsp; {details.runtime}
                </motion.p>

                <motion.p
                  className="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {details.overview}
                </motion.p>

                {/* Trailer + Action buttons */}
                <motion.div
                  className="modal-actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <motion.button
                    className="trailer-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTrailer(true)}
                  >
                    🎞️ Watch Trailer
                  </motion.button>
                </motion.div>

                {/* Star Rating */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <StarRating onRate={handleRate} />
                  <AnimatePresence>
                    {ratingDone && (
                      <motion.p
                        className="rating-saved"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                      >
                        ✅ Rating saved! You gave it {userRating}/5 stars
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Similar movies */}
                {suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <h3>You Might Also Like</h3>
                    <div className="card-grid small">
                      {suggestions.map((m, i) => (
                        <MovieCard
                          key={m.id}
                          movie={m}
                          index={i}
                          onClick={(mv) => { onClose(); onMovieClick(mv); }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Trailer popup */}
      {showTrailer && (
        <TrailerModal
          title={details?.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </AnimatePresence>
  );
}