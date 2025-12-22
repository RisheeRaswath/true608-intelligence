import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Check, Target, Crown } from "lucide-react";
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
      features: [
        "FEDERAL VAULT ACCESS",
        "ZERO-MATH LOGGING",
        "MOBILE HUD"
      ],
      recommended: false,
    },
    {
      name: "FLEET COMMAND",
      capacity: "3-10 TRUCKS",
      monthly: 299,
      annual: 2499,
      icon: <Shield className="w-6 h-6 text-[#F59E0B]" />,
      features: [
        "FEDERAL VAULT ACCESS",
        "PRIORITY RECONCILIATION",
        "MULTI-TECH COORDINATION",
        "AUDIT-READY REPORTS",
        "SAVE $1,089/YR"
      ],
      recommended: true,
    },
    {
      name: "ENTERPRISE SHIELD",
      capacity: "10+ TRUCKS",
      monthly: 599,
      annual: 4999,
      icon: <Crown className="w-5 h-5" />,
      features: [
        "FEDERAL VAULT ACCESS",
        "FULL COMPLIANCE OVERSEER",
        "DIRECT INTEL LINE",
        "UNLIMITED DATA STORAGE"
      ],
      recommended: false,
    },
  ];

  return (
    <section id="the-shield" className="py-24 bg-black text-white selection:bg-[#F59E0B] selection:text-black">
      <div className="container mx-auto px-4">
        
        {/* HEADER: MISSION DIRECTIVE */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase">
            INITIALIZE YOUR SHIELD
          </h2>
          <div className="w-32 h-1.5 bg-[#F59E0B] mx-auto mb-10"></div>
          <p className="text-zinc-500 max-w-xl mx-auto mb-12 uppercase tracking-[0.3em] text-[10px] font-black leading-relaxed">
            THE EPA AIM ACT WAITS FOR NO ONE. SECURE YOUR 2026 FISCAL FUTURE WITH FEDERAL-GRADE COMPLIANCE.
          </p>

          {/* THE TACTICAL TOGGLE */}
          <div className="flex items-center justify-center gap-6 mb-16">
            <span className={`text-[12px] font-black tracking-widest transition-colors ${!isAnnual ? 'text-white' : 'text-zinc-700'}`}>
              MONTHLY
            </span>
            <Switch 
              checked={isAnnual} 
              onCheckedChange={setIsAnnual} 
              className="data-[state=checked]:bg-[#F59E0B] data-[state=unchecked]:bg-zinc-800 scale-125"
            />
            <div className="flex flex-col items-start">
              <span className={`text-[12px] font-black tracking-widest transition-colors ${isAnnual ? 'text-[#F59E0B]' : 'text-zinc-700'}`}>
                FOUNDER'S ANNUAL
              </span>
              {isAnnual && (
                <span className="text-[9px] text-[#F59E0B] font-black tracking-tighter animate-pulse">
                  [ SAVE 30% UPFRONT ]
                </span>
              )}
            </div>
          </div>
        </div>

        {/* THE STRIKE ZONE (PRICING GRID) */}
        <div className="grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto items-center">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col transition-all duration-500 border ${
                plan.recommended 
                ? 'border-[#F59E0B] bg-zinc-950 p-10 lg:py-16 lg:px-12 scale-105 z-10 shadow-[0_0_50px_rgba(245,158,11,0.15)]' 
                : 'border-zinc-900 bg-black p-8 lg:p-10 hover:border-zinc-700'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-black text-[10px] font-black px-6 py-2 uppercase tracking-widest shadow-xl">
                  MOST LOGICAL CHOICE
                </div>
              )}

              {/* TIER IDENTITY */}
              <div className="flex flex-col mb-10">
                <div className={`mb-4 ${plan.recommended ? 'text-[#F59E0B]' : 'text-white'}`}>
                  {plan.icon}
                </div>
                <h3 className="font-black text-2xl tracking-tighter uppercase mb-1">{plan.name}</h3>
                <p className="text-[10px] text-zinc-600 font-black tracking-[0.2em]">{plan.capacity}</p>
              </div>

              {/* TACTICAL PRICING */}
              <div className="mb-12">
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-black tracking-tighter">
                    ${isAnnual ? plan.annual.toLocaleString() : plan.monthly}
                  </span>
                  <span className="text-zinc-700 text-[11px] font-black uppercase tracking-widest">
                    / {isAnnual ? 'YEAR' : 'MONTH'}
                  </span>
                </div>
              </div>

              {/* MISSION CAPABILITIES */}
              <div className="space-y-5 mb-14 flex-grow">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-4">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.recommended ? 'text-[#F59E0B]' : 'text-zinc-500'}`} />
                    <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-tight leading-none">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* DEPLOYMENT BUTTON */}
              <Button
                className={`w-full rounded-none font-black uppercase tracking-[0.15em] py-8 text-[11px] transition-all duration-300 ${
                  plan.recommended 
                  ? 'bg-[#F59E0B] text-black hover:bg-white hover:tracking-[0.25em]' 
                  : 'bg-zinc-900 text-white border border-zinc-800 hover:bg-white hover:text-black'
                }`}
                onClick={() => navigate("/auth?signup=true")}
              >
                SECURE MISSION
              </Button>
            </div>
          ))}
        </div>

        {/* SYSTEM OVERRIDE (MANUAL OPTION) */}
        <div className="text-center mt-20 pt-10 border-t border-zinc-900">
           <button 
             onClick={() => document.getElementById("compliance-manual")?.scrollIntoView({ behavior: "smooth" })}
             className="group text-zinc-800 hover:text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] transition-all"
           >
             CONTINUE WITH MANUAL PAPER LOGGING <span className="text-red-900 group-hover:text-red-600">[ CRITICAL AUDIT RISK ]</span>
           </button>
        </div>
      </div>
    </section>
  );
};

export default PricingChoice;