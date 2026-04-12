import { Map, MapControls, MapMarker, MarkerContent, MarkerLabel, MarkerPopup } from "@/components/ui/map";
import { MapPin, CloudRain, ThermometerSun, Wind, Droplets, Sun } from "lucide-react";

type MarkerType = "risk" | "renewable" | "dam";

interface MapMarkerData {
  id: string;
  type: MarkerType;
  title: string;
  desc: string;
  coordinates: [number, number];
}

interface MyMapProps {
  filter: MarkerType | "all";
  selected: string | null;
  onSelect: (id: string) => void;
}

const mapMarkers: MapMarkerData[] = [
  // RISKS
  { id: "r1", type: "risk", title: "Inondations Alger", desc: "Zone à risque d'inondation", coordinates: [3.0588, 36.7538] },
  { id: "r2", type: "risk", title: "Sécheresse Nord", desc: "Haute risque de sécheresse", coordinates: [3.67, 36.77] },

  // RENEWABLE
  { id: "e2", type: "renewable", title: "Éoliennes Adrar", desc: "Projet énergie éolienne", coordinates: [-0.3, 27.87] },
  { id: "e3", type: "renewable", title: "Éoliennes Tindouf", desc: "Projet énergie éolienne", coordinates: [-8.1, 27.67] },
  { id: "e4", type: "renewable", title: "Solaire Béchar", desc: "Production solaire", coordinates: [-1.6167, 31.6167] },
  { id: "e5", type: "renewable", title: "Solaire Laghouat", desc: "Production solaire", coordinates: [2.8833, 33.8] },

  // DAMS (existants)
  { id: "d2", type: "dam", title: "Beni Haroun", desc: "Plus grand barrage d'Algérie + potentiel énergétique", coordinates: [6.5567, 36.2992] },
  { id: "d5", type: "dam", title: "Ighil Emda", desc: "Production hydroélectrique réelle", coordinates: [5.6, 36.5] },
  { id: "d6", type: "dam", title: "Koudiat Acerdoune", desc: "Barrage + petite centrale hydro", coordinates: [3.6, 36.3] },
 { id: "d9", type: "dam", title: "Taksebt", desc: "Stratégique + potentiel énergétique", coordinates: [4.1, 36.7] },
];

// ICONS
const markerIcons: Record<string, typeof MapPin> = {
  r1: CloudRain,
  r2: ThermometerSun,
  e2: Wind,
  e3: Wind,
  e4: Sun,
  e5: Sun,

  d2: Droplets,
 
  d5: Droplets,
  d6: Droplets,
 
  d9: Droplets,
};

// COLORS
const markerColors: Record<MarkerType, string> = {
  risk: "#FF4D4F",
  renewable: "#FFD700",
  dam: "#1890FF",
};

function MyMap({ filter, selected, onSelect }: MyMapProps) {
  const filteredMarkers =
    filter === "all"
      ? mapMarkers
      : mapMarkers.filter((m) => m.type === filter);

  return (
    <div className="h-[600px] w-full">
      <Map center={[2.8, 28]} zoom={5}>
        
        {/* ONLY ZOOM CONTROL */}
        <MapControls showZoom={true} showCompass={false} showLocate={false} showFullscreen={false} />

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

              {/* ENHANCED POPUP */}
              <MarkerPopup className="p-3 w-64">
                <h3 className="font-semibold text-foreground">{marker.title}</h3>
                <p className="text-sm text-muted-foreground">{marker.desc}</p>

                {marker.type === "dam" && (
                  <p className="text-xs mt-2 text-blue-500">
                    ⚡ Potentiel hydroélectrique
                  </p>
                )}
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </div>
  );
}

export default MyMap;