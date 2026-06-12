import { useEffect, useState } from "react";
import api from "../services/api";
import { IMG_BASE } from "../services/tmdb";

export default function Favourites() {
  const [favs, setFavs] = useState([]);

  useEffect(() => { api.get("/user/favourites").then((r) => setFavs(r.data)); }, []);

  const remove = async (id) => {
    await api.delete(`/user/favourites/${id}`);
    setFavs(favs.filter((m) => m.movieId !== id));
  };

  return (
    <div className="page">
      <h1 className="section-title">❤️ My Favourites</h1>
      {favs.length === 0 && <p className="muted-text">No favourites yet. Click ❤️ on any movie!</p>}
      <div className="card-grid">
        {favs.map((m) => (
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