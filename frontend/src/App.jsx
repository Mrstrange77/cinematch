import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import Navbar        from "./components/Navbar";
import AuthModal     from "./components/AuthModal";
import SplashScreen  from "./components/SplashScreen";
import PageTransition from "./components/PageTransition";
import Home          from "./pages/Home";
import Favourites    from "./pages/Favourites";
import Watchlist     from "./pages/Watchlist";
import History       from "./pages/History";
import "./App.css";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
        <Route path="/favourites" element={<PageTransition><Favourites /></PageTransition>} />
        <Route path="/watchlist"  element={<PageTransition><Watchlist /></PageTransition>} />
        <Route path="/history"    element={<PageTransition><History /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [showAuth,   setShowAuth]   = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar onAuthClick={() => setShowAuth(true)} />
        <div className="app">
          <AnimatedRoutes />
        </div>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </BrowserRouter>
    </AuthProvider>
  );
}