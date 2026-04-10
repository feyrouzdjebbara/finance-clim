import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
const links = [
  {
    label: "Accueil",
    submenu: [
      { href: "/#message-pm", label: "Message du Premier Ministre" },
      { href: "/#finance-climatique", label: "Présentation de la finance climatique" },
      { href: "/#contexte-algerie", label: "Contexte Algérien" },
    ],
  },
  {
    label: "Acteurs Financiers",
    submenu: [
      { href: "/acteurs-financiers#banques", label: "Banques de développement" },
      { href: "/acteurs-financiers#fonds", label: "Fonds climatiques et subventions" },
      { href: "/acteurs-financiers#institutions", label: "Institutions Financières Nationales" },
      { href: "/acteurs-financiers#organismes", label: "Organismes & Agences" },
    ],
  },
  {
    label: "Projets",
   submenu: [
  { href: "/projets#energies-renouvelables", label: "Énergies renouvelables" },
  { href: "/projets#barrages-hydrauliques", label: "Barrages et infrastructures" },
  { href: "/projets#reduction-carbone", label: "Réduction d’émissions carbone" },
],
  },
  {
    label: "Événement",
    submenu: [
      { href: "/evenement#objectif", label: "Objectif du workshop" },
      { href: "/evenement#programme", label: "Programme détaillé" },
      { href: "/evenement#inscription", label: "Formulaire d’inscription" },
    ],
  },
  {
    label: "Contact / FAQ",
    submenu: [
      { href: "/contact#formulaire", label: "Formulaire de contact" },
      { href: "/contact#faq", label: "FAQ" },
    ],
  },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
     className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
  scrolled
    ? "bg-[#000e2b]/95 backdrop-blur-md shadow-lg"
    : "bg-[#000e2b]"
}`}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <img  src="/images/logo.png" className="w-6 h-6 text-zellige-green" />
          <span className="font-display font-bold text-lg">Finance Climatique & Crédits Carbone</span>
        </Link>

        {/* Desktop links */}
    <div className="hidden lg:flex items-center gap-1">
  {links.map((menu, i) => (
    <div key={i} className="relative group">

   <Link
  to={menu.submenu[0].href.split("#")[0]} 
  className="px-3 py-2 rounded-lg text-sm font-medium text-primary-foreground/70 hover:text-zellige-green"
>
  {menu.label}
</Link>

      <div className="absolute top-full left-0 mt-0 w-64 bg-[#000e2b] border border-white/10 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
        {menu.submenu.map((sub) => (
          <HashLink
            key={sub.href}
            smooth
            to={sub.href}
            className="block px-4 py-2 text-sm text-primary-foreground/70 hover:text-zellige-green hover:bg-zellige-green/5"
          >
            {sub.label}
          </HashLink>
        ))}
      </div>
    </div>
  ))}

  {/* CTA */}
  <HashLink
    smooth
    to="/evenement#inscription"
    className="ml-2 px-5 py-2 rounded-lg text-sm font-semibold text-accent-foreground hover:scale-105 transition-all"
    style={{ background: "var(--gradient-accent)" }}
  >
    S'inscrire
  </HashLink>
</div>
        {/* Mobile menu button */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-primary-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zellige-dark/95 backdrop-blur-md border-t border-primary-foreground/10 px-4 py-4 space-y-1 overflow-hidden"
          >
          {links.map((menu, i) => (
  <div key={i}>
    <p className="px-3 py-2 text-sm font-semibold text-zellige-green">
      {menu.label}
    </p>

    {menu.submenu.map((sub) => (
      <HashLink
        key={sub.href}
        smooth
        to={sub.href}
        className="block pl-6 pr-3 py-2 text-sm text-primary-foreground/70 hover:text-zellige-green"
      >
        {sub.label}
      </HashLink>
    ))}
  </div>
))}
            <Link
              to="/evenement#inscription"
              className="block text-center mt-3 px-5 py-3 rounded-lg text-sm font-body font-semibold text-accent-foreground"
              style={{ background: "var(--gradient-accent)" }}
            >
              S'inscrire
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
