import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { href: "/", label: "Accueil" },
  // { href: "/finance-climatique", label: "Finance Climatique" },
  { href: "/acteurs-financiers", label: "Acteurs Financiers" },
  { href: "/projets", label: "Projets" },
  { href: "/evenement", label: "Événement" },
  // { href: "/contexte-algerie", label: "Contexte Algérie" },
  { href: "/contact", label: "Contact / FAQ" },
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
          {links.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`px-3 py-2 rounded-lg text-sm font-body font-medium transition-colors ${
                location.pathname === l.href
                  ? "text-zellige-green bg-zellige-green/10"
                  : "text-primary-foreground/70 hover:text-zellige-green hover:bg-zellige-green/5"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/evenement#inscription"
            className="ml-2 px-5 py-2 rounded-lg text-sm font-body font-semibold text-accent-foreground transition-all hover:scale-105"
            style={{ background: "var(--gradient-accent)" }}
          >
            S'inscrire
          </Link>
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
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className={`block px-3 py-2.5 rounded-lg font-body text-sm font-medium transition-colors ${
                  location.pathname === l.href
                    ? "text-zellige-green bg-zellige-green/10"
                    : "text-primary-foreground/70 hover:text-zellige-green"
                }`}
              >
                {l.label}
              </Link>
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
