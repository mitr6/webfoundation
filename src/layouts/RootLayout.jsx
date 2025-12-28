import { useEffect, useState, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const mouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-[var(--accent)] rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      animate={{ x: mousePosition.x - 8, y: mousePosition.y - 8 }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    />
  );
};

const MobileMenu = ({ isOpen, setIsOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        className="fixed inset-0 bg-[var(--fg)] text-[var(--bg)] z-50 flex flex-col justify-center items-center gap-8"
      >
        <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-sm uppercase tracking-widest">Close</button>
        {["Home", "Portfolio", "Team", "Blog", "Contact"].map((item) => (
          <Link 
            key={item} 
            to={item === "Home" ? "/" : `/${item.toLowerCase()}`} 
            onClick={() => setIsOpen(false)}
            className="text-6xl font-light uppercase tracking-tighter hover:italic transition-all"
          >
            {item}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);

export default function RootLayout() {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useEffect(() => {
    const root = window.document.documentElement;
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => window.scrollTo(0, 0), [location]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500 font-sans antialiased selection:bg-[var(--accent)] selection:text-white">
      <CustomCursor />
      <div className="noise-overlay" />
      <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <motion.nav 
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-40 h-24 flex items-center px-6 md:px-12 backdrop-blur-sm bg-[var(--bg)]/80 border-b border-[var(--fg)]/5"
      >
        <div className="w-full max-w-[1920px] mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase relative group overflow-hidden">
            Foundation <span className="italic font-serif font-normal text-[var(--accent)]">.</span>
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--fg)] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"/>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {["Portfolio", "Team", "Blog"].map((link) => (
              <Link key={link} to={`/${link.toLowerCase()}`} className="text-xs uppercase tracking-[0.2em] font-medium hover:text-[var(--accent)] transition-colors relative group">
                {link}
                <span className="absolute -bottom-2 left-1/2 w-1 h-1 bg-[var(--accent)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-1/2"></span>
              </Link>
            ))}
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-5 bg-[var(--fg)] rounded-full relative px-1 flex items-center transition-all"
            >
              <motion.div 
                layout 
                className="w-3 h-3 bg-[var(--bg)] rounded-full"
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{ justifySelf: isDark ? "flex-end" : "flex-start", marginLeft: isDark ? "auto" : "0" }}
              />
            </button>

            <Link to="/contact" className="px-6 py-2 border border-[var(--fg)] rounded-full text-xs uppercase tracking-widest hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-300">
              Start Project
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(true)} className="md:hidden space-y-2 group">
            <div className="w-8 h-[2px] bg-[var(--fg)] group-hover:w-6 transition-all ml-auto"></div>
            <div className="w-8 h-[2px] bg-[var(--fg)]"></div>
          </button>
        </div>
      </motion.nav>

      <main className="pt-24 min-h-screen relative z-10">
        <Outlet />
      </main>

      <footer className="py-12 px-6 md:px-12 border-t border-[var(--fg)]/10 text-[var(--fg)]/40 text-[10px] uppercase tracking-widest flex justify-between max-w-[1920px] mx-auto">
        <span>Foundation © {new Date().getFullYear()}</span>
        <span>Bucharest — Berlin — London</span>
      </footer>
    </div>
  );
}