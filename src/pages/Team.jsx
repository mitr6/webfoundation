import { motion } from "framer-motion";

export default function Team() {
  const members = [
    { name: "Andrei Popescu", role: "Arhitect Principal", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974" },
    { name: "Elena Radu", role: "Design Interior", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974" },
    { name: "Mihai Stoica", role: "Inginer Structurist", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974" }
  ];

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] min-h-screen pt-32 px-6 md:px-12">
      <header className="mb-32">
        <h1 className="text-[12vw] md:text-[9vw] font-light uppercase leading-[0.8] tracking-[-0.05em]">
          Oamenii <br /> <span className="italic font-serif lowercase opacity-30 ml-[5vw]">din spate</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1800px] mx-auto pb-40">
        {members.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="group cursor-none"
          >
            <div className="aspect-[3/4] overflow-hidden bg-[var(--card)] mb-6">
              <img src={m.img} className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-700" />
            </div>
            <h3 className="text-2xl uppercase tracking-tighter">{m.name}</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] opacity-40">{m.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}