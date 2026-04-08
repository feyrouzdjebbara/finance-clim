import { motion } from "framer-motion";
import { Building2, Landmark, Globe2, Wallet, TrendingUp, Shield } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const categories = [
  {
    title: "Banques Multilatérales de Développement",
    icon: Landmark,
    actors: [
      { name: "Banque Mondiale", role: "Financement de projets climatiques à grande échelle dans les pays en développement", initial: "BM" , image: "/images/mondial.png"},
      { name: "Banque Africaine de Développement (BAD)", role: "Leader du financement climatique en Afrique avec le programme Desert to Power", initial: "BAD" ,image: "/images/afrique.png" },
      { name: "Banque Européenne d'Investissement (BEI)", role: "Plus grand bailleur multilatéral au monde pour le financement climatique", initial: "BEI" , image: "/images/eba.png"},
      { name: "Banque Islamique de Développement (BID)", role: "Financement conforme à la charia pour les projets verts dans les pays membres", initial: "BID" , image: "/images/isala.png"},
    ],
  },
  {
    title: "Fonds Climatiques Internationaux",
    icon: Globe2,
    actors: [
      { name: "Fonds Vert pour le Climat (GCF)", role: "Principal mécanisme de financement de la CCNUCC avec 10,3 milliards USD", initial: "GCF", image: "/images/2.1.png"},
      { name: "Fonds pour l'Adaptation (AF)", role: "Projets concrets d'adaptation dans les pays les plus vulnérables", initial: "AF" ,image: "/images/2.1.png"},
      { name: "GEF", role: "Fonds pour l'Environnement Mondial — biodiversité, climat, eaux", initial: "GEF",image: "/images/2.1.png "},
      { name: "CIF (Climate Investment Funds)", role: "8,5 milliards USD pour la transformation énergétique propre", initial: "CIF" ,image: "/images/2.1.png"},
    ],
  },
  {
    title: "Institutions Financières Nationales",
    icon: Building2,
    actors: [
      { name: "Banque d'Algérie", role: "Régulation et politique monétaire verte", initial: "BA" ,image: "/images/alg.png"},
      { name: "Banque Nationale d'Algérie (BNA)", role: "Financement de projets d'énergie renouvelable nationaux", initial: "BNA", image: "/images/bna.png"},
      { name: "BADR", role: "Financement agricole résilient au climat", initial: "BADR", image: "/images/badr.png"},
      { name: "Fonds National d'Investissement (FNI)", role: "Investissements stratégiques dans la transition énergétique", initial: "FNI", image: "/images/fni.png"},
    ],
  },
  {
    title: "Organismes & Agences",
    icon: Shield,
    actors: [
      { name: "PNUD Algérie", role: "Assistance technique et renforcement des capacités climatiques", initial: "PNUD",image: "/images/ire.png"},
      { name: "GIZ", role: "Coopération allemande — énergie et développement durable", initial: "GIZ" ,image: "/images/ire.png"},
      { name: "AFD", role: "Agence Française de Développement — projets verts au Maghreb", initial: "AFD" ,image: "/images/ire.png"},
      { name: "IRENA", role: "Agence Internationale pour les Énergies Renouvelables", initial: "IR" ,image: "/images/ire.png"},
    ],
  },
];

const gradients = [
  "from-primary to-secondary",
  "from-primary to-secondary",
  "from-primary to-secondary",
  "from-primary to-secondary",
];

const FinancialActors = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32  overflow-hidden"
        style={{ backgroundImage: "url('/images/fond.png')" }}>
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div className="absolute inset-0"  style={{ backgroundImage: "url('/images/fond.png')" }} />
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            Acteurs <span className="text-zellige-yellow">Financiers</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto"
          >
            Les institutions qui financent la transition climatique en Algérie et dans le monde
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((cat, catIdx) => (
        <section
          key={catIdx}
          className={`py-20 px-4 ${catIdx % 2 === 0 ? "bg-background" : "bg-muted/50"} relative`}
        >
          {catIdx % 2 !== 0 && <div className="absolute inset-0 zellige-pattern pointer-events-none" />}
          <div className="container max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-10"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[catIdx]} flex items-center justify-center`}>
                <cat.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">{cat.title}</h2>
                <div className="w-20 h-1 rounded-full mt-2" style={{ background: "var(--gradient-zellige)" }} />
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.actors.map((actor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-xl transition-all group text-center"
                >
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 bg-white flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform shadow`}>
  <img
    src={actor.image}
    alt={actor.name}
    className="w-10 h-10 object-contain"
  />
</div>
                  <h3 className="font-display font-semibold text-foreground text-sm mb-2">{actor.name}</h3>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{actor.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </PageLayout>
  );
};

export default FinancialActors;
