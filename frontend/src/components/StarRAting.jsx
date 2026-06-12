import { useState } from "react";
import { motion } from "framer-motion";

export default function StarRating({ onRate, initialRating = 0 }) {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(initialRating);

  const handle = (val) => {
    setSelected(val);
    onRate?.(val);
  };

  return (
    <div className="star-rating">
      <p>Rate this movie:</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            className={`star ${star <= (hovered || selected) ? "active" : ""}`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => handle(star)}
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
          >
            ★
          </motion.button>
        ))}
      </div>
      {selected > 0 && (
        <motion.p
          className="rating-msg"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {["", "Poor 😕", "Fair 😐", "Good 👍", "Great 😊", "Amazing! 🔥"][selected]}
        </motion.p>
      )}
    </div>
  );
}