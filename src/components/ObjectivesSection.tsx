import { motion } from "framer-motion";
import { Target, Users, Lightbulb, HandshakeIcon } from "lucide-react";

const objectives = [
  {
    icon: Target,
    title: "Comprendre les marchés carbone",
    desc: "Maîtriser les mécanismes des marchés volontaires et réglementés de crédits carbone.",
  },
  {
    icon: Lightbulb,
    title: "Financement climatique",
    desc: "Explorer les instruments financiers innovants dédiés à la transition écologique.",
  },
  {
    icon: Users,
    title: "Renforcer les capacités",
    desc: "Former les acteurs nationaux aux standards internationaux de certification carbone.",
  },
  {
    icon: HandshakeIcon,
    title: "Partenariats stratégiques",
    desc: "Créer des synergies entre institutions, entreprises et organisations internationales.",
  },
];

const ObjectivesSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/50 relative" id="objectifs">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Objectifs du <span className="text-secondary">Workshop</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-zellige)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {objectives.map((obj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg transition-shadow group"
            >
              <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: "var(--gradient-zellige)" }}>
                <obj.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">{obj.title}</h3>
              <p className="text-muted-foreground font-body">{obj.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectivesSection;
