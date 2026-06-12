const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    favourites: [
      {
        movieId: String,  // ← changed from Number to String
        title:   String,
        poster:  String,
        rating:  Number,
        year:    String,
      },
    ],
    watchlist: [
      {
        movieId: String,  // ← changed from Number to String
        title:   String,
        poster:  String,
        rating:  Number,
        year:    String,
      },
    ],
    searchHistory: [
      {
        query:      String,
        searchedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);