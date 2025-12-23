import React from 'react';

const PricingSection = () => {
  const tiers = [
    {
      name: 'Standard Shield',
      price: '2,499',
      description: 'Single-site compliance for owner-operators.',
      features: ['Automated 40 CFR Part 84 Logging', 'EPA Audit-Ready Reports', 'Real-time HFC Tracking', 'Email Support'],
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
      highlight: true, // This is your debt-killer
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
    <section className="bg-slate-900 py-20 text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4 text-blue-400">FEDERAL COMPLIANCE PRICING</h2>
        <p className="text-xl mb-12 text-slate-300">
          <span className="text-red-500 font-bold underline">WARNING:</span> All prices increase by $3,000 on Jan 01, 2026.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`p-8 rounded-2xl border-2 ${tier.highlight ? 'border-blue-500 bg-slate-800 scale-105 shadow-2xl' : 'border-slate-700 bg-slate-900'}`}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-slate-400 mb-6">{tier.description}</p>
              <div className="text-5xl font-bold mb-6">
                ${tier.price}<span className="text-lg text-slate-500">/yr</span>
              </div>
              <ul className="text-left mb-8 space-y-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.highlight ? 'bg-blue-600 hover:bg-blue-500' : 'bg-slate-700 hover:bg-slate-600'}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-12 text-slate-500">
          Payment processed via Secure US ACH/Domestic Wire. All licenses are EPA-Compliant.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;