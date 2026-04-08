import { motion } from "framer-motion";
import { Sun, Wind, Droplets, Factory, Leaf, Mountain, Zap, TreePine } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const categories = [
  {
    title: "Énergies Renouvelables",
    description: "L'Algérie possède un potentiel solaire exceptionnel de 2 650 heures d'ensoleillement par an et des corridors éoliens puissants.",
    projects: [
      { icon: Sun, title: "Programme Solaire National", desc: "22 000 MW de capacité solaire prévue d'ici 2030, incluant des centrales photovoltaïques et à concentration.", tag: "Solaire", location: "Sahara algérien" },
      { icon: Wind, title: "Parc Éolien d'Adrar", desc: "10 MW de capacité installée avec extension prévue à 50 MW. Premier parc éolien d'Algérie.", tag: "Éolien", location: "Adrar" },
      { icon: Wind, title: "Projet Éolien de Tindouf", desc: "Développement d'un parc éolien de 30 MW dans une zone à fort potentiel venteux.", tag: "Éolien", location: "Tindouf" },
      { icon: Zap, title: "Hydrogène Vert", desc: "Programme national de production d'hydrogène vert à partir d'énergie solaire et éolienne.", tag: "Hydrogène", location: "National" },
    ],
  },
  {
    title: "Barrages & Infrastructure Hydraulique",
    description: "L'Algérie compte plus de 80 barrages et des projets majeurs de gestion des ressources en eau face au stress hydrique.",
    projects: [
      { icon: Droplets, title: "Barrage de Beni Haroun", desc: "Capacité de 960 millions m³ — plus grand barrage d'Algérie alimentant 6 wilayas de l'Est.", tag: "Barrage", location: "Mila" },
      { icon: Droplets, title: "Système de Transfert Hauts Plateaux", desc: "Transfert d'eau sur 700 km pour l'irrigation de 40 000 hectares de terres agricoles.", tag: "Transfert", location: "Hauts Plateaux" },
      { icon: Droplets, title: "Stations de Dessalement", desc: "13 stations de dessalement produisant 2,1 millions m³/jour d'eau potable.", tag: "Dessalement", location: "Littoral" },
    ],
  },
  {
    title: "Réduction des Émissions Carbone",
    description: "Projets visant à réduire l'empreinte carbone de l'Algérie et à générer des crédits carbone certifiés.",
    projects: [
      { icon: Factory, title: "Efficacité Énergétique Industrielle", desc: "Programme de modernisation des processus industriels pour réduire les émissions de GES de 30%.", tag: "Industrie", location: "National" },
      { icon: TreePine, title: "Reboisement du Barrage Vert", desc: "Restauration et extension de la ceinture verte de 1 200 km contre la désertification.", tag: "Foresterie", location: "Nord-Sud" },
      { icon: Leaf, title: "Agriculture Climato-Intelligente", desc: "Techniques agricoles résilientes réduisant les émissions et améliorant les rendements.", tag: "Agriculture", location: "Plaines intérieures" },
      { icon: Mountain, title: "Captage & Stockage du CO₂ (CCS)", desc: "Projet pilote de séquestration géologique du CO₂ dans les formations salines du Sahara.", tag: "CCS", location: "In Salah" },
    ],
  },
];

const tagColors: Record<string, string> = {
  Solaire: "bg-zellige-yellow/20 text-zellige-yellow border-zellige-yellow/30",
  Éolien: "bg-secondary/20 text-secondary border-secondary/30",
  Hydrogène: "bg-primary/20 text-primary border-primary/30",
  Barrage: "bg-secondary/20 text-secondary border-secondary/30",
  Transfert: "bg-zellige-blue/20 text-zellige-blue border-zellige-blue/30",
  Dessalement: "bg-zellige-blue/20 text-zellige-blue border-zellige-blue/30",
  Industrie: "bg-muted text-muted-foreground border-border",
  Foresterie: "bg-primary/20 text-primary border-primary/30",
  Agriculture: "bg-zellige-green/20 text-zellige-green border-zellige-green/30",
  CCS: "bg-muted text-muted-foreground border-border",
};

const Projects = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32 bg-zellige-dark overflow-hidden">
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div className="absolute inset-0"  style={{ backgroundImage: "url('/images/fond.png')" }}/>
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            Projets <span className="text-zellige-yellow">Climatiques</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto"
          >
            Énergies renouvelables, infrastructures hydrauliques et projets de réduction des émissions en Algérie
          </motion.p>
        </div>
      </section>

      {/* Project sections */}
      {categories.map((cat, catIdx) => (
        <section
          key={catIdx}
          className={`py-20 px-4 ${catIdx % 2 === 0 ? "bg-background" : "bg-muted/50"} relative`}
        >
          <div className="container max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{cat.title}</h2>
              <div className="w-24 h-1 rounded-full mb-4" style={{ background: "var(--gradient-zellige)" }} />
              <p className="text-muted-foreground font-body max-w-3xl">{cat.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {cat.projects.map((project, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ background: "var(--gradient-zellige)" }}>
                      <project.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-body font-medium ${tagColors[project.tag] || ""}`}>
                          {project.tag}
                        </span>
                        <span className="text-xs text-muted-foreground font-body">📍 {project.location}</span>
                      </div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground font-body leading-relaxed">{project.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageLayout>
  );
};

export default Projects;
