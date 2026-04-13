import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  AlertTriangle,
  Sun,
  Droplets,
  Wind,
  CloudRain,
  ThermometerSun,
  Mountain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import MyMap from "@/components/MyMapDZ";

// =====================
// TYPES
// =====================
type MarkerType = "risk" | "renewable" | "dam";

interface MapMarker {
  id: string;
  type: MarkerType;
  title: string;
  desc: string;
}

// =====================
// DATA
// =====================
const mapMarkers: MapMarker[] = [
  {
    id: "r1",
    type: "risk",
    title: "Inondations - Alger",
    desc: "Zones urbaines vulnérables aux fortes pluies",
  },
  {
    id: "r2",
    type: "risk",
    title: "Sécheresse - Nord",
    desc: "Haute risque de sécheresse",
  },
  {
    id: "r3",
    type: "risk",
    title: "Canicule - Sud",
    desc: "Températures extrêmes",
  },

  {
    id: "e2",
    type: "renewable",
    title: "Éoliennes - Adrar",
    desc: "Projet énergie éolienne",
  },
  {
    id: "e3",
    type: "renewable",
    title: "Éoliennes - Tindouf",
    desc: "Projet énergie éolienne",
  },
  {
    id: "e4",
    type: "renewable",
    title: "Solaire - Béchar",
    desc: "Projet énergie solaire",
  },
  {
    id: "e5",
    type: "renewable",
    title: "Solaire - Laghouat",
    desc: "Projet énergie solaire",
  },

  {
    id: "d2",
    type: "dam",
    title: "Beni Haroun",
    desc: "Plus grand barrage d'Algérie",
  },
  { id: "d5", type: "dam", title: "Ighil Emda", desc: "Hydroélectricité" },
  {
    id: "d6",
    type: "dam",
    title: "Koudiat Acerdoune",
    desc: "Barrage stratégique",
  },
  { id: "d9", type: "dam", title: "Taksebt", desc: "Hydro réseau" },
];

// =====================
// ICONS
// =====================
const markerIcons: Record<string, LucideIcon> = {
  r1: CloudRain,
  r2: ThermometerSun,
  r3: ThermometerSun,
  e2: Wind,
  e3: Wind,
  e4: Sun,
  e5: Sun,
  d2: Droplets,
  d5: Droplets,
  d6: Droplets,
  d9: Droplets,
};
// =====================
// COLORS
// =====================
const markerColors: Record<MarkerType, string> = {
  risk: "#FF4D4F",
  renewable: "#FFD700",
  dam: "#1890FF",
};
const filterLabels: Record<MarkerType | "all", string> = {
  all: "Tout afficher",
  risk: "Zones à risque climatique",
  renewable: "Projets d'énergie renouvelable",
  dam: "Barrages & infrastructure hydraulique",
};
const typeLabels: Record<MarkerType, string> = {
  risk: "Zones à risque climatique",
  renewable: "Projets d'énergie renouvelable",
  dam: "Barrages & infrastructure hydraulique",
};
// =====================
// MAIN PAGE
// =====================
const AlgeriaContext = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<MarkerType | "all">("all");

  const selectedMarker = mapMarkers.find((m) => m.id === selected);

  const SelectedIcon = selectedMarker
    ? markerIcons[selectedMarker.id] ?? MapPin
    : MapPin;
  useEffect(() => {
    setFilter("all");
    setSelected(null);
  }, []);
  return (
    <section className="py-20 px-4 bg-background font-sans">
      <div className="container max-w-6xl mx-auto">
        {/* TITLE */}
       
  <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
           Contexte <span className="text-primary">Algérien</span>
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "var(--gradient-zellige)" }}
          />
        </motion.div>
        {/* FILTERS */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg border ${
              filter === "all" ? "bg-black text-white" : ""
            }`}
          >
            Tout afficher
          </button>

          {(["risk", "renewable", "dam"] as MarkerType[]).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                filter === type ? "bg-black text-white" : ""
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: markerColors[type] }}
              />
              {filterLabels[type]}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* MAP */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl overflow-hidden border bg-zellige-dark">
              <MyMap
                filter={filter}
                selected={selected}
                onSelect={setSelected}
              />
            </div>

            <p className="text-xs text-center mt-2 text-muted-foreground">
              Carte interactive des enjeux climatiques, projets renouvelables et infrastructures hydrauliques
            </p>
          </div>

          {/* SIDE PANEL */}
          <div className="space-y-4">
            {/* SELECTED CARD */}
            {selectedMarker ? (
              <div className="p-5 border rounded-xl bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: markerColors[selectedMarker.type] }}
                  >
                    <SelectedIcon className="w-5 h-5 text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{selectedMarker.title}</h3>
                    <p className="text-xs opacity-70">
                      {typeLabels[selectedMarker.type]}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {selectedMarker.desc}
                </p>
              </div>
            ) : (
              <div className="p-5 border rounded-xl text-center">
  <MapPin className="mx-auto mb-2 opacity-50" />
  <p className="text-sm font-medium">Cliquez sur une wilaya</p>
  <p className="text-xs text-muted-foreground">
    pour afficher les informations
  </p>
</div>
            )}

            {/* STATS */}
            <div className="p-5 border rounded-xl space-y-2">
              <h3 className="font-sans font-semibold ">L'Algérie en chiffres</h3>

              {[
                { l: "Superficie", v: "2,38 M km²", i: Mountain },
                { l: "Wilayas", v: "58", i: MapPin },
                { l: "Ensoleillement", v: "2 650 h/an", i: Sun },
                { l: "Barrages", v: "80+", i: Droplets },
                { l: "Objectif renouvelable", v: "22 000 MW", i: Wind },
              ].map((s, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <s.i className="w-4 h-4" />
                    {s.l}
                  </div>
                  <span className="font-semibold">{s.v}</span>
                </div>
              ))}
            </div>

            {/* ALERT */}
            <div className="p-5 border rounded-xl bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-red-500 w-4 h-4" />
                <span className="font-semibold text-red-500">Risques Climatiques</span>
              </div>

              <ul className="text-sm space-y-1">
                <li>• Inondations dans le nord</li>
                <li>• Sécheresse prolongée</li>
                <li>• Désertification</li>
                <li>• Stress hydrique</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlgeriaContext;
