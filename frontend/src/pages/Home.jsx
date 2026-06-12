import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar      from "../components/SearchBar";
import MovieCard      from "../components/MovieCard";
import MovieModal     from "../components/MovieModal";
import GenreSection   from "../components/GenreSection";
import HeroBanner     from "../components/HeroBanner";
import TrendingSection from "../components/TrendingSection";
import { searchMovies } from "../services/tmdb";

const GENRES = [
  { id: "horror",    name: "Horror",    emoji: "👻" },
  { id: "comedy",    name: "Comedy",    emoji: "😂" },
  { id: "sci-fi",    name: "Sci-Fi",    emoji: "🚀" },
  { id: "action",    name: "Action",    emoji: "💥" },
  { id: "romance",   name: "Romance",   emoji: "💕" },
  { id: "animated",  name: "Animation", emoji: "🎨" },
  { id: "drama",     name: "Drama",     emoji: "🎭" },
  { id: "thriller",  name: "Thriller",  emoji: "😱" },
  { id: "crime",     name: "Crime",     emoji: "🔫" },
  { id: "adventure", name: "Adventure", emoji: "🗺️" },
];

export default function Home() {
  const [results,  setResults]  = useState([]);
  const [selected, setSelected] = useState(null);
  const [searched, setSearched] = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSearch = async (q) => {
    setError(""); setLoading(true);
    try {
      const res = await searchMovies(q);
      setResults(res.data.results || []);
      setSearched(true);
      if (!res.data.results?.length) setError("No movies found. Try another title!");
    } catch {
      setError("Something went wrong. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Banner — only show when not searching */}
      {!searched && <HeroBanner onMovieClick={setSelected} />}

      {/* Search bar floats below hero */}
      <div className="search-section">
        <SearchBar onSearch={handleSearch} />
      </div>

      <main>
        {error && <p className="error">{error}</p>}

        {/* Search results */}
        <AnimatePresence>
          {searched && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-header">
                <h2 className="section-title">🔍 Search Results</h2>
                <button className="back-btn-small" onClick={() => { setSearched(false); setResults([]); }}>
                  ← Back
                </button>
              </div>
              {loading ? (
                <div className="card-grid">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="skeleton-card">
                      <div className="skeleton-poster" />
                      <div className="skeleton-info">
                        <div className="skeleton-line long" />
                        <div className="skeleton-line short" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card-grid">
                  {results.map((m, i) => (
                    <MovieCard key={m.id} movie={m} index={i} onClick={setSelected} />
                  ))}
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>

        {/* Browse mode */}
        {!searched && (
          <>
            <TrendingSection onMovieClick={setSelected} />
            {GENRES.map((g) => (
              <GenreSection key={g.id} genre={g} onMovieClick={setSelected} />
            ))}
          </>
        )}
      </main>

      {selected && (
        <MovieModal
          movie={selected}
          onClose={() => setSelected(null)}
          onMovieClick={setSelected}
        />
      )}
    </div>
  );
}