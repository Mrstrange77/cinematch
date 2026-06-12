import { motion } from "framer-motion";

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <motion.div
        className="skeleton-poster"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="skeleton-info">
        <motion.div className="skeleton-line long"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
        />
        <motion.div className="skeleton-line short"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="card-grid">
      {[...Array(count)].map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}