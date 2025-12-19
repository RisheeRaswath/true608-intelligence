import DoomsdayBanner from "@/components/DoomsdayBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RiskCalculator from "@/components/RiskCalculator";
import PricingChoice from "@/components/PricingChoice";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DoomsdayBanner />
      <Navbar />
      <main className="pt-14">
        <HeroSection />
        <RiskCalculator />
        <PricingChoice />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
