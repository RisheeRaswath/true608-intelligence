import { Shield, Zap, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PricingSection = () => {
  const tiers = [
    {
      name: "BASE SHIELD",
      desc: "For local operators & single-branch fleets.",
      features: [
        "Core HFC Serialization HUD",
        "EPA Section 608 Log Automation",
        "Founding Member Priority Access",
        "1-Click Basic Audit Reports"
      ],
      cta: "REQUEST ACCESS",
      premium: false
    },
    {
      name: "GUARDIAN TIER",
      desc: "Architected for NYC High-Volume Fleet Infrastructure.",
      features: [
        "All Base Shield Features",
        "Multi-Branch Asset Mapping",
        "Unlimited Technician Seat Allocation",
        "Priority-1 Federal Audit Shield",
        "Direct Architect Integration Support"
      ],
      cta: "GET CUSTOM QUOTE",
      premium: true
    },
    {
      name: "THE AEGIS",
      desc: "Custom Enterprise Regulatory Logic.",
      features: [
        "Full ERP/Operations Integration",
        "On-Site Deployment Support",
        "24/7 Federal Compliance Hotline",
        "Custom Feature Architecture"
      ],
      cta: "CONTACT COMMAND",
      premium: false
    }
  ];

  return (
    <section id="investment-tiers" className="bg-black py-24 px-6 border-t border-white/5 scroll-mt-20">
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-6 uppercase">
          SECURE YOUR ALLOWANCE.
        </h2>
        <p className="text-white/60 font-bold uppercase tracking-widest text-base">
          Jan 1st Compliance Activation - Limited Founding Member Slots Remaining
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`p-10 border transition-all relative overflow-hidden flex flex-col justify-between ${
              tier.premium 
              ? 'border-blue-600 bg-blue-600/5 shadow-2xl shadow-blue-600/10 scale-105 z-10' 
              : 'border-white/10 bg-white/[0.02] hover:border-white/30'
            }`}
          >
            {tier.premium && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-black px-4 py-1.5 tracking-widest uppercase">
                RECOMMENDED FOR NYC FLEETS
              </div>
            )}
            
            <div>
              <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter">
                {tier.name}
              </h3>
              <p className="text-white/60 text-sm font-bold uppercase mb-8 leading-relaxed">
                {tier.desc}
              </p>
              
              <ul className="space-y-4 mb-12">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 shrink-0 ${tier.premium ? 'text-blue-500' : 'text-white/40'}`} />
                    <span className="text-sm md:text-base font-bold text-white/80 uppercase tracking-tight text-left">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className={`w-full h-16 rounded-none font-black tracking-tighter uppercase flex items-center justify-center gap-2 transition-all text-sm ${
                tier.premium 
                ? 'bg-blue-600 text-white hover:bg-white hover:text-black' 
                : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'
              }`}
              onClick={() => window.location.href = 'mailto:rishee@true608.com'}
            >
              {tier.cta} <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;