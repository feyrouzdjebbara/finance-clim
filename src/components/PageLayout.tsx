import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">{children}</main>
      <FooterSection />
    </div>
  );
};

export default PageLayout;
