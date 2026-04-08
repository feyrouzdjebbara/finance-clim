import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import PMSection from "@/components/PMSection";
// import ObjectivesSection from "@/components/ObjectivesSection";
import AlgeriaContext from "./AlgeriaContext";
import InfoSection from "@/components/InfoSection";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <PMSection />
        <InfoSection />
      {/* <ObjectivesSection /> */}
      <AlgeriaContext />
           {/* <MyMap /> */}
    </PageLayout>
  );
};

export default Index;
