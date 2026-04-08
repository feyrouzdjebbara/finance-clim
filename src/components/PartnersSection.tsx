import { motion } from "framer-motion";

const partners = [
  { name: "Ministère de l'Environnement", role: "Organisateur" },
  { name: "Banque Mondiale", role: "Partenaire financier" },
  { name: "PNUD Algérie", role: "Partenaire technique" },
  { name: "GIZ", role: "Coopération internationale" },
  { name: "ASAL", role: "Partenaire scientifique" },
  { name: "Sonatrach", role: "Sponsor principal" },
];

const speakers = [
  { name: "Dr. Amina Belkadi", role: "Experte en finance verte", org: "Banque Mondiale" },
  { name: "Prof. Karim Ziani", role: "Marchés carbone", org: "Université d'Alger" },
  { name: "Mme. Sarah Mansouri", role: "Politique climatique", org: "PNUD" },
  { name: "M. Yacine Bouzid", role: "Transition énergétique", org: "Sonatrach" },
];

const PartnersSection = () => {
  return (
    <section className="py-20 px-4 bg-muted/50" id="partenaires">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Partenaires & <span className="text-secondary">Orateurs</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-zellige)" }} />
        </motion.div>

        {/* Partners grid */}
        <div className="mb-16">
          <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">Nos Partenaires</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {partners.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="bg-card rounded-xl p-5 border border-border text-center shadow-sm hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-xl font-display font-bold text-primary-foreground group-hover:scale-110 transition-transform"
                  style={{ background: "var(--gradient-zellige)" }}>
                  {p.name[0]}
                </div>
                <h4 className="font-display font-semibold text-foreground text-sm">{p.name}</h4>
                <p className="text-xs text-muted-foreground font-body mt-1">{p.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Speakers */}
        <div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-6 text-center">Orateurs Principaux</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {speakers.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-card rounded-xl p-6 border border-border text-center shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-display font-bold text-primary-foreground group-hover:animate-pulse-glow transition-all"
                  style={{ background: "var(--gradient-zellige)" }}>
                  {s.name.split(" ").slice(-1)[0][0]}{s.name.split(" ")[0][0]}
                </div>
                <h4 className="font-display font-semibold text-foreground">{s.name}</h4>
                <p className="text-sm text-primary font-body font-medium mt-1">{s.role}</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{s.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
