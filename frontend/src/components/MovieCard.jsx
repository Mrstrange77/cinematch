import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import api from "../services/api";

export default function MovieCard({ movie, onClick, index = 0 }) {
  const { user } = useAuth();
  const [favMsg,   setFavMsg]   = useState("");
  const [watchMsg, setWatchMsg] = useState("");

  const poster = movie.poster_path
    ? movie.poster_path
    : "https://placehold.co/200x300/1c1c26/888?text=No+Image";

  const movieData = {
    movieId: movie.id,
    title:   movie.title,
    poster:  movie.poster_path,
    rating:  movie.vote_average,
    year:    movie.release_date?.slice(0, 4),
  };

  const addFav = async (e) => {
    e.stopPropagation();
    try {
      await api.post("/user/favourites", movieData);
      setFavMsg("❤️ Added!");
      setTimeout(() => setFavMsg(""), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Error";
      setFavMsg(msg === "Already in favourites" ? "✅ Already saved" : "❌ " + msg);
      setTimeout(() => setFavMsg(""), 2000);
    }
  };

  const addWatch = async (e) => {
    e.stopPropagation();
    try {
      await api.post("/user/watchlist", movieData);
      setWatchMsg("🎯 Added!");
      setTimeout(() => setWatchMsg(""), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || "Error";
      setWatchMsg(msg === "Already in watchlist" ? "✅ Already saved" : "❌ " + msg);
      setTimeout(() => setWatchMsg(""), 2000);
    }
  };

  return (
    <motion.div
      className="movie-card"
      onClick={() => onClick(movie)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.img
        src={poster}
        alt={movie.title}
        style={{ width: "100%", aspectRatio: "2/3", objectFit: "cover", display: "block" }}
      />

      {user && (
        <div className="card-actions">
          <div className="action-wrap">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title="Add to Favourites"
              onClick={addFav}
            >❤️</motion.button>
            {favMsg && <span className="action-msg">{favMsg}</span>}
          </div>
          <div className="action-wrap">
            <motion.button
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              title="Add to Watchlist"
              onClick={addWatch}
            >🎯</motion.button>
            {watchMsg && <span className="action-msg">{watchMsg}</span>}
          </div>
        </div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <span className="rating">⭐ {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "N/A"}</span>
        <p>{movie.release_date?.slice(0, 4)}</p>
      </div>
    </motion.div>
  );
}