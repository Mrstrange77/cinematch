import { useEffect, useState } from "react";
import api from "../services/api";
import { IMG_BASE } from "../services/tmdb";

export default function Watchlist() {
  const [list, setList] = useState([]);

  useEffect(() => { api.get("/user/watchlist").then((r) => setList(r.data)); }, []);

  const remove = async (id) => {
    await api.delete(`/user/watchlist/${id}`);
    setList(list.filter((m) => m.movieId !== id));
  };

  return (
    <div className="page">
      <h1 className="section-title">🎯 My Watchlist</h1>
      {list.length === 0 && <p className="muted-text">Nothing in your watchlist. Click 🎯 on any movie!</p>}
      <div className="card-grid">
        {list.map((m) => (
          <div key={m.movieId} className="movie-card">
            <img src={m.poster ? `${IMG_BASE}${m.poster}` : "https://placehold.co/200x300/1c1c26/888?text=No+Image"} alt={m.title} />
            <div className="movie-info">
              <h3>{m.title}</h3>
              <span className="rating">⭐ {m.rating?.toFixed(1)}</span>
              <p>{m.year}</p>
              <button className="remove-btn" onClick={() => remove(m.movieId)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}