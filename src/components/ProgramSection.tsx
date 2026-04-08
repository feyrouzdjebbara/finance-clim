import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { useState } from "react";

const days = [
  {
    label: "Jour 1 — 24 Juin",
    events: [
      { time: "08:30", title: "Accueil & Enregistrement", desc: "Hall principal du CIC", type: "break" },
      { time: "09:00", title: "Cérémonie d'ouverture", desc: "Allocutions officielles et mot de bienvenue", type: "plenary" },
      { time: "10:00", title: "Keynote : L'état des marchés carbone mondiaux", desc: "Panorama des marchés réglementés et volontaires", type: "keynote" },
      { time: "11:30", title: "Panel : Financement climatique en Afrique", desc: "Mécanismes de financement et fonds verts", type: "panel" },
      { time: "13:00", title: "Pause déjeuner", desc: "Networking et restauration", type: "break" },
      { time: "14:30", title: "Atelier : Méthodologies de certification carbone", desc: "Standards Gold, Verra et mécanismes MDP", type: "workshop" },
      { time: "16:30", title: "Table ronde : Opportunités pour l'Algérie", desc: "Secteurs clés et projets pilotes", type: "panel" },
    ],
  },
  {
    label: "Jour 2 — 25 Juin",
    events: [
      { time: "09:00", title: "Récapitulatif du Jour 1", desc: "Synthèse des travaux", type: "plenary" },
      { time: "09:30", title: "Keynote : Transition énergétique et crédits carbone", desc: "Énergies renouvelables et marchés carbone", type: "keynote" },
      { time: "11:00", title: "Atelier : Montage de projets carbone", desc: "De l'idée au crédit carbone certifié", type: "workshop" },
      { time: "13:00", title: "Pause déjeuner", desc: "Networking", type: "break" },
      { time: "14:30", title: "Panel : Cadre réglementaire algérien", desc: "Législation et politique environnementale", type: "panel" },
      { time: "16:00", title: "Session de clôture & recommandations", desc: "Feuille de route et prochaines étapes", type: "plenary" },
      { time: "17:00", title: "Cérémonie de clôture", desc: "Remise des attestations", type: "break" },
    ],
  },
];

const typeColors: Record<string, string> = {
  keynote: "bg-zellige-yellow text-accent-foreground",
  panel: "bg-secondary text-secondary-foreground",
  workshop: "bg-primary text-primary-foreground",
  plenary: "bg-zellige-green text-primary-foreground",
  break: "bg-muted text-muted-foreground",
};

const ProgramSection = () => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <section className="py-20 px-4 bg-background relative" id="programme">
      <div className="absolute inset-0 zellige-pattern pointer-events-none" />
      <div className="container max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Programme <span className="text-primary">Détaillé</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ background: "var(--gradient-zellige)" }} />
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="font-body text-sm">Centre International de Conférences (CIC), Alger</span>
          </div>
        </motion.div>

        {/* Day tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {days.map((day, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`px-6 py-3 rounded-lg font-body font-semibold transition-all ${
                activeDay === i
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-foreground border border-border hover:bg-muted"
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-border" />
          {days[activeDay].events.map((event, i) => (
            <motion.div
              key={`${activeDay}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative flex gap-4 md:gap-6 mb-6 group"
            >
              {/* Timeline dot */}
              <div className="flex-shrink-0 w-12 md:w-16 flex flex-col items-center pt-1">
                <div className="w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm z-10 group-hover:scale-150 transition-transform" />
              </div>

              {/* Card */}
              <div className="flex-1 bg-card rounded-xl p-5 border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-sm font-body font-medium">{event.time}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-body font-medium ${typeColors[event.type]}`}>
                    {event.type === "keynote" ? "Keynote" : event.type === "panel" ? "Panel" : event.type === "workshop" ? "Atelier" : event.type === "plenary" ? "Plénière" : "Pause"}
                  </span>
                </div>
                <h4 className="font-display font-semibold text-foreground">{event.title}</h4>
                <p className="text-sm text-muted-foreground font-body mt-1">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramSection;
