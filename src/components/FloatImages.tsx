import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = ["/images/image3.png"];

// éléments flottants
const floatingElements = Array.from({ length: 12 });

const FloatingImages = () => {
  const [current, setCurrent] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prev) => (prev + 1) % images.length);
  //   }, 4000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="w-full flex justify-center items-center relative overflow-hidden">

      {/* 🔵 Floating particles */}
      {floatingElements.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full  blur-xl"
          style={{
            width: Math.random() * 80 + 40,
            height: Math.random() * 80 + 40,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* 🟡 Glow circle derrière */}
      <div className="absolute w-[600px] h-[600px]  rounded-full blur-3xl z-0" />

      {/* 🖼 Image principale */}
      <AnimatePresence mode="wait">
        <motion.img
          key={images[current]}
          src={images[current]}
          alt="Finance Climatique et Crédits Carbone"
          className="w-[1700px] h-auto relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
    scale: 1,
    y: [-10, 10, -10], // keep floating effect
            // opacity: 1,
            // scale: 1,
            // y: [-10, 10, -10],
            // rotate: [0, 180, 180, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.4, 0.5],
            },
            scale: { duration: 0.5 },
            opacity: { duration: 0.4 },
          }}
        />
      </AnimatePresence>

      {/* 🔷 Petits carrés flottants style zellige */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={"square-" + i}
          className="absolute w-6 h-6 bg-zellige-green/30 rotate-45"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-15, 15, -15],
            rotate: [45, 90, 45],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingImages;