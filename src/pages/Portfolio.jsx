import { useEffect, useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filtered = useMemo(() => 
    filter === "All" ? projects : projects.filter(p => p.category === filter), 
    [filter, projects]
  );

  if (loading) return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
      <motion.div 
        animate={{ opacity: [0.2, 1, 0.2] }} 
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-[10px] uppercase tracking-[0.5em] opacity-50"
      >
        Se încarcă arhiva...
      </motion.div>
    </div>
  );

  return (
    <main className="max-w-[1800px] mx-auto px-6 md:px-12 py-32 text-[var(--fg)] bg-[var(--bg)]">
      {/* HEADER EDITORIAL */}
      <header className="mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[12vw] md:text-[9vw] font-light leading-[0.8] tracking-[-0.05em] uppercase mb-16">
            Proiecte <br />
            <span className="italic font-serif lowercase opacity-40 ml-[5vw]">relevante</span>
          </h1>
        </motion.div>

        {/* FILTRE MINIMALISTE */}
        <div className="flex flex-wrap gap-x-12 gap-y-4 border-b border-[var(--fg)] border-opacity-10 pb-8">
          {["All", "Industrial", "Residential", "Commercial", "Infrastructure"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`text-[10px] uppercase tracking-[0.3em] transition-all relative ${
                filter === cat ? "opacity-100" : "opacity-30 hover:opacity-100"
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div layoutId="underline" className="absolute -bottom-[33px] left-0 right-0 h-[2px] bg-[var(--fg)]" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* GRID ASIMETRIC / EDITORIAL */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-64 gap-x-12">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div 
              key={p.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`md:col-span-6 ${i % 2 !== 0 ? "md:mt-32" : ""}`}
            >
              <Link to={`/portfolio/${p.id}`} className="group block">
                <div className="relative overflow-hidden bg-[var(--card)] aspect-[16/10] mb-8">
                  <img 
                    src={p.cover_url || "https://picsum.photos/1200/800"} 
                    alt={p.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] cubic-bezier(0.16, 1, 0.3, 1)"
                  />
                  {/* Overlay subtil la hover */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="max-w-[70%]">
                    <span className="text-[10px] uppercase tracking-widest opacity-40 block mb-2">{p.category}</span>
                    <h3 className="text-3xl md:text-4xl uppercase font-light leading-tight tracking-tighter group-hover:italic transition-all">
                      {p.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono opacity-40">{p.year}</span>
                    <div className="mt-4 overflow-hidden">
                      <motion.div 
                        className="text-[10px] uppercase tracking-[0.2em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      >
                        Vezi Proiectul →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* FOOTER PAGINA */}
      <section className="mt-64 py-32 border-t border-[var(--fg)] border-opacity-10 text-center">
        <h2 className="text-4xl uppercase tracking-tighter mb-12 opacity-30">Următorul tău spațiu începe aici.</h2>
        <Link to="/contact" className="text-xs uppercase tracking-[0.5em] border border-[var(--fg)] px-12 py-5 hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all duration-500">
          Contactează-ne
        </Link>
      </section>
    </main>
  );
}