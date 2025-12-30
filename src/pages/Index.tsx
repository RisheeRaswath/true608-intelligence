import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection"; 
import RiskCalculator from "@/components/RiskCalculator";
import PDFSection from "@/components/PDFSection";
import PricingChoice from "@/components/PricingChoice";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black selection:bg-[#F97316]/30">
      <Navbar />
      <main>
        <HeroSection /> {/* Ensure your HeroSection also points to /#/app */}

        {/* PHASE 2: THE VISUAL PROOF */}
        <section className="bg-black py-20 border-y border-white/5 text-center">
           <h2 className="text-[#F97316] font-black tracking-widest text-xs mb-4">SYSTEM READY</h2>
           {/* BUTTON 1 */}
           <a href="/#/app" className="inline-block bg-[#F97316] text-black font-black px-10 py-4 uppercase tracking-tighter hover:bg-white transition-all">
             Initialize Federal Compliance Scan
           </a>
        </section>

        {/* PHASE 2.5: THE SOVEREIGN PORTAL */}
        <section className="bg-zinc-950 py-20 border-b border-white/5">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto border border-[#F97316]/30 bg-[#F97316]/5 p-12">
              <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">Ready to Secure Your Inventory?</h2>
              {/* BUTTON 2 */}
              <a href="/#/app" className="inline-block bg-[#F97316] hover:bg-white text-black font-black px-12 py-5 text-xl uppercase tracking-[0.2em] transition-all shadow-[0_10px_40px_rgba(249,115,22,0.3)]">
                ENTER PRIVATE VAULT
              </a>
            </div>
          </div>
        </section>
        
        <RiskCalculator />
        <PDFSection />
        <PricingChoice />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;