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
      // Fallback data if DB is empty for demo purposes
      if (!data || data.length === 0) {
        setProjects([
           { id: 1, title: "Apex Tower", category: "Commercial", year: "2024", cover_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e" },
           { id: 2, title: "Brutalist Home", category: "Residential", year: "2023", cover_url: "https://images.unsplash.com/photo-1493329025335-18542a61595f" },
           { id: 3, title: "Neon Factory", category: "Industrial", year: "2023", cover_url: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c" },
           { id: 4, title: "Void Museum", category: "Infrastructure", year: "2022", cover_url: "https://images.unsplash.com/photo-1516934024742-b461fba47600" }
        ]);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const filtered = useMemo(() => 
    filter === "All" ? projects : projects.filter(p => p.category === filter), 
    [filter, projects]
  );

  return (
    <main className="max-w-[1920px] mx-auto px-6 md:px-12 py-32 bg-[var(--bg)] min-h-screen">
      
      {/* HEADER */}
      <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-[12vw] md:text-[8vw] font-light leading-[0.8] tracking-[-0.05em] uppercase">
            Selected <br />
            <span className="italic font-serif lowercase opacity-40 ml-[5vw] text-[var(--accent)]">Works</span>
          </h1>
        </motion.div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 md:gap-8 pb-4">
          {["All", "Industrial", "Residential", "Commercial", "Infrastructure"].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              className={`text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-full border transition-all duration-300 ${
                filter === cat 
                  ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]" 
                  : "border-transparent opacity-50 hover:opacity-100 hover:border-[var(--fg)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* LOADING STATE */}
      {loading ? (
        <div className="flex justify-center py-40">
           <div className="w-12 h-12 border-2 border-[var(--fg)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        /* GRID */
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-24">
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div 
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`lg:col-span-6 group cursor-pointer ${i % 2 !== 0 ? "lg:translate-y-24" : ""}`}
              >
                <Link to={`/portfolio/${p.id}`} className="block">
                  <div className="relative overflow-hidden aspect-[16/12] mb-6 rounded-lg bg-[var(--card)]">
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      src={p.cover_url} 
                      alt={p.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-[var(--bg)]/80 backdrop-blur text-[10px] px-3 py-1 rounded uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.year}
                    </div>
                  </div>
                  
                  <div className="border-t border-[var(--fg)]/20 pt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-3xl uppercase font-medium tracking-tight group-hover:text-[var(--accent)] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-widest opacity-50 mt-1">{p.category}</p>
                    </div>
                    <div className="w-10 h-10 border border-[var(--fg)]/20 rounded-full flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-transparent group-hover:text-white transition-all duration-300">
                      ↗
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* FOOTER */}
      <div className="mt-64 flex justify-center">
        <Link to="/contact" className="text-sm uppercase tracking-[0.4em] border-b border-transparent hover:border-[var(--fg)] pb-1 transition-all">
           Archive View (2018-2024)
        </Link>
      </div>
    </main>
  );
}