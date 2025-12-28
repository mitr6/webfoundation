import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] transition-colors duration-500">
      
      {/* SECTION 1: HERO - Tipografie Gigantă */}
      <section className="relative h-screen flex flex-col justify-end px-6 md:px-12 pb-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h1 className="text-[15vw] md:text-[12vw] font-light leading-[0.8] tracking-[-0.06em] uppercase">
            Pure <br />
            <span className="italic font-serif lowercase opacity-30 ml-[10vw]">Structure</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row justify-between items-end gap-8">
            <p className="max-w-xs text-xs uppercase tracking-[0.3em] opacity-50">
              Estetică minimalistă integrată în proiecte de inginerie avansată.
            </p>
            <Link to="/portfolio" className="group flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.5em]">Vezi Portofoliu</span>
              <div className="w-12 h-px bg-[var(--fg)] group-hover:w-20 transition-all duration-500"></div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: IMAGINE FULL-BLEED (Efect Parallax Subtil) */}
      <section className="h-[120vh] w-full overflow-hidden relative">
        <motion.img 
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
          className="w-full h-full object-cover grayscale brightness-50 dark:brightness-75"
          alt="Arhitectură"
        />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <h2 className="text-white text-3xl md:text-5xl font-serif italic max-w-2xl leading-tight">
            "Forma urmează funcția, dar ambele se supun esteticii."
          </h2>
        </div>
      </section>

      {/* SECTION 3: EDITORIAL GRID (Text & Image) */}
      <section className="py-40 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <span className="text-[10px] uppercase tracking-[0.5em] opacity-40">Filozofia Noastră</span>
            <h3 className="text-5xl md:text-7xl uppercase tracking-tighter leading-none">
              Materiale brute. <br /> Detalii fine.
            </h3>
            <p className="text-lg opacity-60 max-w-md leading-relaxed">
              Fiecare proiect Foundation este un studiu despre echilibru. Folosim betonul, oțelul și lumina pentru a crea spații care respiră.
            </p>
            <Link to="/contact" className="inline-block border border-current px-10 py-4 text-[10px] uppercase tracking-[0.4em] hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-all">
              Contactează un Arhitect
            </Link>
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1965" 
              className="w-full h-full object-cover grayscale"
              alt="Design"
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: BIG CTA */}
      <section className="py-60 text-center border-t border-black/5 dark:border-white/5">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <h4 className="text-[15vw] md:text-[10vw] uppercase leading-none tracking-tighter opacity-10">Contact</h4>
          <Link to="/contact" className="text-4xl md:text-7xl uppercase tracking-tighter hover:italic transition-all inline-block">
            Să începem proiectul tău →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}