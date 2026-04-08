import PageLayout from "@/components/PageLayout";
import ObjectivesSection from "@/components/ObjectivesSection";
import ProgramSection from "@/components/ProgramSection";
import PartnersSection from "@/components/PartnersSection";
import RegistrationSection from "@/components/RegistrationSection";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const Event = () => {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-32 bg-zellige-dark overflow-hidden">
        <div className="absolute inset-0 zellige-pattern pointer-events-none" />
        <div className="absolute inset-0"  style={{ backgroundImage: "url('/images/fond.png')" }} />
        <div className="container max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-4"
          >
            L'Événement <span className="text-zellige-yellow">CFC 2026</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/70 font-body"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-zellige-yellow" />
              <span>24 – 25 Juin 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-zellige-green" />
              <span>CIC, Alger</span>
            </div>
          </motion.div>
        </div>
      </section>

      <ObjectivesSection />
      <ProgramSection />
      {/* <PartnersSection /> */}
      <RegistrationSection />
    </PageLayout>
  );
};

export default Event;
