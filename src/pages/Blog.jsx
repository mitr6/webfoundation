import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    { id: 1, title: "Viitorul Arhitecturii Sustenabile", date: "Dec 2024", cat: "Inovație" },
    { id: 2, title: "Lumina ca Material de Construcție", date: "Nov 2024", cat: "Design" },
    { id: 3, title: "Betonul Brut în Rezidențial", date: "Oct 2024", cat: "Tehnic" }
  ];

  return (
    <div className="bg-[var(--bg)] text-[var(--fg)] min-h-screen pt-32 px-6 md:px-12">
      <h1 className="text-[12vw] md:text-[9vw] font-light uppercase leading-[0.8] tracking-[-0.05em] mb-32">
        Jurnal <br /> <span className="italic font-serif lowercase opacity-30 ml-[5vw]">de idei</span>
      </h1>

      <div className="max-w-5xl mx-auto pb-40">
        {posts.map((post, i) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="group border-b border-black/10 dark:border-white/10 py-12 flex flex-col md:flex-row justify-between items-baseline gap-4 hover:px-4 transition-all"
          >
            <span className="text-[10px] font-mono opacity-30">{post.date}</span>
            <Link to={`/blog/${post.id}`} className="text-3xl md:text-5xl uppercase tracking-tighter group-hover:italic transition-all">
              {post.title}
            </Link>
            <span className="text-[10px] uppercase tracking-widest opacity-40">{post.cat}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}