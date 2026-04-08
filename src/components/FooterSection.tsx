import { Mail, Phone, MapPin, Globe } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="bg-[#000e2b] text-primary-foreground relative">
      <div className="absolute inset-0 zellige-pattern pointer-events-none" />
      <div className="relative z-10">
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-display font-bold mb-4 text-zellige-yellow">Workshop Finance Climatique</h3>
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                24–25 Juin 2026 — Centre International de Conférences (CIC), Alger. Organisé sous le haut patronage du Premier Ministre.
              </p>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 font-body text-sm text-primary-foreground/60">
                <li><a href="/" className="hover:text-zellige-green transition-colors">Objectifs</a></li>
                <li><a href="/acteurs-financiers" className="hover:text-zellige-green transition-colors">Acteurs Financiers</a></li>
                <li><a href="/projets" className="hover:text-zellige-green transition-colors">Projets
</a></li>
                <li><a href="/evenement" className="hover:text-zellige-green transition-colors">Événement</a></li>
                <li><a href="/contact" className="hover:text-zellige-green transition-colors">Contact / FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-semibold mb-4">Contact</h4>
              <ul className="space-y-3 font-body text-sm text-primary-foreground/60">
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-zellige-green" /> contact@workshop-climat.dz</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-zellige-green" /> +213 21 XX XX XX</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-zellige-green" /> CIC, Alger, Algérie</li>
                <li className="flex items-center gap-2"><Globe className="w-4 h-4 text-zellige-green" /> www.workshop-climat.dz</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 py-4">
          <p className="text-center text-xs text-primary-foreground/40 font-body">
            © 2026 Workshop Finance Climatique & Crédits Carbone. Tous droits réservés. | Mentions légales | Politique de confidentialité
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
