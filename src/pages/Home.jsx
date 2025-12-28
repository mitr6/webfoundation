import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const MagneticButton = ({ children, to }) => {
  return (
    <Link to={to} className="relative inline-block group">
      <div className="absolute inset-0 bg-[var(--accent)] rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
      <button className="relative px-10 py-5 border border-[var(--fg)] rounded-full text-xs uppercase tracking-[0.3em] bg-[var(--bg)] overflow-hidden transition-colors hover:text-[var(--bg)] hover:border-[var(--accent)]">
        <span className="relative z-10 group-hover:mix-blend-difference">{children}</span>
        <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
      </button>
    </Link>
  );
};

const Marquee = () => (
  <div className="w-full py-12 overflow-hidden border-y border-[var(--fg)]/10 bg-[var(--card)]">
    <motion.div 
      animate={{ x: [0, -1000] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      className="flex whitespace-nowrap gap-24 items-center"
    >
      {[...Array(4)].map((_, i) => (
        <h2 key={i} className="text-[8vw] uppercase leading-none font-bold text-transparent text-stroke opacity-30">
          Strategy — Design — Build —
        </h2>
      ))}
    </motion.div>
  </div>
);

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="bg-[var(--bg)] text-[var(--fg)] overflow-hidden">
      
      <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pb-20 pt-32">
        <div className="max-w-[1920px] mx-auto w-full">
          {["Pure", "Structure", "Vision"].map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={`text-[13vw] md:text-[11vw] uppercase leading-[0.85] tracking-tighter ${i === 1 ? 'ml-[10vw] italic font-serif opacity-50' : 'font-bold'}`}
              >
                {word}
              </motion.h1>
            </div>
          ))}
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1 }}
            className="mt-24 flex flex-col md:flex-row justify-between items-end gap-8 border-t border-[var(--fg)]/20 pt-8"
          >
            <p className="max-w-xs text-xs uppercase tracking-[0.2em] opacity-60 leading-relaxed">
              We design spaces that obey the laws of physics but challenge the laws of expectation.
            </p>
            <MagneticButton to="/portfolio">Explore Works</MagneticButton>
          </motion.div>
        </div>
      </section>

      <section className="h-[100vh] w-full overflow-hidden relative flex items-center justify-center">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
            className="w-full h-full object-cover grayscale brightness-75 contrast-125"
            alt="Architecture"
          />
        </motion.div>
        <div className="relative z-10 text-center mix-blend-overlay px-4">
          <h2 className="text-white text-4xl md:text-7xl font-serif italic max-w-4xl leading-tight">
            "Form follows function, <br/> aesthetics follows precision."
          </h2>
        </div>
      </section>

      <Marquee />

      <section className="py-40 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <span className="inline-block px-3 py-1 border border-[var(--fg)] rounded-full text-[10px] uppercase tracking-widest">Our Philosophy</span>
            <h3 className="text-5xl md:text-8xl uppercase tracking-tighter leading-[0.9]">
              Raw <span className="text-[var(--accent)]">Data</span>. <br /> Fine <span className="italic font-serif font-normal">Details</span>.
            </h3>
            <p className="text-xl opacity-60 max-w-md leading-relaxed">
              Every Foundation project is a study in equilibrium. We use concrete, steel, and light to create spaces that breathe.
            </p>
            <div className="h-px w-full bg-[var(--fg)]/20" />
            <div className="grid grid-cols-2 gap-8">
               <div>
                 <h4 className="text-3xl font-bold">150+</h4>
                 <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Projects Built</p>
               </div>
               <div>
                 <h4 className="text-3xl font-bold">12</h4>
                 <p className="text-xs uppercase tracking-widest opacity-50 mt-2">Design Awards</p>
               </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-[var(--accent)] translate-x-4 translate-y-4 rounded-xl -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
            <div className="aspect-[3/4] overflow-hidden rounded-xl border border-[var(--fg)]/10">
              <img 
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1965" 
                className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-1000"
                alt="Design"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: BIG CTA */}
      <section className="py-40 md:py-60 text-center border-t border-[var(--fg)]/10 bg-[var(--card)]">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-12 px-4"
        >
          <h4 className="text-[12vw] md:text-[10vw] uppercase leading-none tracking-tighter opacity-10 select-none">Contact</h4>
          <Link to="/contact" className="relative inline-block group">
            <span className="text-5xl md:text-8xl uppercase tracking-tighter group-hover:text-[var(--accent)] transition-colors duration-500">
              Start a Project
            </span>
            <span className="block h-1 w-0 bg-[var(--accent)] mt-4 group-hover:w-full transition-all duration-700 mx-auto"></span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}