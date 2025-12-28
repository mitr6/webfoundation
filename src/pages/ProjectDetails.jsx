import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function getProject() {
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();

      if (!data) {
          setProject({
              title: "Project Alpha",
              description: "A comprehensive study on modern minimalism and structural integrity in urban environments.",
              year: "2024",
              location: "Kyoto, Japan",
              category: "Residential",
              cover_url: "https://images.unsplash.com/photo-1486325212027-8081e485255e"
          });
      } else {
          setProject(data);
      }
    }
    getProject();
  }, [id]);

  if (!project) return <div className="h-screen flex items-center justify-center uppercase tracking-widest opacity-50">Loading Data...</div>;

  return (
    <main className="bg-[var(--bg)] min-h-screen">

      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-[60vh] md:h-[80vh] w-full overflow-hidden relative"
      >
        <img src={project.cover_url} className="w-full h-full object-cover grayscale brightness-75" alt={project.title} />
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full bg-gradient-to-t from-black/80 to-transparent">
          <h1 className="text-white text-[10vw] md:text-[6vw] uppercase leading-none tracking-tighter">{project.title}</h1>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="grid md:grid-cols-12 gap-12">

           <div className="md:col-span-4 space-y-8 sticky top-32 h-fit">
              <div className="border-t border-[var(--fg)]/20 pt-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-1">Location</span>
                  <span className="text-xl">{project.location || "Unknown"}</span>
              </div>
              <div className="border-t border-[var(--fg)]/20 pt-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-1">Year</span>
                  <span className="text-xl">{project.year}</span>
              </div>
              <div className="border-t border-[var(--fg)]/20 pt-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-1">Category</span>
                  <span className="text-xl">{project.category}</span>
              </div>
           </div>

           <div className="md:col-span-8">
              <h3 className="text-3xl md:text-5xl font-light leading-tight mb-12">{project.description}</h3>
              <p className="text-lg opacity-60 leading-relaxed mb-12">
                The concept revolves around the interaction between light and heavy materials. We utilized exposed concrete to ground the structure, while massive glazing allows the environment to permeate the interior.
              </p>
              
              <div className="grid grid-cols-1 gap-8">
                 <div className="bg-[var(--card)] aspect-video rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                 </div>
                 <div className="bg-[var(--card)] aspect-video rounded-xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"/>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="border-t border-[var(--fg)]/10 py-24 text-center">
        <Link to="/portfolio" className="text-xl uppercase tracking-widest hover:text-[var(--accent)] transition-colors">← Back to Portfolio</Link>
      </div>
    </main>
  );
}