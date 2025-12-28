import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function RootLayout() {
  const [isDark, setIsDark] = useState(localStorage.getItem("theme") === "dark");
  const location = useLocation();

  // Logica pentru aplicarea temei (Light/Dark)
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  // Resetăm scroll-ul la 0 (sus) de fiecare dată când schimbăm pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500 font-sans antialiased">
      
      {/* NAVIGAȚIE EDITORIALĂ */}
      <nav className="fixed top-0 w-full z-[100] h-20 flex items-center px-6 md:px-12 bg-[var(--bg)] bg-opacity-80 backdrop-blur-md border-b border-black/5 dark:border-white/5">
        <div className="w-full max-w-[1800px] mx-auto flex justify-between items-center">
          
          {/* LOGO */}
          <Link to="/" className="text-sm font-bold tracking-tighter uppercase group">
            Foundation <span className="opacity-30 group-hover:opacity-100 transition-opacity italic">Studio</span>
          </Link>

          {/* MENU LINKS */}
          <div className="flex items-center gap-8 md:gap-12">
            <div className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.3em] font-medium">
              <Link to="/portfolio" className="hover:opacity-40 transition-all duration-300">Portofoliu</Link>
              <Link to="/team" className="hover:opacity-40 transition-all duration-300">Echipă</Link>
              <Link to="/blog" className="hover:opacity-40 transition-all duration-300">Jurnal</Link>
              <Link to="/contact" className="hover:opacity-40 transition-all duration-300">Contact</Link>
            </div>

            {/* DARK MODE SWITCHER */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-5 py-2 border border-current hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-500 rounded-full"
            >
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </nav>

      {/* RENDER PAGINI (Home, Portfolio, etc.) */}
      <main className="pt-20">
        <Outlet />
      </main>

      {/* FOOTER MINIMALIST */}
      <footer className="py-24 px-6 md:px-12 border-t border-black/5 dark:border-white/5 bg-[var(--bg)]">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.5em] opacity-30">
            Foundation Studio © {new Date().getFullYear()}
          </div>
          
          <div className="flex gap-8 text-[9px] uppercase tracking-[0.2em] opacity-50">
            <a href="#" className="hover:opacity-100 transition">Instagram</a>
            <a href="#" className="hover:opacity-100 transition">LinkedIn</a>
            <a href="#" className="hover:opacity-100 transition">Behance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}