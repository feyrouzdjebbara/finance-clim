import PageLayout from "@/components/PageLayout";
import HeroSection2 from "@/components/HeroSection2";
import HeroSection from "@/components/HeroSection";
import PMSection from "@/components/PMSection";
import AlgeriaContext from "./AlgeriaContext";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  return (
    <PageLayout>
      
      {/* Hero (optional anchor if needed later) */}
      <section id="hero">
        {/* <HeroSection2 /> */}
          <HeroSection/>
      </section>

      {/* Message du Premier Ministre */}
      <section id="message-pm">
        <PMSection />
      </section>

      {/* Présentation de la finance climatique */}
      <section id="finance-climatique">
        <InfoSection />
      </section>

      {/* Contexte Algérien */}
      <section id="contexte-algerie">
        <AlgeriaContext />
      </section>

    </PageLayout>
  );
};

export default Index;