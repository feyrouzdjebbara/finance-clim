import { useEffect, useRef } from "react";

export default function CursorBubble() {
  const mainRef = useRef(null);   // bulle principale
  const smallRef = useRef(null);  // petit losange jaune

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;

    let mainX = 0;
    let mainY = 0;

    let smallX = 0;
    let smallY = 0;

    const mainSpeed = 0.1;   // vitesse bulle principale
    const smallSpeed = 0.05; // retard pour le losange jaune

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      // Bulle principale
      mainX += (mouseX - mainX) * mainSpeed;
      mainY += (mouseY - mainY) * mainSpeed;

      // Petit losange jaune
      smallX += (mainX - smallX) * smallSpeed;
      smallY += (mainY - smallY) * smallSpeed;

      if (mainRef.current) {
        mainRef.current.style.transform = `translate(${mainX}px, ${mainY}px)`;
      }
      if (smallRef.current) {
        smallRef.current.style.transform = `translate(${smallX}px, ${smallY}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Bulle principale zellige */}
      <div
        ref={mainRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="absolute w-8 h-8 rounded-full bg-emerald-500/30 blur-xl animate-pulse" />
          <div className="absolute w-4 h-4 rotate-45 bg-emerald-700 shadow-md" />
          <div className="absolute w-4 h-4 rotate-45 bg-teal-400 opacity-80 translate-x-0.5 translate-y-0.5" />
        </div>
      </div>

      {/* Petit losange jaune */}
      <div
        ref={smallRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 rotate-45 bg-yellow-400" />
        </div>
      </div>
    </>
  );
}