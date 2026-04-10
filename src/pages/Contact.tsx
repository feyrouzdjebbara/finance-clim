import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Loader2,
  CheckCircle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageLayout from "@/components/PageLayout";

const faqs = [
  {
    q: "Qui peut participer au workshop ?",
    a: "Le workshop est ouvert à tous les professionnels, chercheurs, étudiants et décideurs intéressés par la finance climatique et les crédits carbone. Les institutions financières, les entreprises du secteur énergétique et les organisations environnementales sont particulièrement encouragées à participer.",
  },
  {
    q: "L'inscription est-elle payante ?",
    a: "La participation au workshop est gratuite. Cependant, l'inscription est obligatoire en raison du nombre limité de places. Inscrivez-vous via la page Événement.",
  },
  {
    q: "Où se déroule l'événement ?",
    a: "Le workshop se tient au Centre International de Conférences (CIC) d'Alger, les 24 et 25 juin 2025.",
  },
  {
    q: "Qu'est-ce qu'un crédit carbone ?",
    a: "Un crédit carbone représente une tonne de CO₂ équivalente évitée ou séquestrée. Il peut être échangé sur les marchés carbone réglementés ou volontaires, permettant aux entreprises de compenser leurs émissions.",
  },
  {
    q: "Comment l'Algérie s'inscrit-elle dans la finance climatique ?",
    a: "L'Algérie a ratifié l'Accord de Paris et s'est engagée à réduire ses émissions de GES de 7% à 22% d'ici 2030. Le pays développe activement des projets d'énergie renouvelable et explore les marchés de crédits carbone.",
  },
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32 bg-zellige-dark overflow-hidden">
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/images/fond.png')" }}
        />
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            Contact & <span className="text-zellige-yellow">FAQ</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-primary-foreground/70 font-body max-w-2xl mx-auto"
          >
            Une question ? Contactez-nous ou consultez notre foire aux questions
          </motion.p>
        </div>
      </section>

      {/* Contact + Info */}
      <section className="py-20 px-4 bg-background" id="formulaire">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                  Envoyez-nous un <span className="text-primary">message</span>
                </h2>
                <div
                  className="w-24 h-1 rounded-full mb-8"
                  style={{ background: "var(--gradient-zellige)" }}
                />

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/10 border border-primary/20 rounded-2xl p-10 text-center"
                  >
                    <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-muted-foreground font-body">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 px-6 py-2 rounded-lg font-body text-sm border border-border text-foreground hover:bg-muted transition-all"
                    >
                      Nouveau message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          placeholder="Votre nom"
                          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) =>
                            setForm({ ...form, email: e.target.value })
                          }
                          placeholder="votre@email.com"
                          className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                        Sujet *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        placeholder="Sujet de votre message"
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-1.5">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Votre message..."
                        className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground font-body focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-body font-semibold text-accent-foreground transition-all hover:scale-[1.02] disabled:opacity-60 w-full sm:w-auto"
                      style={{ background: "var(--gradient-accent)" }}
                    >
                      {status === "loading" ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {status === "loading" ? "Envoi..." : "Envoyer"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                  Informations
                </h2>
                <div
                  className="w-24 h-1 rounded-full mb-6"
                  style={{ background: "var(--gradient-zellige)" }}
                />

                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "contact@workshop-climat.dz",
                  },
                  {
                    icon: Phone,
                    label: "Téléphone",
                    value: "+213 21 XX XX XX",
                  },
                  {
                    icon: MapPin,
                    label: "Adresse",
                    value:
                      "Centre International de Conférences (CIC), Alger, Algérie",
                  },
                  {
                    icon: MessageCircle,
                    label: "Horaires",
                    value: "Dim – Jeu : 8h00 – 17h00",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--gradient-zellige)" }}
                    >
                      <item.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-body font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-sm text-muted-foreground font-body">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-muted/50 relative"   id="faq" >
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div className="container max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Questions <span className="text-primary">Fréquentes</span>
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{ background: "var(--gradient-zellige)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card rounded-xl border border-border px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="font-display font-semibold text-foreground text-left hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
