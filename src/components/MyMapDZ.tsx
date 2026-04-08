import { Map, MapControls, MapMarker, MarkerContent, MarkerLabel, MarkerPopup } from "@/components/ui/map";
import { MapPin, CloudRain, ThermometerSun, Wind, Droplets, Mountain, Sun } from "lucide-react";

type MarkerType = "risk" | "renewable" | "dam";

interface MapMarkerData {
  id: string;
  type: MarkerType;
  title: string;
  desc: string;
  coordinates: [number, number]; // [lng, lat]
}

interface MyMapProps {
  filter: MarkerType | "all";
  selected: string | null;
  onSelect: (id: string) => void;
}

// Marker data
const mapMarkers: MapMarkerData[] = [
  { id: "r1", type: "risk", title: "Inondations Alger", desc: "Zone à risque d'inondation", coordinates: [3.0588, 36.7538] },
  { id: "r2", type: "risk", title: "Sécheresse Nord", desc: "Haute risque de sécheresse", coordinates: [3.67, 36.77] },
   
  { id: "e2", type: "renewable", title: "Éoliennes Adrar", desc: "Projet énergie éolienne", coordinates: [-0.3, 27.87] },
  { id: "e3", type: "renewable", title: "Éoliennes Tindouf", desc: "Projet énergie éolienne", coordinates: [-8.1, 27.67] },
 { id: "e4", type: "renewable", title: "Projet solaire Béchar", desc: "Projet énergie solaire à Béchar", coordinates: [-1.6167, 31.6167] },
  { id: "e5", type: "renewable", title: "Projet solaire Laghouat", desc: "Projet énergie solaire à Laghouat", coordinates: [2.8833, 33.8] },
  { 
  id: "d2", 
  type: "dam", 
  title: "Barrage de Beni Haroun", 
  desc: "Grand barrage hydraulique d'Algérie", 
  coordinates: [6.5567, 36.2992] 
},{ id: "d3", type: "dam", title: "Barrage de Jedra", desc: "Barrage situé à Souk Ahras", coordinates: [7.9519, 36.2862] },
  { id: "d4", type: "dam", title: "Barrage de Souk Thlatha", desc: "Barrage situé à Tizi Ouzou", coordinates: [3.9365, 36.7163] },

];

// Marker icons per id
const markerIcons: Record<string, typeof MapPin> = {
  r1: CloudRain,
  r2: ThermometerSun,
  e1: Wind,
   e2: Wind,
  e3: Wind,
   e4: Sun,
  e5: Sun,
  d4: Droplets,
  d3: Droplets,
   d2: Droplets,
};

// Colors per type
const markerColors: Record<MarkerType, string> = {
  risk: "#FF4D4F",       // rouge
  renewable: "#FFD700",  // jaune
  dam: "#1890FF",        // bleu
};

function MyMap({ filter, selected, onSelect }: MyMapProps) {
  const filteredMarkers = filter === "all"
    ? mapMarkers
    : mapMarkers.filter((m) => m.type === filter);

  return (
    <div className="h-[600px] w-full">
      <Map center={[2.8, 28]} zoom={5}>
        <MapControls />

        {filteredMarkers.map((marker) => {
          const Icon = markerIcons[marker.id] || MapPin;

          return (
            <MapMarker
              key={marker.id}
              longitude={marker.coordinates[0]}
              latitude={marker.coordinates[1]}
              onClick={() => onSelect(marker.id)}
            >
              <MarkerContent>
                <div className="cursor-pointer transition-transform">
                  <Icon
                    className={`w-6 h-6 ${selected === marker.id ? "scale-125" : ""}`}
                    style={{ color: markerColors[marker.type] }}
                  />
                </div>
                <MarkerLabel position="bottom">{marker.title}</MarkerLabel>
              </MarkerContent>
              <MarkerPopup className="p-3 w-60">
                <h3 className="font-semibold text-foreground">{marker.title}</h3>
                <p className="text-sm text-muted-foreground">{marker.desc}</p>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}

export default MyMap;