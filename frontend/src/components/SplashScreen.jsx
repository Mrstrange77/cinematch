import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ onComplete }) {
  const [phase, setPhase] = useState(1); // 1=icon, 2=text, 3=tagline, 4=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 800);
    const t2 = setTimeout(() => setPhase(3), 1600);
    const t3 = setTimeout(() => setPhase(4), 2800);
    const t4 = setTimeout(() => onComplete(), 3600);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {phase !== 5 && (
        <motion.div
          className="splash"
          animate={phase === 4 ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Particle dots in background */}
          <div className="splash-particles">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -200, x: Math.random() * 100 - 50 }}
                transition={{ duration: 3, delay: Math.random() * 2, repeat: Infinity }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              />
            ))}
          </div>

          {/* Film reel icon coming in from top like Apple */}
          <motion.div
            className="splash-icon"
            initial={{ y: -200, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }} // spring bounce
          >
            🎬
          </motion.div>

          {/* Title letters animate in one by one */}
          {phase >= 2 && (
            <div className="splash-title">
              {"CINEFIND".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: "backOut" }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          )}

          {/* Tagline fades up */}
          {phase >= 3 && (
            <motion.p
              className="splash-tagline"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Discover movies you'll love
            </motion.p>
          )}

          {/* Loading bar */}
          {phase >= 3 && (
            <motion.div className="splash-bar-wrap">
              <motion.div
                className="splash-bar"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}