import { motion } from "framer-motion";

export default function TrailerModal({ title, onClose }) {
  // Search YouTube for the trailer
  const query = encodeURIComponent(`${title} official trailer`);
  const src   = `https://www.youtube.com/embed?listType=search&list=${query}&autoplay=1`;

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
      >
        <button className="close-btn" onClick={onClose}>✕</button>
        <h3 className="trailer-title">🎞️ {title} — Trailer</h3>
        <div className="trailer-wrap">
          <iframe
            src={src}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            allowFullScreen
          />
        </div>
      </motion.div>
    </motion.div>
  );
}