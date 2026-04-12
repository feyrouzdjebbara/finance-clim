import { motion } from "framer-motion";
import { useState } from "react";
import {
  MapPin,
  AlertTriangle,
  Sun,
  Droplets,
  Wind,
  ThermometerSun,
  CloudRain,
  Mountain,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import MyMap from "@/components/MyMapDZ"; 

// ✅ TYPES
type MarkerType = "risk" | "renewable" | "dam";

interface MapMarker {
  id: string;
  type: MarkerType;
  title: string;
  desc: string;
}

// ✅ MARKERS DATA (you were missing this)
// ✅ MARKERS DATA COMPLET
const mapMarkers: MapMarker[] = [
  // Risques climatiques
  { id: "r1", type: "risk", title: "Inondations - Alger", desc: "Zones urbaines vulnérables aux fortes pluies" },
  { id: "r2", type: "risk", title: "Sécheresse - Nord", desc: "Haute risque de sécheresse" },
  { id: "r3", type: "risk", title: "Canicule - Sud", desc: "Températures extrêmes et stress thermique" },

  // Projets éoliens
  { id: "e2", type: "renewable", title: "Éoliennes - Adrar", desc: "Projet énergie éolienne" },
  { id: "e3", type: "renewable", title: "Éoliennes - Tindouf", desc: "Projet énergie éolienne" },

  // Projets solaires
  { id: "e4", type: "renewable", title: "Projet solaire - Béchar", desc: "Projet énergie solaire" },
  { id: "e5", type: "renewable", title: "Projet solaire - Laghouat", desc: "Projet énergie solaire" },


// DAMS (existants)
  { id: "d2", type: "dam", title: "Beni Haroun", desc: "Plus grand barrage d'Algérie + potentiel énergétique" },
 
  // NEW ENERGY DAMS
  { id: "d5", type: "dam", title: "Ighil Emda", desc: "Production hydroélectrique réelle" },
  { id: "d6", type: "dam", title: "Koudiat Acerdoune", desc: "Barrage + petite centrale hydro"},
 { id: "d9", type: "dam", title: "Taksebt", desc: "Stratégique + potentiel énergétique" },


];
// ✅ COLORS (you were missing this too)
// ✅ ICONS PAR MARKER
const markerIcons: Record<string, typeof MapPin> = {
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

// ✅ COULEURS PAR TYPE
const markerColors: Record<MarkerType, string> = {
  risk: "#FF4D4F",       // rouge
  renewable: "#FFD700",  // jaune
  dam: "#1890FF",        // bleu
};
// ✅ CONFIG
const typeConfig: Record<
  MarkerType,
  { label: string; color: string; bg: string }
> = {
  risk: {
    label: "Zones à risque climatique",
    color: "text-destructive",
    bg: "bg-destructive",
  },
  renewable: {
    label: "Projets d'énergie renouvelable",
    color: "text-zellige-yellow",
    bg: "bg-zellige-yellow",
  },
  dam: {
    label: "Barrages & infrastructure hydraulique",
    color: "text-secondary",
    bg: "bg-secondary",
  },
};



const AlgeriaContext = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [filter, setFilter] = useState<MarkerType | "all">("all");

  const selectedMarker = mapMarkers.find((m) => m.id === selected);

  return (
    <>
      {/* HERO */}
      {/* <section className="relative py-32 bg-zellige-dark overflow-hidden">
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            Contexte <span className="text-zellige-yellow">Algérien</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto"
          >
            Carte interactive des enjeux climatiques, projets renouvelables et
            infrastructures hydrauliques
          </motion.p>
        </div>
      </section> */}

      {/* MAP SECTION */}
     <section className="py-20 px-4 bg-background  font-sans" >
           <div className="container max-w-6xl mx-auto">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-12"
             >
               <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
           Contexte <span className="text-primary"> Algérien</span>
          </h2>
        
           <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{ background: "var(--gradient-zellige)" }}
          />   
           </motion.div>


        <div className="container max-w-7xl mx-auto">
          {/* FILTERS */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-body font-medium border ${
                filter === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card hover:bg-muted"
              }`}
            >
              Tout afficher
            </button>

            {(Object.keys(typeConfig) as MarkerType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 border ${
                  filter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: markerColors[type] }}
                />
                {typeConfig[type].label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* MAP */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative bg-zellige-dark rounded-2xl overflow-hidden border"
                style={{ height: "min(70vh, 700px)" }}
              >
                {/* ✅ YOUR MAP */}
                <MyMap
                  filter={filter}
                  selected={selected}
                  onSelect={setSelected}
                />
              </motion.div>

              <p className="text-xs text-muted-foreground mt-2 text-center">
                Carte interactive des enjeux climatiques, projets renouvelables et
            infrastructures hydrauliques
              </p>
            </div>

         {/* INFO PANEL */}
<div className="space-y-4 font-sans">
  {selectedMarker ? (
    <motion.div
      key={selectedMarker.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card rounded-xl p-6 border shadow-lg font-sans"
    >
      <div className="flex items-center gap-3 mb-4 font-sans">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: markerColors[selectedMarker.type],
          }}
        >
          {(() => {
            const Icon = markerIcons[selectedMarker.id] || MapPin;
            return <Icon className="w-5 h-5 text-white" />;
          })()}
        </div>

        <div>
          <h3 className="font-sans font-semibold">{selectedMarker.title}</h3>
          <span className="text-xs text-muted-foreground font-sans">
            {typeConfig[selectedMarker.type].label}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground font-sans">
        {selectedMarker.desc}
      </p>
    </motion.div>
  ) : (
    <div className="bg-card rounded-xl p-6 border text-center font-sans">
      <MapPin className="w-8 h-8 mx-auto mb-3 opacity-50" />
      <p className="text-sm text-muted-foreground font-sans">
        Cliquez sur un point sur la carte
      </p>
    </div>
  )}

  {/* STATS */}
  <div className="bg-card rounded-xl p-6 border font-sans">
    <h3 className="font-sans font-semibold mb-4">L'Algérie en chiffres</h3>

    <div className="space-y-3">
      {[
        { label: "Superficie", value: "2,38 M km²", icon: Mountain },
        { label: "Wilayas", value: "58", icon: MapPin },
        { label: "Ensoleillement", value: "2 650 h/an", icon: Sun },
        { label: "Barrages", value: "80+", icon: Droplets },
        { label: "Objectif renouvelable", value: "22 000 MW", icon: Wind },
      ].map((stat, i) => (
        <div key={i} className="flex justify-between items-center font-sans">
          <div className="flex items-center gap-2 font-sans">
            <stat.icon className="w-4 h-4" />
            <span className="text-sm font-sans">{stat.label}</span>
          </div>
          <span className="text-sm font-semibold font-sans">{stat.value}</span>
        </div>
      ))}
    </div>
  </div>

  {/* ALERT */}
  <div className="bg-red-100 rounded-xl p-6 border border-red-200 font-sans">
    <div className="flex items-center gap-2 mb-3 font-sans">
      <AlertTriangle className="w-5 h-5 text-red-500" />
      <h3 className="font-sans font-semibold">Risques Climatiques</h3>
    </div>

    <ul className="text-sm space-y-2 font-sans">
      <li>• Inondations dans le nord</li>
      <li>• Sécheresse prolongée</li>
      <li>• Désertification</li>
      <li>• Stress hydrique</li>
    </ul>
              </div>
            </div>
          </div>
        </div>
         </div>
      </section>
    </>
  );
};

export default AlgeriaContext;