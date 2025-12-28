import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function Blog() {
  const [filter, setFilter] = useState("All");

  const posts = [
    { id: 1, title: "Future of Concrete", category: "Materials", date: "Dec 28, 2024", img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742" },
    { id: 2, title: "Light as Structure", category: "Design", date: "Nov 15, 2024", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab" },
    { id: 3, title: "Sustainable Cities", category: "Urbanism", date: "Oct 10, 2024", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e" },
    { id: 4, title: "The Void Concept", category: "Design", date: "Sep 22, 2024", img: "https://images.unsplash.com/photo-1497366216548-37526070297c" },
    { id: 5, title: "Brutalist Revival", category: "Materials", date: "Aug 05, 2024", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb" },
  ];

  const categories = ["All", "Design", "Materials", "Urbanism", "Tech"];
  
  const filteredPosts = useMemo(() => 
    filter === "All" ? posts : posts.filter(p => p.category === filter), 
    [filter, posts]
  );

  return (
    <PageTransition>
      <div className="bg-[var(--bg)] text-[var(--fg)] min-h-screen pt-40 px-6 md:px-12 pb-20">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <h1 className="text-[10vw] leading-[0.8] tracking-tighter uppercase">
            Foundation <br/> 
            <span className="text-[var(--accent)] serif italic opacity-80">Journal</span>
          </h1>
          
          {/* CATEGORY PILLS */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full border text-xs uppercase tracking-widest transition-all duration-300 ${
                  filter === cat 
                  ? "bg-[var(--fg)] text-[var(--bg)] border-[var(--fg)]" 
                  : "border-[var(--fg)]/20 hover:border-[var(--fg)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/blog/${post.id}`} className="group block">

                  <div className="overflow-hidden mb-6 aspect-[16/9] relative">
                    <div className="absolute inset-0 bg-[var(--accent)]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                      src={post.img} 
                      alt={post.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>

                  <div className="flex justify-between items-start border-t border-[var(--fg)]/20 pt-4">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest opacity-50 mb-2 block">{post.category} — {post.date}</span>
                      <h2 className="text-3xl md:text-4xl uppercase font-light leading-tight group-hover:ml-4 transition-all duration-300">
                        {post.title}
                      </h2>
                    </div>
                    <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </PageTransition>
  );
}