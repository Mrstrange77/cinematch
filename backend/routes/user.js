const router = require("express").Router();
const auth   = require("../middleware/auth");
const User   = require("../models/User");

router.use(auth);

// GET profile
router.get("/profile", async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

// ── FAVOURITES ──────────────────────────
router.post("/favourites", async (req, res) => {
  try {
    const movie = req.body;
    const user  = await User.findById(req.userId);
    const exists = user.favourites.find((m) => m.movieId === movie.movieId);
    if (exists) return res.status(400).json({ message: "Already in favourites" });
    user.favourites.push(movie);
    await user.save();
    res.json({ favourites: user.favourites });
  } catch (err) {
    console.error("Favourites error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/favourites/:movieId", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { favourites: { movieId: req.params.movieId } }, // ← no Number()
    });
    res.json({ message: "Removed from favourites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/favourites", async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("favourites");
    res.json(user.favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── WATCHLIST ────────────────────────────
router.post("/watchlist", async (req, res) => {
  try {
    const movie = req.body;
    const user  = await User.findById(req.userId);
    const exists = user.watchlist.find((m) => m.movieId === movie.movieId);
    if (exists) return res.status(400).json({ message: "Already in watchlist" });
    user.watchlist.push(movie);
    await user.save();
    res.json({ watchlist: user.watchlist });
  } catch (err) {
    console.error("Watchlist error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/watchlist/:movieId", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, {
      $pull: { watchlist: { movieId: req.params.movieId } }, // ← no Number()
    });
    res.json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/watchlist", async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("watchlist");
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── HISTORY ──────────────────────────────
router.get("/history", async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("searchHistory");
    res.json(user.searchHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/history", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.userId, { $set: { searchHistory: [] } });
    res.json({ message: "History cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;