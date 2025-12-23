import { Shield, CheckCircle2, ArrowRight } from "lucide-react";
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
    <section id="investment-tiers" className="bg-black py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto text-center mb-24">
        <h2 className="text-6xl font-black tracking-tighter text-white mb-6 uppercase leading-none">
          SECURE YOUR ALLOWANCE.
        </h2>
        <p className="text-blue-600 font-mono font-black uppercase tracking-[0.4em] text-xs">
          Jan 1st Compliance Activation - NYC Fleet Priority
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`p-12 border transition-all relative flex flex-col justify-between ${
              tier.premium 
              ? 'border-blue-600 bg-blue-600/5 shadow-[0_0_50px_rgba(37,99,235,0.1)] scale-105 z-10' 
              : 'border-white/10 bg-white/[0.01]'
            }`}
          >
            {tier.premium && (
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-black px-4 py-1.5 tracking-[0.2em] uppercase">
                RECOMMENDED FOR NYC FLEETS
              </div>
            )}
            
            <div>
              <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tighter italic">
                {tier.name}
              </h3>
              <p className="text-white/30 text-[10px] font-black uppercase mb-10 tracking-widest leading-relaxed">
                {tier.desc}
              </p>
              
              <ul className="space-y-5 mb-16">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-4">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${tier.premium ? 'text-blue-500' : 'text-white/10'}`} />
                    <span className="text-[11px] font-bold text-white/50 uppercase tracking-tight text-left leading-tight">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Button 
              className={`w-full h-16 rounded-none font-black tracking-widest uppercase flex items-center justify-center gap-3 transition-all text-sm ${
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