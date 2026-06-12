import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState("");
  const submit = (e) => { e.preventDefault(); if (q.trim()) onSearch(q); };

  return (
    <form className="search-bar" onSubmit={submit}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for a movie..." />
      <button type="submit">🔍 Search</button>
    </form>
  );
}