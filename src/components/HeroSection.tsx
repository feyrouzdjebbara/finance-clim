import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FloatingImages from "./FloatImages";

const TypeWriterText = () => {
  const fullText = "Finance Climatique & Crédits Carbone";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index === fullText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const beforeHighlight = displayedText.includes("Crédits Carbone")
    ? displayedText.split("Crédits Carbone")[0]
    : displayedText;
  const isHighlightVisible = displayedText.includes("Crédits Carbone");

  return (
    <span>
      {beforeHighlight}
      {isHighlightVisible && (
        <span className="text-zellige-yellow">Crédits Carbone</span>
      )}
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zellige-dark">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background.png')" }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start px-8 max-w-7xl w-full gap-16">
        {/* Left Text */}
        <div className="w-full lg:w-1/2 text-left pl-8">
          <motion.h1
            className="text-4xl md:text-4xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TypeWriterText />
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-primary-foreground/70 font-body mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Workshop international sur les mécanismes de financement climatique et
            les marchés de crédits carbone en Algérie
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zellige-green/30 bg-zellige-green/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-zellige-green animate-pulse" />
              <span className="text-zellige-green text-sm font-body font-medium">
                24 – 25 Juin 2026 • CIC Alger
              </span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Use hash-only to avoid 404 on static hosting */}
            <a
              href="#inscription"
              className="px-8 py-4 rounded-lg font-body font-semibold text-accent-foreground transition-all hover:scale-105"
              style={{ background: "var(--gradient-accent)" }}
            >
              S'inscrire au Workshop
            </a>
            <a
              href="#programme"
              className="px-8 py-4 rounded-lg font-body font-semibold border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Voir le Programme
            </a>
          </motion.div>
        </div>

        {/* Right Floating Images */}
        <div className="w-full lg:w-1/2 text-left pl-8">
          <div className="hidden lg:block">
            <FloatingImages />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;