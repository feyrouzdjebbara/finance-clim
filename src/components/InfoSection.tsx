import { motion } from "framer-motion";
import { BarChart3, Leaf, Globe2, Coins } from "lucide-react";

const stats = [
  { icon: Globe2, value: "197", label: "Pays signataires de l'Accord" },
  { icon: Coins, value: "2B$", label: "Marché volontaire des crédits carbone" },
  { icon: Leaf, value: "50%", label: "Réduction des émissions visée d'ici 2030" },
  { icon: BarChart3, value: "300+", label: "Projets carbone en Afrique" },
];

const InfoSection = () => {
  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 zellige-pattern pointer-events-none" />
      <div className="container max-w-4xl mx-auto relative z-10">
        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Finance <span className="text-primary">Climatique</span> 
          </h2>
           <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-zellige)" }}></div>
          <p className="mt-4 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            La finance climatique mobilise des capitaux pour soutenir la transition énergétique et la résilience climatique. 
            Les crédits carbone permettent aux entreprises et pays de compenser leurs émissions tout en finançant des projets durables.
          </p>
        </motion.div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="text-center group bg-card p-6 rounded-xl shadow hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 rounded-xl mx-auto mb-4 flex items-center justify-center  group-hover:bg-blue-200 transition-colors" style={{ background: "var(--gradient-zellige)" }} >
                <s.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <motion.p
                className="text-3xl md:text-4xl font-display font-bold text-foreground"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: i * 0.15 + 0.2 }}
              >
                {s.value}
              </motion.p>
              <p className="text-sm text-muted-foreground font-body mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* DESCRIPTION SUPPLEMENTAIRE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Les crédits carbone volontaires sont un outil clé pour atteindre les objectifs climatiques mondiaux. 
            Ils financent des projets qui réduisent ou séquestrent les émissions de CO₂, tels que les projets d'énergies renouvelables, 
            de reforestation et d'efficacité énergétique.
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            La finance climatique vise à aligner les investissements avec les objectifs de développement durable et à favoriser la résilience des communautés face aux impacts du changement climatique.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;