import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onAuthClick }) {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Link to="/" className="nav-logo">🎬 CineFind</Link>
      <div className="nav-links">
        {user ? (
          <>
            <span className="nav-user">👤 {user.username}</span>
            <Link to="/favourites">❤️ Favourites</Link>
            <Link to="/watchlist">🎯 Watchlist</Link>
            <Link to="/history">🕐 History</Link>
            <motion.button
              className="nav-btn outline"
              onClick={logout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Logout
            </motion.button>
          </>
        ) : (
          <motion.button
            className="nav-btn"
            onClick={onAuthClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login / Register
          </motion.button>
        )}
      </div>
    </motion.nav>
  );
}