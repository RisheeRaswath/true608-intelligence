import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Check, Zap, Target, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const PricingChoice = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "SOLO HUNTER",
      capacity: "1-2 TRUCKS",
      monthly: 149,
      annual: 999,
      icon: <Target className="w-5 h-5" />,
      features: ["FEDERAL VAULT ACCESS", "ZERO-MATH LOGGING", "MOBILE HUD"],
      recommended: false,
    },
    {
      name: "FLEET COMMAND",
      capacity: "3-10 TRUCKS",
      monthly: 299,
      annual: 2499,
      icon: <Shield className="w-5 h-5 text-[#F59E0B]" />,
      features: ["PRIORITY RECONCILIATION", "MULTI-TECH COORDINATION", "AUDIT-READY REPORTS", "SAVE $1,089/YR"],
      recommended: true,
    },
    {
      name: "ENTERPRISE SHIELD",
      capacity: "10+ TRUCKS",
      monthly: 599,
      annual: 4999,
      icon: <Crown className="w-5 h-5" />,
      features: ["FULL COMPLIANCE OVERSEER", "DIRECT INTEL LINE", "UNLIMITED DATA STORAGE"],
      recommended: false,
    },
  ];

  return (
    <section id="the-shield" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* HEADER SECTION */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter uppercase italic">
            INITIALIZE YOUR SHIELD
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto mb-8 uppercase tracking-widest text-xs">
            The EPA AIM Act Waits For No One. Secure Your 2026 Fiscal Future.
          </p>

          {/* BILLING TOGGLE */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-white' : 'text-zinc-500'}`}>MONTHLY</span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual} 
              className="data-[state=checked]:bg-[#F59E0B]"
            />
            <span className={`text-sm font-bold ${isAnnual ? 'text-[#F59E0B]' : 'text-zinc-500'}`}>
              FOUNDER'S ANNUAL (SAVE 30%)
            </span>
          </div>
        </div>

        {/* PRICING GRID */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative rounded-none border p-8 flex flex-col transition-all duration-300 ${
                plan.recommended 
                ? 'border-[#F59E0B] bg-zinc-900/50 scale-105 z-10' 
                : 'border-zinc-800 bg-black hover:border-zinc-600'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-black text-[10px] font-black px-3 py-1 uppercase tracking-tighter">
                  MOST LOGICAL CHOICE
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <div className={`${plan.recommended ? 'text-[#F59E0B]' : 'text-white'}`}>
                  {plan.icon}
                </div>
                <div>
                  <h3 className="font-black text-lg tracking-tight uppercase italic">{plan.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-bold tracking-widest">{plan.capacity}</p>
                </div>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-black tracking-tighter">
                  ${isAnnual ? plan.annual : plan.monthly}
                </span>
                <span className="text-zinc-500 text-xs font-bold uppercase ml-2">
                  / {isAnnual ? 'YEAR' : 'MONTH'}
                </span>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className={`w-3 h-3 ${plan.recommended ? 'text-[#F59E0B]' : 'text-zinc-500'}`} />
                    <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full rounded-none font-black uppercase italic tracking-tighter py-6 ${
                  plan.recommended 
                  ? 'bg-[#F59E0B] text-black hover:bg-[#d98c0a]' 
                  : 'bg-white text-black hover:bg-zinc-200'
                }`}
                onClick={() => navigate("/auth?signup=true")}
              >
                SECURE MISSION
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
           <button 
             onClick={() => document.getElementById("compliance-manual")?.scrollIntoView({ behavior: "smooth" })}
             className="text-zinc-600 hover:text-zinc-400 text-[10px] font-bold uppercase tracking-widest underline underline-offset-4"
           >
             Continue with manual paper tracking (Audit Risk High)
           </button>
        </div>
      </div>
    </section>
  );
};

export default PricingChoice;