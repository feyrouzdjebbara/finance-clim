import { useEffect, useState, useRef } from "react";

type MarkerType = "risk" | "renewable" | "dam";

const wilayaNames: Record<string, string> = {
  "01": "Adrar",
  "02": "Chlef",
  "03": "Laghouat",
  "08": "Bechar",
  "10": "Bouira",
  "15": "Tizi Ouzou",
  "16": "Alger",
  "37": "Tindouf",
  "43": "Guelma",
  "06": "Bejaia",
};

interface MapMarkerData {
  id: string;
  type: MarkerType;
  title: string;
  desc: string;
  wilayaId: string;
}

interface MyMapProps {
  filter: MarkerType | "all";
  selected: string | null;
  onSelect: (id: string) => void;
}

// MARKERS
const mapMarkers: MapMarkerData[] = [
  { id: "r1", type: "risk", title: "Inondations Alger", desc: "Zone à risque", wilayaId: "16" },
  { id: "r2", type: "risk", title: "Sécheresse Alger", desc: "Risque élevé", wilayaId: "16" },

  { id: "e2", type: "renewable", title: "Éoliennes Adrar", desc: "Projet éolien", wilayaId: "01" },
  { id: "e3", type: "renewable", title: "Éoliennes Tindouf", desc: "Projet éolien", wilayaId: "37" },
  { id: "e4", type: "renewable", title: "Solaire Béchar", desc: "Projet solaire", wilayaId: "08" },
  { id: "e5", type: "renewable", title: "Solaire Laghouat", desc: "Projet solaire", wilayaId: "03" },

  { id: "d2", type: "dam", title: "Beni Haroun", desc: "Grand barrage", wilayaId: "43" },
  { id: "d5", type: "dam", title: "Ighil Emda", desc: "Hydroélectricité", wilayaId: "06" },
  { id: "d6", type: "dam", title: "Koudiat Acerdoune", desc: "Barrage", wilayaId: "10" },
  { id: "d9", type: "dam", title: "Taksebt", desc: "Hydro réseau", wilayaId: "15" },
];

const markerColors: Record<MarkerType, string> = {
  risk: "#FF4D4F",
  renewable: "#FFD700",
  dam: "#1890FF",
};

export default function MyMap({ filter, selected, onSelect }: MyMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);
const [ready, setReady] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ZOOM STATE
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

 const filtered =
  filter === "all"
    ? mapMarkers
    : mapMarkers.filter((m) => m.type === filter);

  // LOAD SVG
 useEffect(() => {
  fetch("/images/map-algeria-69-wilayas.svg")
    .then((res) => res.text())
    .then((svg) => {
      if (mapRef.current) {
        mapRef.current.innerHTML = svg;
        setReady(true); // ✅ IMPORTANT
      }
    });
}, []);

  // CLICK + HOVER
  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const el = e.target as SVGElement;
      if (el.tagName !== "path") return;

      const id = el.id;
      const markers = filtered.filter((m) => m.wilayaId === id);
      if (!markers.length) return;

      onSelect(markers[0].id);
    };

    const handleMove = (e: MouseEvent) => {
      const el = e.target as SVGElement;
      if (el.tagName !== "path") return;

      const id = el.id;
      const markers = filtered.filter((m) => m.wilayaId === id);
      if (!markers.length) return;

      setHovered(id);
      el.style.opacity = "0.7";
    };

    const handleLeave = (e: MouseEvent) => {
      const el = e.target as SVGElement;
      if (el.tagName === "path") el.style.opacity = "1";
      setHovered(null);
    };

    container.addEventListener("click", handleClick);
    container.addEventListener("mouseover", handleMove);
    container.addEventListener("mouseout", handleLeave);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("mouseover", handleMove);
      container.removeEventListener("mouseout", handleLeave);
    };
  }, [filtered, onSelect]);

  // COLORING
useEffect(() => {
  if (!ready) return; // ❗ WAIT FOR SVG

  const container = mapRef.current;
  if (!container) return;

  const paths = container.querySelectorAll<SVGPathElement>("path");

  paths.forEach((p) => {
    const id = p.id;
    if (!id) return;

    const markers = mapMarkers.filter((m) => m.wilayaId === id);

    // RESET BASE STYLE ALWAYS
    p.style.opacity = "1";
    p.style.cursor = "pointer";

    const active =
      filter === "all"
        ? markers
        : markers.filter((m) => m.type === filter);

    if (!active.length) {
      p.style.fill = "#E5E7EB";
      return;
    }

    const type = active[0].type;
    p.style.fill = markerColors[type];
  });
}, [filter, ready]);

  // ZOOM WHEEL
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    setScale((prev) => {
      let next = prev - e.deltaY * 0.001;
      next = Math.min(Math.max(next, 0.6), 4);
      return next;
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] overflow-hidden bg-black/5"
      onWheel={handleWheel}
    >
      {/* CONTROLS */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          className="bg-white px-2 py-1 rounded"
          onClick={() => setScale((s) => Math.min(s + 0.2, 4))}
        >
          +
        </button>
        <button
          className="bg-white px-2 py-1 rounded"
          onClick={() => setScale((s) => Math.max(s - 0.2, 0.6))}
        >
          -
        </button>
      </div>

      {/* POPUP */}
      {hovered && (
        <div className="absolute top-4 left-4 bg-black text-white p-3 rounded-lg z-10">
          <div className="font-bold">
            {wilayaNames[hovered] ?? `Wilaya ${hovered}`}
          </div>

          <div className="text-xs mt-2">
            {filtered
              .filter((m) => m.wilayaId === hovered)
              .map((m) => (
                <div key={m.id}>• {m.title}</div>
              ))}
          </div>
        </div>
      )}

      {/* SVG WRAPPER (ZOOM ENGINE) */}
      <div
        style={{
          transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          transformOrigin: "center",
          transition: "transform 0.1s ease-out",
          width: "100%",
          height: "100%",
        }}
      >
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
}