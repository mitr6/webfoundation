import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aici se poate adăuga integrarea reală cu un serviciu de mail sau Supabase
    setTimeout(() => setSubmitted(true), 800);
  };

  if (submitted) {
    return (
      <main className="min-h-[70svh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-5xl font-light mb-4 text-[var(--fg)]">Mulțumim!</h2>
        <p className="opacity-70 text-lg text-[var(--fg)] max-w-md">
          Mesajul tău a fost recepționat. Te vom contacta în cel mai scurt timp.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-10 px-8 py-3 rounded-full border border-[var(--fg)] opacity-60 hover:opacity-100 transition text-[var(--fg)]"
        >
          Trimite alt mesaj
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-10 py-24 text-[var(--fg)]">
      <div className="grid lg:grid-cols-2 gap-20">
        <div>
          <h1 className="text-6xl font-light mb-8 tracking-tighter leading-tight">
            Să construim <br/>împreună.
          </h1>
          <p className="opacity-60 text-xl max-w-md leading-relaxed mb-12">
            Ai un proiect în minte? Completează formularul sau contactează-ne direct pentru o consultanță gratuită.
          </p>
          
          <div className="space-y-8">
            <div>
              <h4 className="text-xs uppercase tracking-widest opacity-40 mb-2 font-bold">Email Direct</h4>
              <p className="text-xl">office@foundation-web.ro</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest opacity-40 mb-2 font-bold">Locație</h4>
              <p className="text-xl">București, România</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-[var(--card)] p-8 md:p-12 rounded-[2.5rem] shadow-sm">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm opacity-60 ml-1">Nume</label>
              <input
                name="name"
                required
                className="w-full px-5 py-4 rounded-2xl bg-[var(--bg)] border border-transparent focus:border-[var(--accent)] outline-none transition"
                placeholder="Ex: Popescu Ion"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm opacity-60 ml-1">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-5 py-4 rounded-2xl bg-[var(--bg)] border border-transparent focus:border-[var(--accent)] outline-none transition"
                placeholder="ion@exemplu.ro"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm opacity-60 ml-1">Mesaj</label>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full px-5 py-4 rounded-2xl bg-[var(--bg)] border border-transparent focus:border-[var(--accent)] outline-none resize-none transition"
              placeholder="Spune-ne detalii despre proiectul tău..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-5 rounded-2xl font-semibold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Trimite Mesajul
          </button>
        </form>
      </div>
    </main>
  );
}