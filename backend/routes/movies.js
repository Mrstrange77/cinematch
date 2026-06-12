const router = require("express").Router();
const axios  = require("axios");
const auth   = require("../middleware/auth");
const User   = require("../models/User");

const OMDB = axios.create({
  baseURL: "https://www.omdbapi.com",
  params:  { apikey: process.env.OMDB_API_KEY },
});

// GET /api/movies/search?q=inception
router.get("/search", async (req, res) => {
  const { q } = req.query;
  const token = req.headers.authorization?.split(" ")[1];

  const { data } = await OMDB.get("/", { params: { s: q, type: "movie" } });

  if (token) {
    try {
      const jwt = require("jsonwebtoken");
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      await User.findByIdAndUpdate(id, {
        $push: {
          searchHistory: {
            $each: [{ query: q }],
            $slice: -20,
            $position: 0,
          },
        },
      });
    } catch {}
  }

  // Normalize OMDB response to match our frontend format
  const results = data.Search?.map((m) => ({
    id:            m.imdbID,
    title:         m.Title,
    poster_path:   m.Poster !== "N/A" ? m.Poster : null,
    release_date:  m.Year,
    vote_average:  0,
    overview:      "",
  })) || [];

  res.json({ results });
});

// GET /api/movies/detail/:id  (uses IMDB ID like tt1234567)
router.get("/detail/:id", async (req, res) => {
  const { data } = await OMDB.get("/", {
    params: { i: req.params.id, plot: "full" },
  });

  res.json({
    id:           data.imdbID,
    title:        data.Title,
    overview:     data.Plot,
    release_date: data.Released,
    vote_average: parseFloat(data.imdbRating) || 0,
    runtime:      data.Runtime,
    genres:       data.Genre?.split(", ").map((g, i) => ({ id: i, name: g })) || [],
    backdrop_path: data.Poster !== "N/A" ? data.Poster : null,
    poster_path:   data.Poster !== "N/A" ? data.Poster : null,
  });
});

// GET /api/movies/suggestions?q=inception
router.get("/suggestions", async (req, res) => {
  const { q } = req.query;

  // Search the term, return results as suggestions
  const { data } = await OMDB.get("/", { params: { s: q, type: "movie" } });

  const results = data.Search?.map((m) => ({
    id:           m.imdbID,
    title:        m.Title,
    poster_path:  m.Poster !== "N/A" ? m.Poster : null,
    release_date: m.Year,
    vote_average: 0,
    overview:     "",
  })) || [];

  res.json({ basedOn: results[0] || null, results: results.slice(1) });
});

// GET /api/movies/genre/:genre  (genre is a name like "horror")
router.get("/genre/:genre", async (req, res) => {
  const { data } = await OMDB.get("/", {
    params: { s: req.params.genre, type: "movie", page: 1 },
  });

  const results = data.Search?.map((m) => ({
    id:           m.imdbID,
    title:        m.Title,
    poster_path:  m.Poster !== "N/A" ? m.Poster : null,
    release_date: m.Year,
    vote_average: 0,
    overview:     "",
  })) || [];

  res.json({ results });
});
// GET /api/movies/trending
router.get("/trending", async (req, res) => {
  try {
    const queries = ["avengers", "batman", "spider", "marvel", "fast furious"];
    const random  = queries[Math.floor(Math.random() * queries.length)];
    const { data } = await OMDB.get("/", {
      params: { s: random, type: "movie" },
    });
    const results = data.Search?.map((m) => ({
      id:           m.imdbID,
      title:        m.Title,
      poster_path:  m.Poster !== "N/A" ? m.Poster : null,
      release_date: m.Year,
      vote_average: 0,
      overview:     "",
    })) || [];
    res.json({ results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;