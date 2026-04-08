import { motion } from "framer-motion";
import { Banknote, Leaf, BarChart3, Coins, TrendingUp, Shield, Globe2, Zap } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const sections = [
  {
    id: "definition",
    title: "Qu'est-ce que la Finance Climatique ?",
    icon: Globe2,
    color: "from-primary to-secondary",
    content: "La finance climatique désigne l'ensemble des flux financiers — publics, privés, nationaux et internationaux — destinés à financer des actions d'atténuation et d'adaptation au changement climatique. Elle constitue un pilier essentiel de l'Accord de Paris et des engagements climatiques des nations.",
    stats: [
      { value: "100B$", label: "Objectif annuel mondial" },
      { value: "197", label: "Pays engagés" },
    ],
  },
  {
    id: "fonds",
    title: "Les Fonds Climatiques",
    icon: Banknote,
    color: "from-zellige-green to-secondary",
    content: "Les fonds climatiques sont des mécanismes financiers multilatéraux créés pour canaliser les ressources vers les pays en développement. Le Fonds Vert pour le Climat (GCF), le Fonds pour l'Adaptation et le GEF sont les principaux instruments de financement international.",
    cards: [
      { icon: Shield, title: "Fonds Vert pour le Climat (GCF)", desc: "Principal mécanisme de financement climatique de la CCNUCC avec 10,3 milliards USD de capital." },
      { icon: TrendingUp, title: "Fonds pour l'Adaptation", desc: "Finance des projets concrets d'adaptation dans les pays les plus vulnérables au changement climatique." },
      { icon: Globe2, title: "GEF (Fonds pour l'Environnement Mondial)", desc: "Soutient des projets liés à la biodiversité, au climat, aux eaux internationales et à la dégradation des terres." },
    ],
  },
  {
    id: "obligations",
    title: "Les Obligations Vertes (Green Bonds)",
    icon: BarChart3,
    color: "from-secondary to-zellige-blue",
    content: "Les obligations vertes sont des instruments de dette dont les fonds levés sont exclusivement dédiés au financement de projets à impact environnemental positif. Le marché des green bonds a connu une croissance exponentielle, dépassant les 500 milliards USD d'émissions annuelles.",
    cards: [
      { icon: Zap, title: "Énergies Renouvelables", desc: "Financement de centrales solaires, éoliennes et hydrauliques à grande échelle." },
      { icon: Leaf, title: "Efficacité Énergétique", desc: "Rénovation de bâtiments, transport propre et processus industriels verts." },
      { icon: Shield, title: "Adaptation Climatique", desc: "Infrastructure résiliente, gestion de l'eau et protection côtière." },
    ],
  },
  {
    id: "credits",
    title: "Les Crédits Carbone",
    icon: Coins,
    color: "from-zellige-yellow to-accent",
    content: "Un crédit carbone représente une tonne de CO₂ évitée ou séquestrée. Les marchés carbone — réglementés (ETS) et volontaires (VCM) — permettent aux entreprises et aux pays de compenser leurs émissions en finançant des projets de réduction des gaz à effet de serre.",
    cards: [
      { icon: BarChart3, title: "Marché Réglementé (ETS)", desc: "Systèmes de plafonnement et d'échange imposés par les gouvernements avec des quotas d'émissions." },
      { icon: Coins, title: "Marché Volontaire (VCM)", desc: "Entreprises achetant volontairement des crédits pour atteindre la neutralité carbone." },
      { icon: TrendingUp, title: "Mécanisme de Développement Propre", desc: "Projets dans les pays en développement générant des crédits certifiés CER sous le protocole de Kyoto." },
    ],
  },
];

const ClimateFinance = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32 bg-zellige-dark overflow-hidden">
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            Finance <span className="text-zellige-yellow">Climatique</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto"
          >
            Comprendre les mécanismes financiers au service de la lutte contre le changement climatique
          </motion.p>
        </div>
      </section>

      {/* Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 px-4 ${idx % 2 === 0 ? "bg-background" : "bg-muted/50"} relative`}
        >
          {idx % 2 !== 0 && <div className="absolute inset-0 zellige-pattern pointer-events-none" />}
          <div className="container max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                  <section.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {section.title}
                </h2>
              </div>
              <div className="w-24 h-1 rounded-full" style={{ background: "var(--gradient-zellige)" }} />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-muted-foreground font-body max-w-3xl mb-10 leading-relaxed"
            >
              {section.content}
            </motion.p>

            {section.stats && (
              <div className="flex gap-8 mb-10">
                {section.stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="text-center"
                  >
                    <p className="text-4xl font-display font-bold text-primary">{stat.value}</p>
                    <p className="text-sm text-muted-foreground font-body mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {section.cards && (
              <div className="grid md:grid-cols-3 gap-6">
                {section.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <card.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-sm text-muted-foreground font-body leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </PageLayout>
  );
};

export default ClimateFinance;
