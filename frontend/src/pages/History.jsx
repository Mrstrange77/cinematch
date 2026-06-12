import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => { api.get("/user/history").then((r) => setHistory(r.data)); }, []);

  const clear = async () => {
    await api.delete("/user/history");
    setHistory([]);
  };

  return (
    <div className="page">
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <h1 className="section-title" style={{ margin: 0 }}>🕐 Search History</h1>
        {history.length > 0 && <button className="remove-btn" onClick={clear}>Clear All</button>}
      </div>
      {history.length === 0 && <p className="muted-text">No search history yet.</p>}
      <ul className="history-list">
        {history.map((h, i) => (
          <li key={i}>
            <span>🔍 {h.query}</span>
            <span className="muted-text">{new Date(h.searchedAt).toLocaleDateString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}