import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";


const RegistrationSection = () => {
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", organisation: "", fonction: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.nom || !form.prenom || !form.email) return;

  setStatus("loading");
  try {
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrorMsg(data.error || "Une erreur est survenue.");
      setStatus("error");
      return;
    }

    setStatus("success");
    setForm({ nom: "", prenom: "", email: "", organisation: "", fonction: "" });
  } catch {
    setErrorMsg("Erreur de connexion. Veuillez réessayer.");
    setStatus("error");
  }
};

  const fields = [
    { key: "nom", label: "Nom *", type: "text", placeholder: "Votre nom" },
    { key: "prenom", label: "Prénom *", type: "text", placeholder: "Votre prénom" },
    { key: "email", label: "Email *", type: "email", placeholder: "votre@email.com" },
    { key: "organisation", label: "Organisation", type: "text", placeholder: "Votre organisation" },
    { key: "fonction", label: "Fonction", type: "text", placeholder: "Votre fonction" },
  ];

  return (
    <section className="py-20 px-4 relative bg-zellige-dark" id="inscription">
      <div className="absolute inset-0 zellige-pattern pointer-events-none" />
      <div className="absolute inset-0 bg-[#000e2b]"  />

      <div className="container max-w-2xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-2">
            Inscription au <span className="text-zellige-yellow">Workshop</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-accent)" }} />
          <p className="text-primary-foreground/70 font-body mt-4">Réservez votre place pour les 24 et 25 juin 2025</p>
        </motion.div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary/20 border border-primary/30 rounded-2xl p-10 text-center"
          >
            <CheckCircle className="w-16 h-16 text-zellige-green mx-auto mb-4" />
            <h3 className="text-2xl font-display font-bold text-primary-foreground mb-2">Inscription confirmée !</h3>
            <p className="text-primary-foreground/70 font-body">Vous recevrez un email de confirmation prochainement.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 px-6 py-2 rounded-lg font-body text-sm border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              Nouvelle inscription
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {fields.slice(0, 2).map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-body font-medium text-primary-foreground/80 mb-1.5">{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    required={f.label.includes("*")}
                    className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 font-body focus:outline-none focus:ring-2 focus:ring-zellige-green/50 transition-all"
                  />
                </div>
              ))}
            </div>
            {fields.slice(2).map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-body font-medium text-primary-foreground/80 mb-1.5">{f.label}</label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  required={f.label.includes("*")}
                  className="w-full px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 font-body focus:outline-none focus:ring-2 focus:ring-zellige-green/50 transition-all"
                />
              </div>
            ))}

            {status === "error" && (
              <p className="text-destructive font-body text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-body font-semibold text-accent-foreground transition-all hover:scale-[1.02] disabled:opacity-60"
              style={{ background: "var(--gradient-accent)" }}
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {status === "loading" ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
};

export default RegistrationSection;
