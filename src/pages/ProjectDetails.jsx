// src/pages/ProjectDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function getProject() {
      const { data } = await supabase.from("projects").select("*").eq("id", id).single();
      if (data) setProject(data);
    }
    getProject();
  }, [id]);

  if (!project) return <div className="py-40 text-center uppercase tracking-widest opacity-30">Se încarcă...</div>;

  return (
    <main className="max-w-7xl mx-auto px-6 py-32 text-[var(--fg)]">
      <img src={project.cover_url} className="w-full aspect-video object-cover grayscale hover:grayscale-0 transition-all duration-1000 mb-12" />
      <h1 className="text-[8vw] uppercase leading-none tracking-tighter mb-8">{project.title}</h1>
      <div className="grid md:grid-cols-3 gap-12 border-t border-current pt-8">
        <div className="md:col-span-2 text-xl opacity-70">{project.description}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] space-y-4">
          <p><span className="opacity-40">An:</span> {project.year}</p>
          <p><span className="opacity-40">Locație:</span> {project.location}</p>
          <p><span className="opacity-40">Categorie:</span> {project.category}</p>
        </div>
      </div>
    </main>
  );
}