import React from 'react';

const PricingSection = () => {
  // LEAD CAPTURE LOGIC: Triggers a professional email inquiry
  const handleSecureSlot = (tierName: string) => {
    const subject = encodeURIComponent(`SECURE SLOT: ${tierName} for Jan 1st Mandate`);
    const body = encodeURIComponent(
      `Hello True608 Intelligence,\n\nI want to secure a slot for the ${tierName} before the Jan 1st price increase. Please send the compliance invoice and onboarding requirements for our fleet.\n\nCompany Name: \nContact Name: \nNumber of Trucks: \nPhone Number: `
    );
    window.location.href = `mailto:rishee@true608.com?subject=${subject}&body=${body}`;
  };

  const tiers = [
    {
      name: 'Standard Shield',
      price: '2,499',
      description: 'Single-site compliance for owner-operators.',
      features: [
        'Automated 40 CFR Part 84 Logging',
        'EPA Audit-Ready Reports',
        'Real-time HFC Tracking',
        'Email Support'
      ],
      cta: 'Secure Early Shield',
      highlight: false,
    },
    {
      name: 'Fleet Intelligence',
      price: '9,699',
      description: 'The Industry Standard for 10-40 Truck Fleets.',
      features: [
        'Everything in Standard',
        'Bulk Serialization Engine',
        'Technician Compliance HUD',
        '24/7 Rapid Response Support',
        'Multi-State Jurisdiction Mapping'
      ],
      cta: 'Reserve Fleet Slot',
      highlight: true, // This is your primary debt-killing tier
    },
    {
      name: 'Enterprise Mandate',
      price: '19,699',
      description: 'Full-scale infrastructure for national providers.',
      features: [
        'Everything in Fleet',
        'Custom API Integrations',
        'On-site Implementation Guide',
        'Dedicated Compliance Officer',
        'Unlimited Historical Backups'
      ],
      cta: 'Initialize Enterprise Strike',
      highlight: false,
    },
  ];

  return (
    <section className="bg-slate-900 py-24 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* DOOMSDAY BANNER */}
        <div className="inline-block bg-red-900/30 border border-red-500 rounded-full px-6 py-2 mb-8">
          <p className="text-red-400 font-bold text-sm tracking-widest uppercase">
            ⚠️ PHASE 1 PRICE LOCKDOWN: EXPIRING IN 192 HOURS
          </p>
        </div>

        <h2 className="text-5xl font-extrabold mb-4 text-blue-400 tracking-tight">
          FEDERAL COMPLIANCE PRICING
        </h2>
        <p className="text-xl mb-16 text-slate-300 max-w-2xl mx-auto">
          Secure your HFC allocation tracking before the <span className="text-white font-bold">Jan 01, 2026</span> mandate. All licenses include the full True608 HUD.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-3xl border-2 transition-all duration-300 ${
                tier.highlight 
                ? 'border-blue-500 bg-slate-800 scale-105 shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] z-10' 
                : 'border-slate-800 bg-slate-900 opacity-90 hover:opacity-100'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Most Recommended
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{tier.description}</p>
              
              <div className="text-6xl font-black mb-8">
                <span className="text-2xl align-top text-slate-500">$</span>
                {tier.price}
                <span className="text-base font-medium text-slate-500 tracking-normal">/yr</span>
              </div>

              <ul className="text-left mb-10 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start text-sm text-slate-200">
                    <span className="text-blue-500 mr-3 mt-1 font-bold">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSecureSlot(tier.name)}
                className={`w-full py-4 rounded-2xl font-black text-lg transition-all duration-200 active:scale-95 ${
                  tier.highlight 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20' 
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-100'
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* COMPLIANCE FOOTER */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm italic">
            * All pricing in USD. Payments processed via Secure US ACH or Domestic Wire only.
          </p>
          <div className="flex gap-4">
            <span className="bg-slate-800 px-3 py-1 rounded text-[10px] text-slate-400 font-mono">EPA 40 CFR 84 COMPLIANT</span>
            <span className="bg-slate-800 px-3 py-1 rounded text-[10px] text-slate-400 font-mono">ENCRYPTED DATA LOGGING</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;