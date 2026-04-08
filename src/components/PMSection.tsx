import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const PMSection = () => {
  return (
    <section className="py-20 px-4 bg-background font-sans">
      <div className="container max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Message du <span className="text-primary">Premier Ministre</span>
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-zellige)" }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border relative"
        >
          <Quote className="absolute top-6 left-6 w-10 h-10 text-zellige-green/20" />
          <blockquote className="text-lg md:text-xl text-foreground/80 font-body leading-relaxed italic pl-8">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          </blockquote>
          <div className="mt-6 pl-8">
            <div className="w-16 h-0.5 bg-zellige-yellow mb-3" />
            <p className="font-display font-semibold text-foreground">Le Premier Ministre</p>
            <p className="text-muted-foreground font-body text-sm">République Algérienne Démocratique et Populaire</p>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
};

export default PMSection;
