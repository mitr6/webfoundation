import { motion } from "framer-motion";

export default function Team() {
  const members = [
    { name: "Andrei Popescu", role: "Principal Architect", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" },
    { name: "Elena Radu", role: "Interior Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" },
    { name: "Mihai Stoica", role: "Structural Engineer", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974" },
    { name: "Ana Voinea", role: "Sustainability", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964" }
  ];

  return (
    <div className="bg-[var(--bg)] min-h-screen pt-40 px-6 md:px-12 pb-20">
      <header className="mb-40 border-b border-[var(--fg)]/10 pb-12">
        <h1 className="text-[12vw] md:text-[9vw] font-light uppercase leading-[0.8] tracking-[-0.05em]">
          The Minds <br /> <span className="italic font-serif lowercase opacity-30 ml-[5vw] text-[var(--accent)]">Constructing</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 max-w-[1920px] mx-auto">
        {members.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="group"
          >
            <div className="aspect-[3/4] overflow-hidden mb-6 relative">
              <motion.img 
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                src={m.img} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
            </div>
            
            <div className="flex justify-between items-baseline border-t border-[var(--fg)]/20 pt-4">
              <h3 className="text-xl uppercase tracking-tighter">{m.name}</h3>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mt-1">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}