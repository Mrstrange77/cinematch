const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware — parse JSON bodies and allow cross-origin requests
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://cinematch-jbgl.vercel.app",
  ],
  credentials: true
}));
app.use(express.json());

// Routes — each handles a different part of the app
app.use("/api/auth",   require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/user",   require("./routes/user"));

// Connect to MongoDB, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB connection failed:", err));