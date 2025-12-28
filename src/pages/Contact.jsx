import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  const InputField = ({ label, name, type = "text", isTextArea = false }) => (
    <div className="relative border-b border-[var(--fg)]/20 py-4 transition-all duration-500 hover:border-[var(--fg)] group">
      <label 
        className={`absolute left-0 transition-all duration-300 pointer-events-none uppercase text-xs tracking-widest z-10 ${
          focused === name || form[name] 
            ? "top-0 opacity-50 text-[var(--accent)] text-[10px]" 
            : "top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-60" 
        }`}
      >
        {label}
      </label>

      {isTextArea ? (
        <textarea
          name={name}
          rows="1"
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent pt-6 pb-2 outline-none text-xl md:text-2xl resize-none min-h-[60px]" 
        />
      ) : (
        <input
          type={type}
          name={name}
          value={form[name]}
          onChange={(e) => setForm({ ...form, [name]: e.target.value })}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          className="w-full bg-transparent pt-6 pb-2 outline-none text-xl md:text-2xl"
        />
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-[var(--bg)] pt-32 md:pt-40 px-6 md:px-12 pb-20 transition-colors duration-500">
      <div className="max-w-[1920px] mx-auto grid lg:grid-cols-2 gap-16 lg:gap-32">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1 }}
        >
          <h1 className="text-[12vw] lg:text-[7vw] uppercase leading-[0.95] tracking-tighter mb-12 lg:mb-24">
            Let's start <br/>
            <span className="opacity-30 italic serif text-[var(--accent)]">talking.</span>
          </h1>

          <div className="space-y-10 text-sm uppercase tracking-widest opacity-60">
            <div>
              <p className="font-bold mb-2 opacity-100">Studio</p>
              <p>Bucharest, Sector 1<br/>Calea Victoriei 100</p>
            </div>
            <div>
              <p className="font-bold mb-2 opacity-100">Contact</p>
              <a href="mailto:hello@foundation.ro" className="hover:text-[var(--accent)] transition-colors">hello@foundation.ro</a>
              <p>+40 700 000 000</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:mt-12 relative">
            <AnimatePresence mode="wait">
                {!isSubmitted ? (
                    <motion.form 
                        key="form"
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <InputField label="What's your name?" name="name" />
                        <InputField label="Your email address" name="email" type="email" />
                        <InputField label="Tell us about your project" name="message" isTextArea />

                        <div className="pt-8">
                            <button 
                                type="submit"
                                className="group relative px-10 py-5 rounded-full border border-[var(--fg)] overflow-hidden w-full md:w-auto"
                            >
                                <div className="absolute inset-0 bg-[var(--fg)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                                <span className="relative z-10 text-xs uppercase tracking-[0.3em] group-hover:text-[var(--bg)] transition-colors duration-500">
                                Send Enquiry
                                </span>
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col justify-center items-center text-center space-y-6 bg-[var(--card)] rounded-3xl p-12 min-h-[400px]"
                    >
                        <h3 className="text-4xl md:text-6xl uppercase tracking-tighter">Message <br/> Sent</h3>
                        <p className="opacity-50 max-w-xs mx-auto">Thank you. We will review your enquiry and get back to you shortly.</p>
                        <button 
                            onClick={() => setIsSubmitted(false)}
                            className="text-xs uppercase tracking-widest border-b border-current pb-1 hover:text-[var(--accent)] transition-colors"
                        >
                            Send another
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </main>
  );
}